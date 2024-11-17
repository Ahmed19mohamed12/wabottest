const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const qrcode = require('qrcode-terminal');

const fs = require('fs');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const client = new Client({

    puppeteer: {

        args: ['--no-sandbox', '--disable-setuid-sandbox']

    },

    authStrategy: new LocalAuth() // Use LocalAuth for session management

});


client.on('qr', (qr) => {
    console.log(qr);
    qrcode.generate(qr, { small: true });

console.log('QR Code generated, scan it with your WhatsApp app.');

});


client.on('ready', async () => {

    console.log('Client is ready!');


    // Read the list of numbers from a JSON file

let contacts = fs.readFileSync('parents.json');

    contacts = JSON.parse(contacts);


    // Loop through the numbers and send messages

    for (let i = 0; i < contacts.length; i++) {

        const media = MessageMedia.fromFilePath('1.jpg'); // Update with your media path

        let number = contacts[i].number + '@c.us'; // Format the number

        const message = `Hello, this is a message `; // Customize your message


        try {

            const response = await client.sendMessage(number, media, { caption: message });

            console.log(`Message sent to ${number}:`, response);

        } catch (err) {

            console.error(`Failed to send message to ${number}:`, err);

        }


        await delay(1000); // Delay to avoid rate limiting

    }

});


client.initialize();
