//node server which will handle socket io connections
const io = require('socket.io')(8000);//for installing module

const users = {};//for all users to be connected
io.on('connection', socket => {//socket.io instance and will listen 
    socket.on('new-user-joined', nm => {//for particular instance 
        console.log("new user :", nm);
        users[socket.id] = nm;
        socket.broadcast.emit('user-joined', nm);
    });
    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, nm: users[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})