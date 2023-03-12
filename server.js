const express = require('express');
const app = express();
const path = require('path');
const PORT = 4000;
const socket = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
// app.use(cors());
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

const server = app.listen(PORT, () => {
	console.log('\tListening on PORT: 4000');
});

const io = socket(server, {
	cors: {
		origin: '*',
	},
});

const users = {};
// * Socket server for clients.
/*
io.on('connection', (socketClient) => {
	// console.log('Socket Details are: ', socketClient);
	console.log(`Connected client socketID is:\t`, socketClient.id);
	socketClient.broadcast.emit('broadcast-message', 'This is Server! Does anyone copy..?');
	socketClient.on('acknowledgement', (clientAcknowledgement) => console.log('👂 Response from Client:\t', clientAcknowledgement));
	socketClient.on('disconnect', () => {
		console.log(`🚨 Attention:\tClient- just went dark! 😠`);
	});
});
*/

io.on('connection', (socket) => {
	console.log('Client connected');
	socket.on('new-user-joined', (name) => {
		console.log(name, 'has joined the chat.');
		users[socket.id] = name;
		socket.broadcast.emit('user-joined', name);
	});

	socket.on('send', (Message) => {
		socket.broadcast.emit('receive', { message: Message, name: users[socket.id] });
	});
	socket.on('disconnect', () => {
		socket.broadcast.emit('disconnected', `${users[socket.id]} has left the chat`);
		delete users[socket.id];
	});
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + './public/index');
});
