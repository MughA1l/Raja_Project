import http from 'http';
import { Server } from 'socket.io';

let stats = { total: 0, processed: 0 };
let message;

let server;
let io;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

const createSocketServer = (app) => {
  server = http.createServer(app);

  io = new Server(server, { cors: corsOptions });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.emit('statsUpdate', stats);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return server;
};

const emitStats = (newStats) => {
  if (!io) {
    console.error('Socket.io not initialized yet');
    return;
  }
  stats = newStats;
  io.emit('statsUpdate', stats);
};

const emitNotification = (msg) => {
  if (!io) {
    console.error('Socket.io not initialized yet');
    return;
  }
  io.emit('notify', msg);
};

export { io, emitStats, emitNotification, createSocketServer };
