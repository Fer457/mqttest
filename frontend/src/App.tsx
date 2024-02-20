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
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="flex mt-4 bg-[#00567d] relative w-40 h-36 p-4">
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          type="button"
          className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[35px] border-solid border-l-transparent border-r-transparent border-b-white  bg-no-repeat bg-contain absolute top-2 left-1/2 -translate-x-1/2"
        ></button>
        <button
          type="button"
          className="w-0 h-0 border-t-[25px] border-b-[25px] border-r-[35px] border-solid border-t-transparent border-b-transparent border-r-white bg-no-repeat bg-contain absolute left-2 top-1/2 -translate-y-1/2"
        ></button>
        <button
          type="button"
          className="w-0 h-0 border-t-[25px] border-b-[25px] border-l-[35px] border-solid border-t-transparent border-b-transparent border-l-white bg-no-repeat bg-contain absolute right-2 top-1/2 -translate-y-1/2"
        ></button>
      </div>
    </div>
  );
};

export default ChatPage;
