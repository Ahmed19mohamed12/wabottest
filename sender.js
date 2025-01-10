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
            const media = MessageMedia.fromFilePath('WhatsApp Image 2025-01-06 at 5.00.05 PM(1).jpeg'); // Update with your media path
        let number = contacts[i].number;
        if(Number.isInteger(parseInt(number))){
            let number2 = contacts[i].number + '@c.us'; // Format the number
            const message = 'لكل طلاب  تالتة ثانوي في شبرا 🧐 
📢 خبر هام وعاجل 🚨
الاعلان عن كورس الإنقاذ 🔥 
عشان نلملك كل اللي تم شرحه حتي وقتنا هذا في المنهج 😉 
طيب هنعلمها ازاي ؟! 
1- هنشرح المنهج بشكل نلم بي كل تريكاته 😉
طيب يا مستر لا انا عاوز شرح تفصيلي ! 
عنيا هبعتلك فيديوهات شرح مجانا هدية مننا ليك تتفرج عليها براحتك 😱🫢

طيب والأهم من كل دا انك مش هتتطلع من الحصة غير واحنا حلينا اتقل الأفكار والمسائل 👌
⛔وجهز نفسك يا صديقي عشان هتحل بنفسك كتير 🤔
دا يا صديقي فيديو شرح تفصيلي لتوضيح خطة كورس الإنقاذ 🔥👇
https://www.facebook.com/share/p/1A6Sr8woiH/

المكان 📌 : سنتر ألفا شبرا 
اليوم 📆:  بداية من يوم الحد 12/1
الساعة 🕰️: 12 ظهرا';
    
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
