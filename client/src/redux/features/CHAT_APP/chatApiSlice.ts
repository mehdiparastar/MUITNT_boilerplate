import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'api/axiosApi/axios';
import useRefreshToken from 'api/axiosApi/useRefresh';
import { ChatEvent } from 'enum/chatEvent.enum';
import { IChatSocket } from 'models/CHAT_APP/chatSocket.model';
import { RoomIntendedParticipantDto } from 'models/CHAT_APP/intendedParticipant.model';
import { IChatRoomAddMessageFormDto, MessageDto } from 'models/CHAT_APP/message.model';
import { ICreateChatRoomFormDto, RoomDtoWithoutMessages } from 'models/CHAT_APP/room.model';
import { RootState } from 'redux/store';
import { io, Socket } from 'socket.io-client';
import { apiSlice, baseQueryWithReauth } from '../../../api/rtkApi/apiSlice';
import { setAuthTokens } from '../WHOLE_APP/auth/authSlice';
import { chatIntendedParticipantStatus } from 'enum/chatIntendedParticipantStatus.enum';


export let chatSocket: Socket


export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        chatSocket: builder.query<IChatSocket, void>({
            query() {
                return {
                    url: `chat_app/socket_initializing`,
                    method: 'GET'
                }
            },
            // keepUnusedDataFor: 0,
            // providesTags: ['Chat'],
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {

                    await cacheDataLoaded;

                    const { auth: { accessToken, refreshToken } } = (getState() as RootState)

                    chatSocket = io(`${process.env.REACT_APP_API_SERVER_URL}/chat`, {
                        // auth: { accessToken },
                        query: { accessToken },
                        reconnectionDelay: 1000,
                        reconnection: true,
                        reconnectionAttempts: 100,
                        transports: ["websocket"],
                        agent: false,
                        upgrade: false,
                        rejectUnauthorized: false,
                        forceNew: true
                    })

                    chatSocket.on("connect_error", async (err) => {
                        if (err.message === "invalid credentials" || err.message === 'jwt expired') {
                            console.log(err.message)
                            chatSocket.close()
                        }
                    });

                    chatSocket.emit(ChatEvent.NewMember, {})

                    chatSocket.on('disconnect', reason => {
                        console.log(reason)
                    })

                    chatSocket.on(ChatEvent.NewMemberBroadCast, (data: IChatSocket) => {
                        updateCachedData(draft => ({
                            onlineUsers: {
                                ...draft.onlineUsers,
                                ...data.onlineUsers
                            }
                        }))
                    })


                    await cacheEntryRemoved;
                    // chatSocket.close()
                }
                catch (ex) {
                    console.log(ex)
                }

            },
        }),

        createChatRoom: builder.mutation<RoomDtoWithoutMessages, ICreateChatRoomFormDto>({
            query(data) {
                return {
                    url: `chat_app/create-room`,
                    method: 'POST',
                    body: data
                };
            },
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, getState, dispatch, extra, getCacheEntry, ...rest },
            ) {
                try {
                    await cacheDataLoaded;

                    chatSocket.emit(ChatEvent.NewRoomCreated, { ...getCacheEntry().data })

                    await cacheEntryRemoved;
                    // chatSocket.close()
                } catch (ex) {
                    console.log(ex)
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),

        getMyAllRooms: builder.query<RoomDtoWithoutMessages[], void>({
            query() {
                return {
                    url: `chat_app/get-my-all-rooms`,
                    method: 'GET'
                }
            },
            // keepUnusedDataFor: 0,
            // providesTags: ['Chat'],
            transformResponse: (results: RoomDtoWithoutMessages[]) => {
                return (results.map(
                    item => ({
                        ...item,
                        createdAt: new Date(item.createdAt),
                        updatedAt: new Date(item.updatedAt)
                    })
                )
                )
            },
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getCacheEntry, getState },
            ) {
                try {
                    await cacheDataLoaded;
                    chatSocket.on(ChatEvent.NewRoomCreatedBroadcast, (newRoom: RoomDtoWithoutMessages) => {
                        if (newRoom.intendedParticipants.map(item => item.status === chatIntendedParticipantStatus.accepted).length > 1)
                            if (getCacheEntry().data?.find(room => room.id === newRoom.id) === undefined) {
                                const update = updateCachedData(draft => {
                                    draft.push({
                                        ...newRoom,
                                        createdAt: new Date(newRoom.createdAt),
                                        updatedAt: new Date(newRoom.updatedAt)
                                    })
                                    return draft
                                })

                                return update
                            }
                    })
                    await cacheEntryRemoved;
                } catch (ex) {
                    console.log(ex)
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),

        getMyAllRequests: builder.query<RoomIntendedParticipantDto[], void>({
            query() {
                return {
                    url: `chat_app/get-my-all-requests`,
                    method: 'GET'
                }
            },
            // providesTags: ['Chat'],
            transformResponse: (results: RoomIntendedParticipantDto[]) => {
                return (results.map(
                    item => ({
                        ...item,
                        createdAt: new Date(item.createdAt),
                        updatedAt: new Date(item.updatedAt)
                    })
                )
                )
            },

            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getCacheEntry, getState },
            ) {
                try {

                    await cacheDataLoaded;

                    chatSocket.on(ChatEvent.NewRoomIntendedParticipantBroadcast, (newIntendedParticipants: RoomIntendedParticipantDto[]) => {
                        const currentUser = ((getState() as RootState).apiSlice.queries["getCurrentUser(undefined)"])?.data as IUser
                        const acceptableIntendedParticipant = newIntendedParticipants.filter(item => item.participant.id === currentUser.id)
                        if (acceptableIntendedParticipant.length > 0)
                            for (const newIntendedParticipant of acceptableIntendedParticipant)
                                if (getCacheEntry().data?.find(intendedParticipant => intendedParticipant.id === newIntendedParticipant.id) === undefined) {
                                    const update = updateCachedData(draft => {
                                        draft.push({
                                            ...newIntendedParticipant,
                                            createdAt: new Date(newIntendedParticipant.createdAt),
                                            updatedAt: new Date(newIntendedParticipant.updatedAt)
                                        })
                                        return draft
                                    })

                                    return update
                                }
                    })

                    await cacheEntryRemoved;
                } catch (ex) {
                    console.log(ex)
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),

        confirmJoinRequest: builder.mutation<RoomIntendedParticipantDto, number>({
            query(id: number) {
                return {
                    url: `chat_app/confirm-join-room-request`,
                    method: 'POST',
                    body: { id }
                }
            },
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, getState, dispatch, extra, getCacheEntry, ...rest },
            ) {
                try {
                    await cacheDataLoaded;

                    chatSocket.emit(ChatEvent.JoinRequestConfirmed, { ...getCacheEntry().data })

                    await cacheEntryRemoved;
                    // chatSocket.close()
                } catch (ex) {
                    console.log(ex)
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),

        rejectJoinRequest: builder.mutation<RoomIntendedParticipantDto, number>({
            query(id: number) {
                return {
                    url: `chat_app/reject-join-room-request`,
                    method: 'POST',
                    body: { id }
                }
            },
            invalidatesTags: ['Chat']
        }),

        addMessage: builder.mutation<MessageDto, IChatRoomAddMessageFormDto>({
            query(data) {
                return ({
                    url: `chat_app/add-message`,
                    method: 'POST',
                    body: data
                })
            },
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, getState, dispatch, extra, getCacheEntry, ...rest },
            ) {
                try {
                    await cacheDataLoaded;
                    const { auth: { accessToken, refreshToken } } = (getState() as RootState)

                    chatSocket.emit(ChatEvent.NewMessage, { ...getCacheEntry().data, room: { id: arg.roomId } })

                    await cacheEntryRemoved;
                    // chatSocket.close()
                } catch (ex) {
                    console.log(ex)
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),

        getMessages: builder.query<MessageDto[], { roomId: number }>({
            query(arg) {
                return {
                    url: `chat_app/messages/${arg.roomId}`,
                    method: 'GET'
                }
            },
            transformResponse: (results: MessageDto[]) => {
                return (results.map(
                    item => ({
                        ...item,
                        createdAt: new Date(item.createdAt),
                        updatedAt: new Date(item.updatedAt)
                    })
                )
                )
            },

            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getCacheEntry, getState },
            ) {
                try {

                    const { auth: { accessToken } } = (getState() as RootState)

                    await cacheDataLoaded;

                    chatSocket.on(ChatEvent.NewMessageBroadCast, (newMsg: MessageDto) => {
                        if (arg.roomId === newMsg.room.id)
                            if (getCacheEntry().data?.find(msg => msg.id === newMsg.id) === undefined) {
                                const update = updateCachedData(draft => {
                                    draft.push({
                                        ...newMsg,
                                        createdAt: new Date(newMsg.createdAt),
                                        updatedAt: new Date(newMsg.updatedAt)
                                    })
                                    return draft
                                })
                                if (arg.roomId.toString() === localStorage.getItem('active-room-id')?.toString())
                                    chatSocket.emit(ChatEvent.MessageSeen, { messageId: newMsg.id, roomId: arg.roomId })
                                return update
                            }
                    })

                    chatSocket.on(ChatEvent.MessageSeenBroadCast, ({ seenMessageId, seenUser, membersId, roomId }: { seenMessageId: number, seenUser: ICompressedUser, membersId: number[], roomId: number }) => {
                        if (roomId === arg.roomId)
                            if (!getCacheEntry().data?.find(msg => msg.id === seenMessageId)?.seen.map(item => item.id).includes(seenUser.id)) {
                                const update = updateCachedData(draft => {
                                    const foundIndex = draft.findIndex(item => item.id === seenMessageId)
                                    draft[foundIndex].seen.push(seenUser)
                                    draft[foundIndex].isSeen = JSON.stringify(membersId) === JSON.stringify(draft[foundIndex].seen.map(item => item.id).sort())
                                    return draft
                                })
                                return update
                            }
                    })

                    chatSocket.on(ChatEvent.MultipleDeliveringBroadCast, ({ messages }: { messages: MessageDto[] }) => {
                        const thisRoomMessages: { [key: string]: MessageDto } = messages
                            .filter(msg => msg.room.id === arg.roomId)
                            .reduce((p, c) => ({ ...p, [c.id.toString()]: c }), {})

                        const update = updateCachedData(draft => {
                            return draft.map(item => thisRoomMessages[item.id.toString()] ?
                                ({
                                    ...thisRoomMessages[item.id],
                                    createdAt: new Date(thisRoomMessages[item.id].createdAt),
                                    updatedAt: new Date(thisRoomMessages[item.id].updatedAt)
                                }) :
                                item
                            )
                        })

                        return update
                    })

                    chatSocket.on(ChatEvent.MultipleSeenBroadCast, ({ messages, currentActiveRoomId }: { messages: MessageDto[], currentActiveRoomId: number }) => {
                        const thisRoomMessages: { [key: string]: MessageDto } = messages
                            .filter(msg => msg.room.id === arg.roomId)
                            .reduce((p, c) => ({ ...p, [c.id.toString()]: c }), {})

                        if (localStorage.getItem('active-room-id')?.toString() === currentActiveRoomId.toString()) {
                            const update = updateCachedData(draft => {
                                return draft.map(item => thisRoomMessages[item.id.toString()] ?
                                    ({
                                        ...thisRoomMessages[item.id],
                                        createdAt: new Date(thisRoomMessages[item.id].createdAt),
                                        updatedAt: new Date(thisRoomMessages[item.id].updatedAt)
                                    }) :
                                    item
                                )
                            })

                            return update
                        }
                    })

                    await cacheEntryRemoved;
                } catch (ex) {
                    console.log(ex)
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),
    })
})

export const {
    useGetMessagesQuery,
    useCreateChatRoomMutation,
    useGetMyAllRoomsQuery,
    useGetMyAllRequestsQuery,
    useConfirmJoinRequestMutation,
    useRejectJoinRequestMutation,
    useAddMessageMutation,
    useChatSocketQuery
} = chatApiSlice
