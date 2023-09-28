import { CallInfoState, WEBRTCSignaling } from "enum/webrtcCallEvent.enum";

export interface IWEBRTCCall_JOINREQUEST {
  roomLink: string,
  state: CallInfoState,
  caller: {
    email: string,
    name: string,
    photo: string
  },
  callee: {
    email: string,
    name: string,
    photo: string
  }
}

export interface IWEBRTCOfferContext {
  type: WEBRTCSignaling,
  sdp: RTCSessionDescriptionInit,
  candidate: RTCIceCandidate,
  roomLink: string,
  callerEmail: string,
  calleeEmail: string,
  owner: {
    email: string,
    id: number
  }
}

export interface IWEBRTCCallSocket {
  joinRequest: {
    [key: string]: IWEBRTCCall_JOINREQUEST
  };
  onlineUsers: { [roomId: string]: [] };
  webrtcLinks: {
    [roomId: string]: { [userEmail: string]: RTCIceCandidate }
  },
  webrtcEstablishedConnection: {
    [userEmail: string]: boolean
  }
}
