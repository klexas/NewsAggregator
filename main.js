require("dotenv").config();

const express = require('express');
const morgan = require("morgan");
const {log} = require("mercedlogger");

const bodyParser = require('body-parser')
const config = require('./config.json');
const port = process.env.PORT || config.port;
const router = require('./routes/api');
const app = express();
const cors = require('cors');
const server =  require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'));
app.use('/api', router);

io.on('connection', (socket) => {
  log.magenta('a user connected');
});

// websocket
server.listen(config.port_ws, () => {
    log.green("WS STATUS", 'listening on *:' + config.port_ws);
});

// http
app.listen(port, () => {
  log.green("SERVER STATUS",'Server started on port ' + port);
});
