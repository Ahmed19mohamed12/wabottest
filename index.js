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

        const message = `زيتونة light ☄️
  📢 لكل طلبة الصف التاني الثانوي 💪 
اهم واقوى مراجعة علي chapter 2 🔥 
تلتين المنهج في جيبك 👌🧐
خليك جاهز ومستنينك في المواعيد اللي موجودة 👇
معادنا في سنتر k 💪 
📆يوم الخميس  الموافق ٢١ نوفمبر 
ا 🕰️ الساعة ٤ ونص مساءا


ولو عندك اي استفسار تقدر تسالنا علي رسائل الصفحة أو الارقام الاتية 
01145713378
01090421852`; // Customize your message


        try {

            const response = await client.sendMessage(number, media, { caption: message });

            console.log(`Message sent to ${number}:`, response);

        } catch (err) {

            console.error(`Failed to send message to ${number}:`, err);

        }


        await delay(6000); // Delay to avoid rate limiting

    }

});


client.initialize();
