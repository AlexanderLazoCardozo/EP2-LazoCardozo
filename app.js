const express = require("express")
const app = express()
const port = 2000

const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io")

const io = new Server(server)

app.use(express.static(__dirname + '/client'));

io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado")

    socket.on("disconnect", () => {
        console.log("Un usuario se ha desconectado")
    })

    socket.on("chat", (msg) => {
        console.log("mensaje: " + msg)

        io.emit("chat", { text: msg, userId: socket.id })
    })
})

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/client/index.html`)
})

server.listen(port, () => {
    console.log("server is running on port: ", port, " http://localhost:" + port)
})
