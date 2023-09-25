import axios from 'api/axiosApi/axios';
import { WEBRTCCallEvent, WEBRTCSignaling } from 'enum/webrtcCallEvent.enum';
import { MyConferenceLinkDto } from 'models/WEBRTCCALL_APP/room.model';
import { IWEBRTCCallSocket, IWEBRTCOfferContext } from 'models/WEBRTCCALL_APP/webrtcCallSocket.model';
import { RootState } from 'redux/store';
import { Socket, io } from 'socket.io-client';
import { apiSlice } from '../../../api/rtkApi/apiSlice';
import { setAuthTokens } from '../WHOLE_APP/auth/authSlice';
import { createWEBRTCPeerConnection, getWEBRTCPeerConnection } from './peerConnectionContext';

export let webrtcCallSocket: Socket;

export const webrtcCallApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    webrtcCallSocket: builder.query<IWEBRTCCallSocket, void>({
      query() {
        return {
          url: `webrtcCall_app/socket_initializing`,
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
          extra,
          getCacheEntry,
          requestId
        },
      ) {
        try {
          await cacheDataLoaded;
          console.warn('try to reconnect to socket', webrtcCallSocket && webrtcCallSocket.connected)
          if (!(webrtcCallSocket && webrtcCallSocket.connected)) {

            const {
              auth: { accessToken, refreshToken },
            } = getState() as RootState;

            const url =
              process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_API_SERVER_URL_development
                : process.env.REACT_APP_API_SERVER_URL_production;

            webrtcCallSocket = io(`${url}/webrtcCall`, {
              auth: { accessToken },
              query: { accessToken },
              // reconnectionDelay: 1000,
              reconnection: true,
              reconnectionAttempts: 1000,
              transports: ['websocket'],
              agent: false,
              upgrade: false,
              rejectUnauthorized: false,
              forceNew: true,
            });

            webrtcCallSocket.on('connect_error', async (err) => {
              if (
                err.message === 'invalid credentials' ||
                err.message === 'jwt expired'
              ) {
                console.log(err.message);
                webrtcCallSocket.close();
              }
            });

            webrtcCallSocket.on('disconnect', (reason) => {
              console.log(reason);
              updateCachedData((draft) => ({
                ...draft,
                onlineUsers: {},
                webrtcLinks: {}
              }));
            });

            webrtcCallSocket.on(
              WEBRTCCallEvent.NewMemberBroadCast,
              (data: IWEBRTCCallSocket) => {
                updateCachedData((draft) => ({
                  ...draft,
                  onlineUsers: {
                    ...data.onlineUsers
                  },
                  webrtcLinks: {
                    // ...draft.webrtcLinks,
                    ...data.webrtcLinks
                  }
                }));
              },
            );

            webrtcCallSocket.on(
              WEBRTCCallEvent.MemberDisconnectBroadCast,
              (data: IWEBRTCCallSocket) => {
                updateCachedData((draft) => ({
                  ...draft,
                  onlineUsers: {
                    ...data.onlineUsers
                  }
                }));
              },
            )

            webrtcCallSocket.on(
              WEBRTCCallEvent.JoinRequest,
              (data: IWEBRTCCallSocket) => {
                updateCachedData((draft) => ({
                  ...draft,
                  joinRequest: {
                    ...draft.joinRequest,
                    ...data.joinRequest
                  }
                }));
              },
            )

            webrtcCallSocket.on(WEBRTCCallEvent.WEBRTCSignaling, async (data: IWEBRTCOfferContext) => {
              try {
                const type = data.type

                switch (type) {
                  case WEBRTCSignaling.Offer:
                    createWEBRTCPeerConnection()

                    await getWEBRTCPeerConnection().setRemoteDescription(data.sdp)
                    const callerSDP = await getWEBRTCPeerConnection().createAnswer()
                    await getWEBRTCPeerConnection().setLocalDescription(callerSDP)

                    const refresh = await axios.get('auth/refresh', { headers: { Authorization: `Bearer ${refreshToken}` } })
                    if (refresh.data.accessToken) {
                      dispatch(setAuthTokens(refresh.data))
                    }

                    webrtcCallSocket.emit(WEBRTCCallEvent.WEBRTCSignaling, {
                      type: WEBRTCSignaling.Answer,
                      sdp: callerSDP,
                      roomLink: data.roomLink,
                      accessToken: refresh.data.accessToken,
                    })
                    break

                  case WEBRTCSignaling.Answer:
                    await getWEBRTCPeerConnection().setRemoteDescription(data.sdp)
                    console.log('xxx', getWEBRTCPeerConnection())
                    break

                  case WEBRTCSignaling.IceCandidate:
                    await getWEBRTCPeerConnection().addIceCandidate(data.candidate)
                    console.log('recieving ice candidate of other peer.')

                    // updateCachedData((draft) => ({
                    //   ...draft,
                    //   webrtcLinks: {
                    //     ...draft.webrtcLinks,
                    //     [data.roomLink]: {
                    //       ...draft.webrtcLinks[data.roomLink],
                    //       [data.owner.email]: data.candidate
                    //     }
                    //   }
                    // }));
                    break

                  default:
                    return
                }
              }
              catch (ex) {
                const x = getWEBRTCPeerConnection()
                console.log(ex)
              }
            })
          }

          await cacheEntryRemoved;
          // webrtcCallSocket.close()
        } catch (ex) {
          console.log(ex);
        }
      },
    }),

    getMyWEBRTCConferenceLink: builder.mutation<MyConferenceLinkDto, void>({
      query() {
        return {
          url: `webrtcCall_app/get_my_conference_link`,
          method: 'Get',
        };
      },
    }),
  }),
});

export const { useWebrtcCallSocketQuery: useWEBRTCCallSocketQuery, useGetMyWEBRTCConferenceLinkMutation } =
  webrtcCallApiSlice;
