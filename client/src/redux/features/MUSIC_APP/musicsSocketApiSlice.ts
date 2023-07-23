import { MusicEvent } from 'enum/musicEvent.enum';
import { IMusicSocket } from 'models/MUSICS_APP/musicSocket.model';
import { RootState } from 'redux/store';
import { Socket, io } from 'socket.io-client';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export let musicSocket: Socket;

export const musicSocketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    musicSocket: builder.query<IMusicSocket, void>({
      query() {
        return {
          url: `musics_app/socket_initializing`,
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

          musicSocket = io(`${url}/music`, {
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

          musicSocket.on('connect_error', async (err) => {
            if (
              err.message === 'invalid credentials' ||
              err.message === 'jwt expired'
            ) {
              console.log(err.message);
              musicSocket.close();
            }
          });

          musicSocket.on('disconnect', (reason) => {
            console.log(reason);
          });

          musicSocket.on(
            MusicEvent.ConvertingProgress,
            (data: IMusicSocket) => {
              updateCachedData((draft) => ({
                ...draft,
                ...data,
              }));
            },
          );

          await cacheEntryRemoved;
          // chatSocket.close()
        } catch (ex) {
          console.log(ex);
        }
      },
    }),

    musicConversionSocket: builder.query<IMusicSocket, { id: number }>({
      query(arg) {
        return {
          url: `musics_app/music_conversion/${arg.id}`,
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

          musicSocket.on(
            MusicEvent.ConvertingComplete,
            (data: IMusicSocket) => {
              updateCachedData((draft) => ({
                ...draft,
                ...data,
              }));
            },
          );

          await cacheEntryRemoved;
          // chatSocket.close()
        } catch (ex) {
          console.log(ex);
        }
      },
    }),
  }),
});

export const { useMusicSocketQuery, useMusicConversionSocketQuery } =
  musicSocketApiSlice;
