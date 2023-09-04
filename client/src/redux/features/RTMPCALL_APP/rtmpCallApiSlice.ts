import { RTMPCallEvent } from 'enum/rtmpCallEvent.enum';
import { IRTMPCallSocket } from 'models/RTMPCALL_APP/rtmpCallSocket.model';
import { RootState } from 'redux/store';
import { Socket, io } from 'socket.io-client';
import { apiSlice } from '../../../api/rtkApi/apiSlice';
import { MyConferenceLinkDto } from 'models/RTMPCALL_APP/room.model';

export let rtmpCallSocket: Socket;

export const rtmpCallApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    rtmpCallSocket: builder.query<IRTMPCallSocket, void>({
      query() {
        return {
          url: `rtmpCall_app/socket_initializing`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 60 * 60 * 24 * 30,
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          cacheDataLoaded,
          cacheEntryRemoved,
          updateCachedData,
          getState,
        },
      ) {
        try {
          await cacheDataLoaded;

          const {
            auth: { accessToken },
          } = getState() as RootState;

          const url =
            process.env.NODE_ENV === 'development'
              ? process.env.REACT_APP_API_SERVER_URL_development
              : process.env.REACT_APP_API_SERVER_URL_production;

          rtmpCallSocket = io(`${url}/rtmpCall`, {
            auth: { accessToken },
            query: { accessToken },
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttempts: 100,
            transports: ['websocket'],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false,
            forceNew: true,
          });

          rtmpCallSocket.on('connect_error', async (err) => {
            if (
              err.message === 'invalid credentials' ||
              err.message === 'jwt expired'
            ) {
              console.log(err.message);
              rtmpCallSocket.close();
            }
          });

          rtmpCallSocket.on('disconnect', (reason) => {
            console.log(reason);
            updateCachedData((draft) => ({
              ...draft,
              onlineUsers: {},
              rtmpLinks: {}
            }));
          });

          rtmpCallSocket.on(
            RTMPCallEvent.NewMemberBroadCast,
            (data: IRTMPCallSocket) => {
              updateCachedData((draft) => ({
                ...draft,
                onlineUsers: {
                  ...data.onlineUsers
                },
                rtmpLinks: {
                  // ...draft.rtmpLinks,
                  ...data.rtmpLinks
                }
              }));
            },
          );

          rtmpCallSocket.on(
            RTMPCallEvent.MemberDisconnectBroadCast,
            (data: IRTMPCallSocket) => {
              updateCachedData((draft) => ({
                ...draft,
                onlineUsers: {
                  ...data.onlineUsers
                }
              }));
            },
          )

          await cacheEntryRemoved;
          // rtmpCallSocket.close()
        } catch (ex) {
          console.log(ex);
        }
      },
    }),

    getMyConferenceLink: builder.mutation<MyConferenceLinkDto, void>({
      query() {
        return {
          url: `rtmpCall_app/get_my_conference_link`,
          method: 'Get',
        };
      },
    }),
  }),
});

export const { useRtmpCallSocketQuery: useRTMPCallSocketQuery, useGetMyConferenceLinkMutation } =
  rtmpCallApiSlice;
