
const app = require('./app');
const { OnListening, onServernError } = require('./handlers/server-events');
const http = require('http');
const Server = http.createServer(app);
const PORT = process.env.PORT || 3000
const dbConnection = require("./db/mongoose");

Server.listen(PORT, function () {
  console.log("app running on port: " + PORT)
});

Server.on("error", (err) => onServernError(err, PORT))
Server.on('listening', () => OnListening(Server))