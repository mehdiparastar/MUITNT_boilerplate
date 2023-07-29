import { VideoCallEvent } from 'enum/videoCallEvent.enum';
import { IVideoCallSocket } from 'models/VIDEOCALL_APP/videoCallSocket.model';
import { RootState } from 'redux/store';
import { Socket, io } from 'socket.io-client';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export let videoCallSocket: Socket;

export const videoCallApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    videoCallSocket: builder.query<IVideoCallSocket, void>({
      query() {
        return {
          url: `videoCall_app/socket_initializing`,
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

          videoCallSocket = io(`${url}/videoCall`, {
            // auth: { accessToken },
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

          videoCallSocket.on('connect_error', async (err) => {
            if (
              err.message === 'invalid credentials' ||
              err.message === 'jwt expired'
            ) {
              console.log(err.message);
              videoCallSocket.close();
            }
          });

          videoCallSocket.emit(VideoCallEvent.NewMember, {});

          videoCallSocket.on('disconnect', (reason) => {
            console.log(reason);
          });

          videoCallSocket.on(
            VideoCallEvent.NewMemberBroadCast,
            (data: IVideoCallSocket) => {
              updateCachedData((draft) => ({
                onlineUsers: {
                  ...draft.onlineUsers,
                  ...data.onlineUsers,
                },
              }));
            },
          );

          await cacheEntryRemoved;
          // videoCallSocket.close()
        } catch (ex) {
          console.log(ex);
        }
      },
    }),
  }),
});

export const { useVideoCallSocketQuery } = videoCallApiSlice;
