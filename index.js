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
        const media = MessageMedia.fromFilePath('WhatsApp Image 2024-11-17 at 6.50.41 PM.jpeg');
        let number = parents[i].number + '@c.us'; // Format the number
        const message = "زيتونة light ☄️\n
  📢 لكل طلبة الصف التاني الثانوي 💪 \n
اهم واقوى مراجعة علي chapter 2 🔥 \n
تلتين المنهج في جيبك 👌🧐\n
خليك جاهز ومستنينك في المواعيد اللي موجودة 👇\n
مواعيدنا في سنتر ليرن المهندسين 💪 \n
📆يوم الثلاثاء الموافق 19 نوفمبر \n
المعاد الاول 🕰️ الساعة 3 عصرا \n
المعاد التاني 🕰️ الساعة ٦ مساءا \n

ولو عندك اي استفسار تقدر تسالنا علي رسائل الصفحة أو الارقام الاتية \n
01145713378\n
01090421852";
        client.sendMessage(number,media,{caption: message})
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
