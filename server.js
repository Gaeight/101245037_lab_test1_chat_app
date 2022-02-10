const express = require('express');
const mongoose = require('mongoose');
const app = require('express')()

const http = require('http').createServer(app)
const server = require('http').Server(app)
const cors = require('cors')
const io = require('socket.io')(http)
const PORT = 8081

var User = require("./models/users")


//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://Bella:Meow@cluster0.f06jt.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/', express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Chat server running...")
})

app.get("/loginPage.html", (req, res) => {
    res.sendFile(__dirname + "/loginPage.html")
})

app.get("/signup.html", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.get("/chatPage.html", (req, res) => {
    res.sendFile(__dirname + "/chatPage.html")
})

app.get("/chatRoom.html", (req, res) => {
    res.sendFile(__dirname + "/chatRoom.html")
})

io.on('connection', (socket) => {
    console.log('connected')
    socket.emit('welcome', 'Welcome to Socket Programming')
    
    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('newMessage', data)
    })

    socket.on('createUser', (firstname, lastname, username, password) => {
        const createdUser = User()
        console.log(firstname, lastname, username)
        createdUser.firstname = firstname
        createdUser.lastname = lastname
        createdUser.username = username
        createdUser.password = password
        createdUser.save()
    })

    socket.on('loginUser', (username, password) => {
        if(User.findOne({username: username, password: password})) {
            console.log("USER LOGGED IN")
        }
        else {
            console.log("USER DOESN'T EXIST")
        }
    })

    socket.on('joinRoom', (roomName => {
        console.log(roomName)
        socket.join(roomName)
    }))

    socket.on('directMessage', message => {
        console.log(message)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

http.listen(PORT, () => {
    console.log(`Connected to ${PORT}`)
})