const io = require('socket.io-client');

const client = io('http://localhost:4000');

client.on('connect', () => console.log('Connected to Server!!'));

client.on('message', (data) => {
	console.log('Data received:\t', data);
	client.emit('acknowledgement', 'This client acknowledges the message from server.🫡');
});

client.on('disconnect', () => {
	console.log('Disconnected from server');
});
