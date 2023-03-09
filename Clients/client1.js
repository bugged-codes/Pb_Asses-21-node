const clientIo = require('socket.io-client');

const client = clientIo('http://localhost:4000');

client.on('connect', () => {
	console.log('🎉 Client Connected to Server');
});

client.on('message', (serverData) => {
	console.log('👉 Received Data from Server:\t', serverData);
	client.emit('acknowledgement', 'Copied. This is Client.');
});

client.on('disconnect', () => console.log('🚨 Attention:\tWe just lost the server 😬'));
