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
            const media = MessageMedia.fromFilePath('IMG-20250113-WA0000.jpg'); // Update with your media path
        let number = contacts[i].number;
        if(Number.isInteger(parseInt(number))){
            let number2 = contacts[i].number + '@c.us'; // Format the number
            const message = `طلاب تانية ثانوي 💪 
في جميع أنحاء الجمهورية 📢
مستر أحمد عبد المنعم 👌
عاملك طريقين لمراجعة ليلة الامتحان وكلهم مجانا علي اليوتيوب 🔥🔥
الطريق الاول 👇 
⛔ لو انت عاوز فيديو واحد يلملك المنهج كله ف كل اللي عليك تشوف الفيديو دا 👇 
https://youtu.be/HqOCP1mLxH8?si=eB0bDPXX1B9UBALp

وتتفرج علي فيديوهات حل امتحانات اللي موجودة 👇 
https://youtube.com/playlist?list=PLdCOTWj2D0j2SJPrxpYlkQjGN-6NXJiSx&si=C3zmzRhe1Dii5onh

طيب لو انت عاوز فيديوهات شرح تفصيلي ف برضو عملتلك بلاي ليست فيها تقريبا كل حاجة تخص المنهج بالتفاصيل 👇
https://youtube.com/playlist?list=PLdCOTWj2D0j1pm-BtKVOmucB1e1HdKUCK&si=PACGV654su9M5T-s

وبرضو تتفرج علي حل امتحانات ليلة الامتحان 
https://youtube.com/playlist?list=PLdCOTWj2D0j2SJPrxpYlkQjGN-6NXJiSx&si=C3zmzRhe1Dii5onh

ومتنساش يا صديقي 🤔
مواعيد ليالي الامتحان في السناتر 
يوم الثلاثاء 14 يناير 
الساعة 12 ظهرا في سنتر كوليدج جولد  💪
الساعة 3:30 في سنتر ليرن المهندسين 💪`;
    
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
