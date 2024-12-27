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
            // const media = MessageMedia.fromFilePath('WhatsApp Image 2024-12-12 at 2.57.02 AM.jpeg'); // Update with your media path
        let number = contacts[i].number;
        if(Number.isInteger(parseInt(number))){
            let number2 = contacts[i].number + '@c.us'; // Format the number
            const message = `اول مفاجاتنا 💪😉
هتكون لطلابنا في اولي ثانوي 💪 
شرح المنهج كله مجانا علي اليوتيوب 😉 
شرح chapter 1 

https://www.youtube.com/playlist?list=PLdCOTWj2D0j25DOkTlNFrlegJK_2DT2qj

شرح chapter 2
https://www.youtube.com/playlist?list=PLdCOTWj2D0j0GKw5O_TdU5r__Wwe1vlnm

شرح chapter 3 
https://www.youtube.com/playlist?list=PLdCOTWj2D0j3WjM9bshSWnwqGmRvWVjYk

شرح chapter 4 

https://www.youtube.com/playlist?list=PLdCOTWj2D0j2-lTW_vkx22EXdTjvbq8Pd

 وانتظروا اقوي المراجعات 🔥🔥
ااة زي ما قرأت 🤔
 مراجعات Integrated Science فرى على YouTube! 🔥**  

لكل الطلبة اللي كانوا نايمين ومش مركزين 😴 
فوق كده معانا مش هنسيبك نااايم🤌
جهزنا لكم مراجعات قوية ومجانية  على قناتنا على YouTube!  

✨ *إيه اللي مستنيك؟*  
- شرح بسيط وسهل جدًا لكل شابتر
- حلول أسئلة مهمة عشان تبقى جاهز لأي امتحان.  
- نصايح ذهبية هتفرق معاك في المذاكرة.  

✔️ المراجعات هتكون متاحة علي قناتنا ، يلا متضيعش وقت!  
🎥 اشترك في القناة وفعّل الجرس عشان توصلك كل جديد.  

لو عندك أي سؤال أو محتاج حاجة، اكتب لنا في الكومنتات!  

#Integrated_Science #مراجعات_ببلاش #YouTube';
    
    
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
