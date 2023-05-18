const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin:'*'}})

const PORT = 3001

io.on('connection', socket =>{
    socket.on('set_username', username => {
        socket.data.username = username
        console.log("Usuário conectado ", socket.data.username );
        
    })

    socket.on('disconnect', reason => {
        console.log("Usuário desconectardo ", socket.data.username);
    })

    socket.on('message', text => {
        io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

server.listen(PORT, ()=> console.log('server running...'))