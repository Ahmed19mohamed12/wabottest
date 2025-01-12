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
            const media = MessageMedia.fromFilePath('3ff0e57c-6c48-4ab5-8078-eb7eabf1ab95.jpeg'); // Update with your media path
        let number = contacts[i].number;
        if(Number.isInteger(parseInt(number))){
            let number2 = contacts[i].number + '@c.us'; // Format the number
            const message = ` شايفك ياللي قاعد متسوح ومش عارفها تلم المادة ازاي 🧐

دا فيديو مراجعة امتحان كامل عشان تاخد علي مود الامتحان 
( الامتحان في افكار عالية جدا ) 
https://youtu.be/xmJTd8zkIYY

طيب انت محتاج تراجع علي حاجة من الشرح ف دا شرح المنهج كامل معاك
شرح شابتر 1
https://www.youtube.com/playlist?list=PLdCOTWj2D0j25DOkTlNFrlegJK_2DT2qj

شرح شابتر 2
 https://www.youtube.com/playlist?list=PLdCOTWj2D0j0GKw5O_TdU5r__Wwe1vlnm

شرح شابتر 3 
 https://www.youtube.com/playlist?list=PLdCOTWj2D0j3WjM9bshSWnwqGmRvWVjYk

شرح شابتر 4 https://www.youtube.com/playlist?list=PLdCOTWj2D0j2-lTW_vkx22EXdTjvbq8Pd

و لو محتاج هبعتلك pdf في حل امتحان الوزراة منزلاه بالحل بتاعه

ملحوظة هامة جدا 
اي حد عنده سؤال في أي حاجة يبعت فورا 

ربنا معاكم يارب`;
    
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
