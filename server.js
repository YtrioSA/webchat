const express = require("express");
const app     = express();

const http    = require("http").Server(app);
const serverSocket = require("socket.io")(http);

const porta = 8000;

app.use(express.static("public"));

http.listen(porta, () => {
    console.log(`http://localhost:${8000}`);
});

app.get("/",(req,resp) => {
    resp.sendFile(__dirname + "/index.html");
});

serverSocket.on("connection",(socket) => {

    socket.on("login",(nickname) => {
        console.log(`Cliente Conectado: ${nickname}`);
        serverSocket.emit("chat msg",`Usuário:${nickname} conectou.`);
        socket.nickname = nickname;
    });
    
    socket.on("chat msg",(msg) => {
        console.log(`Msg Recebida do cliente: ${socket.nickname}: ${msg}`);
        serverSocket.emit("chat msg",`${socket.nickname}:${msg}`);
    });

    socket.on("status",(msg) => {
        socket.broadcast.emit("status",msg);
    });


});