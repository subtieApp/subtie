const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 5000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  const ROOM = 'first room';
  socket.join(ROOM, () => {
    socket.use((packet, next) => {
      socket.to(ROOM).emit(packet);
      next();
    });
  });
});