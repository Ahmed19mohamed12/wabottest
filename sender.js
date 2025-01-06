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
            // const media = MessageMedia.fromFilePath('WhatsApp Image 2025-01-06 at 5.00.05 PM(1).jpeg'); // Update with your media path
        let number = contacts[i].number;
        if(Number.isInteger(parseInt(number))){
            let number2 = contacts[i].number + '@c.us'; // Format the number
            const message = `Workshop chapter 3 
📅يوم الثلاثاء 
🕜 الساعه ٢ عصرا 
📌 المكان : سنتر ليرن المهندسين 
تستعد ازاي ؟  🤔
لازم قبل الوركشوب تكون مخلص ماتريال شرح chapter 3 
علشان هنحل كتير جدا و الحصة حرفيا هتمللك كل حاجة فش الشابتر 
الحصة هتكون مقسمة لتلات اجزاء ( جزء شرح - جزء حل - جزء انت هتحل ) 😉😉
 بس ياصديقي لو في حاجة واقعة منك عاوزك تكون  مجمع معايا الشرح ⬇️⬇️ 
دي ماتريال شرح شابتر ٣ 
1️⃣ https://youtu.be/uO3YlOdpk8k?si=1zANbEUMRH-aPBIJ
2️⃣ https://youtu.be/RmZb1yIkT6Q?si=BpXGzPKLwICfcvTD
3️⃣ https://youtu.be/coxjTe6dfWA?si=KXgBhf4M9bJ9PMfT 
انتظروا اقوي ورك شوب علي شابتر 3 🔥😎
ملحوظة : مسموح بدخول طلبة جدد 👌`;
    
    
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
