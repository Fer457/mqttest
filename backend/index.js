const cors = require("cors");
const http = require("http");
const express = require("express");
const socketConnection = require("./io");
const app = express();
app.use(cors());

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});

app.use(express.json());

socketConnection(io);

server.listen(3001, () => console.log("Server started"));
