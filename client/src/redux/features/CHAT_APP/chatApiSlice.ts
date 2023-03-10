import { ChatEvent } from 'enum/chatEvent.enum';
import { RoomIntendedParticipantDto } from 'models/CHAT_APP/intendedParticipant.model';
import { IChatRoomAddMessageFormDto, MessageDto } from 'models/CHAT_APP/message.model';
import { ICreateChatRoomFormDto, RoomDtoWithoutMessages } from 'models/CHAT_APP/room.model';
import { RootState } from 'redux/store';
import { io, Socket } from 'socket.io-client';
import { apiSlice } from '../../../api/rtkApi/apiSlice';


let socket: Socket

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createChatRoom: builder.mutation<RoomDtoWithoutMessages, ICreateChatRoomFormDto>({
            query(data) {
                return {
                    url: `chat_app/create-room`,
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['Chat']
        }),

        getMyAllRooms: builder.query<RoomDtoWithoutMessages[], void>({
            query() {
                return {
                    url: `chat_app/get-my-all-rooms`,
                    method: 'GET'
                }
            },
            keepUnusedDataFor: 0,
            providesTags: ['Chat'],
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
                photoId,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState },
            ) {
                try {

                    const { auth: { accessToken } } = (getState() as RootState)

                    socket = io(`${process.env.REACT_APP_API_SERVER_URL}/chat`, {
                        auth: { accessToken },
                        reconnectionDelay: 1000,
                        reconnection: true,
                        reconnectionAttempts: 10,
                        transports: ["websocket"],
                        agent: false,
                        upgrade: false,
                        rejectUnauthorized: false,
                    });

                    await cacheDataLoaded;
                    // the chat-messages endpoint responded already                    

                    socket.on(ChatEvent.RoomsUpdated, (updatedRooms: RoomDtoWithoutMessages[]) => {
                        console.log(updatedRooms)
                        updateCachedData((draft) => {
                            return draft.map(
                                room => {
                                    const updated = updatedRooms.find(updatedRoom => updatedRoom.id === room.id)
                                    if (updated) {
                                        return ({
                                            ...updated,
                                            createdAt: new Date(room.createdAt),
                                            updatedAt: new Date(room.updatedAt)
                                        })
                                    }
                                    else {
                                        return ({
                                            ...room,
                                            createdAt: new Date(room.createdAt),
                                            updatedAt: new Date(room.updatedAt)
                                        })
                                    }
                                }
                            )
                        });
                    });

                    socket.emit('deliver_message', { a: 'a' })
                    // socket.on(ChatEvent.NewMessage, (message: any) => {
                    //     console.log('ddd')
                    //     updateCachedData((draft) => {
                    //         draft.push(message);
                    //     });
                    // });

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
            providesTags: ['Chat'],
            transformResponse: (results: RoomIntendedParticipantDto[]) => {
                return (results.map(
                    item => ({
                        ...item,
                        createdAt: new Date(item.createdAt),
                        updatedAt: new Date(item.updatedAt)
                    })
                )
                )
            }
        }),

        confirmJoinRequest: builder.mutation<RoomIntendedParticipantDto, number>({
            query(id: number) {
                return {
                    url: `chat_app/confirm-join-room-request`,
                    method: 'POST',
                    body: { id }
                }
            },
            invalidatesTags: ['Chat']
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
            invalidatesTags: ['Chat']
        }),

        getMessages: builder.query<MessageDto[], { roomId: number }>({
            query(arg) {
                return {
                    url: `chat_app/messages/${arg.roomId}`,
                    method: 'GET'
                }
            },
            keepUnusedDataFor: 0,
            providesTags: ['Chat'],
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
                photoId,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState },
            ) {
                try {

                    const { auth: { accessToken } } = (getState() as RootState)

                    // const socket = io(`${process.env.REACT_APP_API_SERVER_URL}/chat`, {
                    //     auth: { accessToken },
                    //     reconnectionDelay: 1000,
                    //     reconnection: true,
                    //     reconnectionAttempts: 10,
                    //     transports: ["websocket"],
                    //     agent: false,
                    //     upgrade: false,
                    //     rejectUnauthorized: false,
                    // });

                    await cacheDataLoaded;
                    // the chat-messages endpoint responded already                    

                    socket.on(ChatEvent.NewMessage, (message: MessageDto) => {
                        updateCachedData((draft) => {
                            // console.log(JSON.parse(JSON.stringify(draft)))
                            draft.push({
                                ...message,
                                createdAt: new Date(message.createdAt),
                                updatedAt: new Date(message.updatedAt)
                            });
                        });
                    });

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
    useAddMessageMutation
} = chatApiSlice
