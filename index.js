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
    await delay(20000);

    // Read the list of numbers from a JSON file

let contacts = fs.readFileSync('parents.json');

    contacts = JSON.parse(contacts);


    // Loop through the numbers and send messages

    for (let i = 0; i < contacts.length; i++) {

        const media = MessageMedia.fromFilePath('WhatsApp Image 2024-11-20 at 11.13.23 PM.jpeg'); // Update with your media path

        let number = contacts[i].number + '@c.us'; // Format the number
        let name = contacts[i].name;
        let mark = contacts[i].mark;
        const message = `السلام عليكم ولي امر الطالب / ${name} ❤️
معاد الحصة الجاية بكرا ان شاءالله الساعة 7 ياريت بدون تأخير ⏰ 
درجة الحصة الي فاتت ${mark}

*Quadro Team With Kareem El Fayed ❤️🌹*`; // Customize your message


        try {

            const response = await client.sendMessage(number,message);

            console.log(`Message sent to ${number}:`, response);

        } catch (err) {

            console.error(`Failed to send message to ${number}:`, err);

        }


        await delay(6000); // Delay to avoid rate limiting

    }

});


client.initialize();
