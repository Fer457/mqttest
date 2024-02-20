const axios = require('axios');

const username = 'intecfull';
const password = 'intecfullpassword';
const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

const socketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join_room", (data) => {
      console.log(`User with id ${socket.id} is sending requests with action ${data.action}`);

      const postData = {
        action: data.action, // Usar la acción recibida del cliente
      };

      axios.post('http://10.14.0.165:1880/endpoint/api/robot/control', postData, {
        headers: {
          'Authorization': `Basic ${base64Credentials}`
        }
      })
      .then(response => {
        console.log('Petición POST exitosa', response.data);
      })
      .catch(error => {
        console.log('Error al realizar la petición POST', error.message);
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected ", socket.id);
    });
  });
};

module.exports = socketConnection;
