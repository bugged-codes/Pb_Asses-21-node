const express = require('express');
const app = express();
const PORT = 4000;
const socket = require('socket.io');
const cors = require('cors');
app.use(cors());

const server = app.listen(PORT, () => {
	console.log('\tListening on PORT: 4️⃣ 0️⃣ 0️⃣ 0️⃣');
});

const io = socket(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socketClient) => {
	// console.log('Socket Details are: ', socketClient);
	console.log("\tConnected Socket's ID is: ", socketClient.id);
	socketClient.emit('message', 'This is Server! Does anyone copy..?');
	socketClient.on('acknowledgement', (clientAcknowledgement) => console.log('Response from Client:\t', clientAcknowledgement));
	socketClient.on('disconnect', () => console.log('🚨 Attention:\tClient just went dark! 😠'));
});

app.get('/', (req, res) => {
	res.send('<h1>This is Home page..!</h1>');
});
