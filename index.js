const { Client, LocalAuth ,MessageMedia } = require('whatsapp-web.js');
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
    qrcode.generate(qr, {small: true});
    console.log(qr);
});

client.on('ready',  async () => {
    console.log('Client is ready!');

    // Read the list of numbers from a JSON file
    let parents = fs.readFileSync('parents.json');
    parents = JSON.parse(parents);

    // Loop through the numbers and send messages
    for (let i = 0; i < parents.length; i++) {
        const media = MessageMedia.fromFilePath('1.jpg');
        let number = parents[i].number + '@c.us'; // Format the number
        client.sendMessage(number,media,{caption:'أهلا وسهلا\n ♥♥ يا احمد'})
            .then(response => {
                console.log(`Message sent to ${number}:`, response);
            })
            .catch(err => {
                console.error(`Failed to send message to ${number}:`, err);
            });
        await delay(5000);
        
    }
});

client.initialize();
