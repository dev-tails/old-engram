import Peer from "peerjs";

import { Button } from "../../ui/components/Button";
import { Div } from "../../ui/components/Div";
import { Input } from "../../ui/components/Input";
import { byId } from "../../ui/utils/DomUtils";

const getUserMedia =
    (navigator as any).getUserMedia ||
    (navigator as any).webkitGetUserMedia ||
    (navigator as any).mozGetUserMedia;

const root = byId("root");

const connectionDetails = Div();

const myId = Input();
connectionDetails.append(myId);

const peerId = Input();
connectionDetails.append(peerId);

const connectBtn = Button({
  innerText: "connect",
  onClick: handleConnectClicked,
});
connectionDetails.append(connectBtn);

const callBtn = Button({
  innerText: "Call",
  onClick: handleCallClicked,
});

connectionDetails.append(callBtn);
root.append(connectionDetails)

let peer = null;

function handleConnectClicked() {
  peer = new Peer(myId.value);

  peer.on("call", function (call) {
    getUserMedia(
      {
        video: { width: 1280, height: 720 },
        audio: true,
      },
      function (stream) {
        call.answer(stream);
        call.on("stream", handleRemoteStream);
      },
      function (err) {
        console.error("Failed to get local stream", err);
      }
    );
  });
}

const peerVideo = document.createElement("video");
root.append(peerVideo);

function handleRemoteStream(remoteStream) {
  peerVideo.srcObject = remoteStream;
}

function handleCallClicked() {
  if (!peer) {
    alert("Peer not connected");
  }

  getUserMedia(
    { video: { width: 1280, height: 720 }, audio: true },
    function (stream) {
      var call = peer.call(peerId.value, stream);
      call.on("stream", handleRemoteStream);
    },
    function (err) {
      console.error("Failed to get local stream", err);
    }
  );
}
