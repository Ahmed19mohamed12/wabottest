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
            const media = MessageMedia.fromFilePath('Round 2.png'); // Update with your media path
        let number = contacts[i].number;
        if(Number.isInteger(parseInt(number))){
            let number2 = contacts[i].number + '@c.us'; // Format the number
            const message = `Chapter two Done ✅✅ 
يبقى حان الوقت للworkshop 😌😌 
او يوم ال physics day 🔥
Round 2 🔥 
بعد زيادة الطلب علي إعادة شرح الورك شوب 😉
…..
طبعاً شابتر 2 كشرح خلص لكن زي ما إتعودنا يا صديقي في نهاية كل شابتر لازم نجمع كل افكاره و تريكاتة في وركشوب  تلم الدنيا كلها 👌👌
🔴 طب يا مستر نستعد إزاي للحل و انا اصلا مش عارف الشرح ؟ 
- كل اللي مطلوب منك بصديقي إنك تشوف فيديوهات الشرح دي وسيب الباقي علي ابو حميد 

الفيديو الاول 👇
📌 خاص بشرح ( wire - coil - solenoid)
https://youtu.be/P4tRL2j5Gnw

الفيديو التاني 👇 
خاص بشرح ال ( Force - torque)
https://youtu.be/AzQ2_qla6n8

الفيديو التالت 👇
خاص بشرح ال Devices
https://youtu.be/DpdV6iYf_i8

…… 
بس هو دة اللي مطلوب منك يا صديقي و الباقي علينا 😌😌  

🔴 طب ميعادنا إمتى ؟ 
- يوم الاحد الساعه 1:00 ظهرا 
🔴 طب فين ؟ 
Future academy - ATP 
شبرا 

Location ⬇️⬇️ 

 https://maps.app.goo.gl/k2JGznmdha5r5KQUA
…… 
جاهزين 🤔🔥`; // Customize your message
    
    
            try {
    
                const response = await client.sendMessage(number2,message);
    
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
