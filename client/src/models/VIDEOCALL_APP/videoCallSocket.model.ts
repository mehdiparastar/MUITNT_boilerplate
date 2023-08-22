export interface IVideoCallSocket {
  onlineUsers: { [roomId: string]: [] };
  rtmpLinks: { [roomId: string]: [] };
}
