const socketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("send_message", async (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
    socket.on("join_room", (data) => {
      console.log(`User with id ${socket.id} is sending requests`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected ", socket.id);
    });
  });
};

module.exports = socketConnection;