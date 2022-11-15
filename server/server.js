const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

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

// Serve static files
app.use(express.static('build'));

// // App Set //
// const PORT = process.env.PORT || 5000;

// /** Listen * */
// app.listen(PORT, () => {
//   console.log(`Listening on port: ${PORT}`);
// });

const http = require('http'); // socket.io runs on http express server
const port = 5000;
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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
  },
});

// .on method is a listener
// .on([event name], (payload to receive) => { ... do things })

// .emit method is a handler
// .emit([event name], (payload to send) => { ... do things })

// When someone connects to the server
io.on('connection', (socket) => {
  console.log('A NEW USER CONNECTED', socket.id);
  // When client-side 'emits' a 'chat message' ...
  socket.on('send_message', msg => {
    // ... send it to everyone connected, including the one who sent it
    io.emit('send_message', msg);
    console.log('NEW MESSAGE -- ', msg);
  });
  socket.on('disconnect', () => {
    // when a client disconnects, tell the server
    console.log('user Disconnected');
  })
});

// http server listening...
server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});