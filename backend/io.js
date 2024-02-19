const axios = require('axios');

// Reemplaza 'usuario' y 'contraseña' con tus credenciales reales
const username = 'intecfull';
const password = 'intecfullpassword';

// Codifica las credenciales en base64
const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

const socketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join_room", (data) => {
      console.log(`User with id ${socket.id} is sending requests`);

      const postData = {
        action: "forward",
      };

      // Añade el encabezado de autorización a tu petición
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
