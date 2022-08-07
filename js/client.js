const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageinp = document.getElementById('inp');
const messagecontainer = document.querySelector(".container");
const nm = prompt("enter your name to join");
socket.emit('new-user-joined', nm);


socket.on('user-joined', nm => {
    append(`${nm} joined the chat`, 'right');

})

const append = (message, position) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if (position == 'left') {
        audio.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

socket.on('recieve', data => {
    append(`${data.nm}:${data.message}`, 'left');
})

socket.on('left', nm => {
    append(`${nm}left the chat`, 'left');
})


var audio = new audio('mess.mp3');




