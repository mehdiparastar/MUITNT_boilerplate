export enum CallInfoState {
  Calling = 'calling',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Missed = 'missed',
  UnAvailable = 'unavailable'
}

export enum WEBRTCSignaling {
  Offer = 'offer',
  Answer = 'answer',
  IceCandidate = 'ice_candidate'
}

export enum WEBRTCCallEvent {
  NewMember = 'new_member',
  NewMemberBroadCast = 'new_member_broadcast',
  MemberDisconnectBroadCast = 'member_disconnect_broadcast',
  HangUp = 'hang_up',
  JoinRequest = 'join_request',
  AcceptCall = 'accept_call',
  RejectCall = 'reject_call',
  WEBRTCSignaling = 'webrtc_signaling',


  NewMessage = 'new_message',
  NewMessageBroadCast = 'new_message_broadcast',
  MessageSeen = 'message_seen',
  MessageSeenBroadCast = 'message_seen_broadcast',
  roomMessagesSeen = 'room_messages_seen',
  MultipleDeliveringBroadCast = 'multiple-delivering-broadCast',
  MultipleSeenBroadCast = 'multiple-seen-broadCast',
  ChangeActiveRoom = 'change-active-room',
  NewRoomCreated = 'new-room-created',
  NewRoomCreatedBroadcast = 'new-room-created-broadcast',
  NewRoomIntendedParticipantBroadcast = 'new-room-intended-participant-broadcast',
  JoinRequestConfirmed = 'join-request-confirmed',
  ConfirmRequestBroadcast = 'confirm-request-broadcast',
  JoinRequestRejected = 'join-request-rejected',
  RejectRequestBroadcast = 'reject-request-broadcast',

  InvalidAccessToken = 'invalid_access_token',
  SendMessage = 'send_message',
  RequestAllMessages = 'request_all_messages',
  SendAllMessages = 'send_all_messages',
  ReceiveMessage = 'receive_message',
  DeliverMessage = 'deliver_message',
}
