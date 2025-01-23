import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: 'http://localhost:5173',
        methods:['GET','POST']
    }
})

const userSocketMap = {};

export const getRecieverSocketId = (recieverId) => userSocketMap[recieverId];

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if(userId) {
        userSocketMap[userId] = socket.id;
        console.log("user connected " ,userSocketMap)
    }

    socket.on('disconnect', () => {
        if(userId) {
            delete userSocketMap[userId];
        console.log("user disconnected " ,userSocketMap)
        }
    });
})

export {app, server, io};