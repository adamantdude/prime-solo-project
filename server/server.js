const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const messageRouter = require('./routes/message.router');
const userbaseRouter = require('./routes/userbase.router');
const historyRouter = require('./routes/history.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/messenger', messageRouter);
app.use('/api/userbase', userbaseRouter);
app.use('/api/history', historyRouter);

// Serve static files
app.use(express.static('build'));

// // App Set //
// const PORT = process.env.PORT || 5000;

// /** Listen * */
// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}`);
// });

const http = require('http'); // socket.io runs on http express server
const PORT = process.env.PORT || 5000;
const cors = require('cors'); // Cross-Origin Resource Sharing
// Allows users to send data back and forth
// by telling the http server what origins are permitted

// A socket.io server that becomes persistent on start
// Continues listening and handling data so there is real-time
// updates upon events.
const { Server } = require('socket.io');

app.use(cors()); // cors middleware

// create the http based server
// needed for socket.io
const server = http.createServer(app);

// create the socket.io server and latch it onto the http
// server just created, with a CORS header
const origin = process.env.ORIGIN || "http://localhost:3000";

const io = new Server(server, {
  cors: {
    origin: origin,
    methods: ['GET', 'POST'],
  },
});

// .on method is a listener
// .on([event name], (payload to receive) => { ... do things })

// .emit method is a handler
// .emit([event name], (payload to send) => { ... do things })

let users = [];

// When someone connects to the server
io.on('connection', (socket) => {

  console.log('A NEW USER CONNECTED', socket.id, socket.username);

  // ----------- socket is mutable
  socket.on('uniqueIDSET', (data) => {
    socket.user = {
      user_id: data.user_id,
      character_name: data.character_name,
      character_id: data.character_id
    }
  })
  // -----------

  // When client-side 'emits' a 'chat message' ...
  socket.on('send_message', (data) => {

    io.to(data.room).emit('send_message');
  });

  socket.on('join_room', (room, oldRoom) => {
    socket.leaveAll();
    socket.join(room);

    users = users.filter(x => x.user_id != socket.user.user_id);

    users.push({ ...socket.user, room: room });

    console.log(users);
    io.to(room).to(oldRoom).emit('user_list', users);
  })

  socket.on('logout', () => {
    socket.leaveAll();

    users = users.filter(x => x.user_id != socket.user.user_id);

    socket.broadcast.emit('user_list', users);
  })

  socket.on('send_info', (id) => {
    console.log(id);
  })

  socket.on('disconnect', () => {
    // when a client disconnects, tell the server
    console.log('User Disconnected');
  })
});

// http server listening...
server.listen(PORT, () => {
  console.log(`Socket.IO server running at ${PORT}`);
});

// const clients = io.sockets.adapter.rooms.get(socket.id);
// console.log(clients);
// let clientSocket = Array.from(clients);
// console.log(clientSocket);
// console.log(socket.user);