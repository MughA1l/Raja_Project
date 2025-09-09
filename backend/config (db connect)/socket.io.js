
import http from 'http';
import { Server } from 'socket.io';

let stats = {
    total: 0,
    processed: 0
}

let server;
let io;
let corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
const createSocketServer = (app) => {
    server = http.createServer(app);

    io = new Server(server, ({
        cors: corsOptions
    }))

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // Send current stats on connect
        socket.emit("statsUpdate", stats);

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return server;
}

const emitStats = () => io.emit('stats', stats)

export { io, emitStats, createSocketServer };
