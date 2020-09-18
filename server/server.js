const options = {}
const io = require('socket.io')(3000, options)

io.on('connection', (socket) => {
    const userPhone = socket.handshake.query.phone

    console.log(`User connected :${userPhone}`)

    socket.join(userPhone)

    socket.on('send-message', (args) => {
        const { message, chatId, sender, receivers } = args
        if (Array.isArray(receivers)) {
            for (let receiver of receivers) {
                socket.to(receiver).emit('new-message', {
                    message,
                    chatId,
                    sender,
                    chatUsers: [userPhone, ...receivers]
                })
            }
        }
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected :${userPhone}`)
    })
})

console.log('Socket IO started')
