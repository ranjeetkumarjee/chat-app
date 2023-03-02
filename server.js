const express =require(`express`)
const app =express()

const http=require(`http`).createServer(app)
const io=require('socket.io')(http);
const por=500
const PORT=process.env.PORT||por
var path = require('path')
app.use(express.static(path.join(__dirname, '/public')));


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/chat.html')
})

http.listen(PORT,()=>{
    console.log(`listenign on port ${PORT}`)
})


// socket 


io.on('connection',(socket)=>{
    // console.log("socket connected");
    // listen socket from client side
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})