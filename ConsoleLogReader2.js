const puppeteer = require('puppeteer');

(async function main(){
    const browser = await puppeteer.launch({
      headless:false, 
      defaultViewport:null,
      devtools: true,
      args: ['--window-size=1920,1170','--window-position=0,0']
    });
  
    const page = (await browser.pages())[0];
    const client = await page.target().createCDPSession();
    
    console.log('Enabling console log monitor');
    await client.send('Console.enable');
    
    client.on('Console.messageAdded',async({message}) => {
     console.log(`message.url is ${message.url}, level is ${message.level}` );
    });
})();