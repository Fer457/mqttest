import io, { Socket } from "socket.io-client";
const socket: Socket = io("http://localhost:3001");

const ChatPage = () => {
  let intervalId: NodeJS.Timeout;

  const joinRoom = (roomId: string) => {
    socket.emit("join_room", roomId);
  };

  const handleMouseDown = () => {
    joinRoom("sala");
    intervalId = setInterval(() => joinRoom(intervalId.toString()), 100);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
  };

  return (
    <div>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        SALA
      </button>
    </div>
  );
};

export default ChatPage;
