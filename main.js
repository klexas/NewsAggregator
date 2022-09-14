var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var config = require('./config');
var port = process.env.PORT || config.port;
var router = require('./routes/api');
var app = express();
var cors = require('cors');
const server =  require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(__dirname + '/public'));
app.use('/api', router);

io.on('connection', (socket) => {
    console.log('a user connected');
});

// websocket
server.listen(config.port_ws, () => {
    console.log('listening on *:' + config.port_ws);
});

// http
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
