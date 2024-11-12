const { Client, LocalAuth } = require('whatsapp-web.js');

const express = require('express');

const app = express();


// Create a new WhatsApp client instance

const client = new Client({

    authStrategy: new LocalAuth() // Use LocalAuth for session management

});
client.on('qr', (qr) => {

    console.log('QR Code generated, scan it with your phone:');

    console.log(qr); // You can use a library to display this QR code in a web app

});

// Event when the client is ready

client.on('ready', () => {

    console.log('Client is ready!');

});


// Event when a message is received

client.on('message', message => {

    console.log('Received message:', message.body);

    

    // Example: Reply to the received message

    if (message.body === 'Hello') {

        message.reply('Hello! How can I help you?');

    }

});


// Start the client

client.initialize();


// Set up a basic Express server

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {

    res.send('WhatsApp Bot is running!');

});


// Start the Express server

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});