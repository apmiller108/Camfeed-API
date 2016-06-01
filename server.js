'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/:piId', (req, res) => {
  console.log(req);
});

io.on('connection', (socket) => {

  socket.on('connection made', (data) => {
    console.log(data); 
  });

  socket.on('room', (room) => {
    socket.room = room;
    socket.join(room);
    socket.emit('room', `Successfully joined room: ${room}`);
  });

  socket.on('play', (data) => {
    if(data) {
      io.to(socket.room).emit('start feed', true);
    }
  });

  socket.on('stop', (data) => {
    if(data) {
      io.to(socket.room).emit('stop feed', true);
    }
  });
});

http.listen(3000, () => {
  console.log('Camfeed API started and listening on port 3000');
});
