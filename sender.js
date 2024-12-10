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
        try{
            const media = MessageMedia.fromFilePath('WhatsApp Image 2024-12-10 at 3.55.07 PM.jpeg'); // Update with your media path
        let number = contacts[i].number;
        if(Number.isInteger(parseInt(number))){
            let number2 = contacts[i].number + '@c.us'; // Format the number
            const message = `Second Secondary students 🚨🚨
….
الحمدلله المنهج خلص و وقت  كورس الإنقاذ بداء 🫣🫣
-سواء ان كنت راكن المادة و مذاكرتهاش
-سواء ان كنت نسيت القديم علشان انشغلت في الجديد 
- سواء إن كنت من الطلبة الليً محتاجة ال high level tricks 
- سواء إن كنت مش من طلابنا و عندك مشاكل و حابب تنضم لينا  😉 
……
فدة وقتك يابطل 🫶🏻🫶🏻 
كل اللي مطلوب منك تمشي على الplan بالظبط 👌👌 
… 
نبداء بقى ب task 1 🫣🫣
دا يا معلم فيديو شرح المنهج كله في ٣ ساعات فقط لا غير 🫣
https://youtu.be/HqOCP1mLxH8
معادنا في سنتر فيوتشر اكاديمي - ATP في شبرا
يوم الجمعة الساعة ٢ عصرا ❤️
تقدر تسالنا عن التفاصيل علي الارقام التاليه 
01145713378
01090421852

او سجل علي الفورم  التالية 👇
https://forms.gle/27EgzAms2KPWbY8t6

ومتنساش تسالنا عن المفاجأة لما تجيب صحابك الحصة 😉`; // Customize your message
    
    
            try {
    
                const response = await client.sendMessage(number2,media,{caption:message});
    
                console.log(`Message sent to ${number}:`, response);
    
            } catch (err) {
    
                console.error(`Failed to send message to ${number}:`, err);
    
            }
    
    
            await delay(6000); // Delay to avoid rate limiting
        }
        }catch(e){
            print(e);
        }
    }

});


client.initialize();
