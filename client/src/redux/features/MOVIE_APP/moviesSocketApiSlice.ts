import { MovieEvent } from 'enum/movieEvent.enum';
import { IMovieSocket } from 'models/MOVIES_APP/movieSocket.model';
import { RootState } from 'redux/store';
import { Socket, io } from 'socket.io-client';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export let movieSocket: Socket;

export const movieSocketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    movieSocket: builder.query<IMovieSocket, void>({
      query() {
        return {
          url: `movies_app/socket_initializing`,
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

          movieSocket = io(`${process.env.REACT_APP_API_SERVER_URL}/movie`, {
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

          movieSocket.on('connect_error', async (err) => {
            if (
              err.message === 'invalid credentials' ||
              err.message === 'jwt expired'
            ) {
              console.log(err.message);
              movieSocket.close();
            }
          });

          movieSocket.on('disconnect', (reason) => {
            console.log(reason);
          });

          movieSocket.on(
            MovieEvent.ConvertingProgress,
            (data: IMovieSocket) => {
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

    movieConversionSocket: builder.query<IMovieSocket, { id: number }>({
      query(arg) {
        return {
          url: `movies_app/movie_conversion/${arg.id}`,
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

          // const {
          //   auth: { accessToken },
          // } = getState() as RootState;

          // movieSocket = io(`${process.env.REACT_APP_API_SERVER_URL}/movie`, {
          //   // auth: { accessToken },
          //   query: { accessToken },
          //   reconnectionDelay: 1000,
          //   reconnection: true,
          //   reconnectionAttempts: 100,
          //   transports: ['websocket'],
          //   agent: false,
          //   upgrade: false,
          //   rejectUnauthorized: false,
          //   forceNew: true,
          // });

          movieSocket.on(
            MovieEvent.ConvertingComplete,
            (data: IMovieSocket) => {
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

export const { useMovieSocketQuery, useMovieConversionSocketQuery } =
  movieSocketApiSlice;
