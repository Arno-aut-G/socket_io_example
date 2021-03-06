const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
    console.log(socket.id)
    io.emit('chat message', 'A user connected')


    socket.on('disconnect', () => {
        io.emit('chat message', 'A user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
})

server.listen(3000, () => {
    console.log('listening on *: 3000')
})