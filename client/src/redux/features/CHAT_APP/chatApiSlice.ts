import { ChatEvent } from 'enum/chatEvent.enum';
import { RoomIntendedParticipantDto } from 'models/CHAT_APP/intendedParticipant.model';
import { ICreateChatRoomFormDto, RoomDtoWithoutMessages } from 'models/CHAT_APP/room.model';
import { RootState } from 'redux/store';
import { io } from 'socket.io-client';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

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
            }
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

        getMessages: builder.query<any, void>({
            query() {
                return {
                    url: 'chat_app/test',
                    method: 'GET'
                }
            },
            async onCacheEntryAdded(
                photoId,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState },
            ) {
                try {

                    const x = (getState() as RootState)

                    const socket = io(`${process.env.REACT_APP_API_SERVER_URL}/chat`, {
                        auth: {
                            ...x.auth
                        },
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

                    socket.on(ChatEvent.ReceiveMessage, (message: any) => {
                        console.log('ddd')
                        updateCachedData((draft) => {
                            draft.push(message);
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
    useGetMyAllRequestsQuery
} = chatApiSlice
