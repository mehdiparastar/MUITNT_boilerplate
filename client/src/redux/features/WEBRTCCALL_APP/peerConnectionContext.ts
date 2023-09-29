// export let peerConnection: RTCPeerConnection

// export const getWEBRTCPeerConnection = () => peerConnection

// export const setWEBRTCPeerConnection = (rtcPeerConnection: RTCPeerConnection) => {
//     peerConnection = rtcPeerConnection
//     return peerConnection
// }

// export const createWEBRTCPeerConnection = () => {
//     console.log('creating webrtc peer connection.')
//     if (!peerConnection) {

//         const newRTCPeerConnection = new RTCPeerConnection({
//             iceServers: [
//                 { urls: 'stun:stun.l.google.com:13902' }
//             ]
//         })
//         setWEBRTCPeerConnection(newRTCPeerConnection)


//         // // recieving tracks ..
//         // const remoteStream = new MediaStream()



//         // getWEBRTCPeerConnection().ontrack = ev => {
//         //     remoteStream.addTrack(ev.track)
//         // }


//         // // add our stream to peer connection
//         // localStream?.getTracks().forEach(track => {
//         //     getWEBRTCPeerConnection().addTrack(track, localStream)
//         // })
//     }

//     return peerConnection
// }


export { }