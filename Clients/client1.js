const clientIo = require('socket.io-client');

const client = clientIo('http://localhost:4000');

client.on('connect', () => {
	console.log('🎉 Client Connected to Server');
});

client.on('broadcast-message', (serverData) => {
	console.log('👉 Received Data from Server:\t', serverData);
	client.emit('acknowledgement', 'Client 1️⃣ acknowledges the message from server.🫡');
});

client.on('disconnect', () => console.log('🚨 Attention:\tWe just lost the server 😬'));
