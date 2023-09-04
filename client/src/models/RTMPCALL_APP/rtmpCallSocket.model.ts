export interface IRTMPCallSocket {
  onlineUsers: { [roomId: string]: [] };
  rtmpLinks: { [roomId: string]: [] };
}
