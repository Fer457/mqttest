import io, { Socket } from "socket.io-client";
import {
  CallControls,
  CallingState,
  ParticipantView,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from "@stream-io/video-react-sdk";
import "./style.css";
const socket: Socket = io("http://localhost:3001");

const apiKey = "mmhfdzb5evj2"; // the API key can be found in the "Credentials" section
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVWxpY19RZWwtRHJvbWEiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1VsaWNfUWVsLURyb21hIiwiaWF0IjoxNzA0OTgxMzQzLCJleHAiOjE3MDU1ODYxNDh9.13Q5UYWTprR0m6mJUgwDPVwpeZr7X0ltXV3BF0UzQyk"; // the token can be found in the "Credentials" section
const userId = "Ulic_Qel-Droma"; // the user id can be found in the "Credentials" section
const callId = "HP9qQ56VWjav"; // the call id can be found in the "Credentials" section

// set up the user object
const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

const ChatPage = () => {
  let intervalId: NodeJS.Timeout;

  const joinRoom = (action: string) => {
    socket.emit("join_room", { action });
  };

  const handleMouseDown = (action: string) => {
    joinRoom(action);
    intervalId = setInterval(() => joinRoom(action), 100);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
    joinRoom("stop"); // Enviar acción para detener el robot
  };

  return (
    <>
      <div>
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <MyUILayout />
          </StreamCall>
        </StreamVideo>
      </div>
      <div>
        <button onMouseDown={() => handleMouseDown("forward")} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          ADELANTE
        </button>
        <button onMouseDown={() => handleMouseDown("right")} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          DERECHA
        </button>
        <button onMouseDown={() => handleMouseDown("left")} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          IZQUIERDA
        </button>
        <button onMouseDown={() => handleMouseDown("arriba")} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          ARRIBA
        </button>
        <button onMouseDown={() => handleMouseDown("abajo")} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          ABAJO
        </button>
      </div>
    </>
  );
};

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
};

export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant }) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      <ParticipantView participant={participant as StreamVideoParticipant} />
    </div>
  );
};

export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};

export default ChatPage;
