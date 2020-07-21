const puppeteer = require('puppeteer');

/* const prettier = require('prettier');
const atob = require('atob');
const btoa = require('btoa'); */



(async function main(){
    const browser = await puppeteer.launch({
      headless:false, 
      defaultViewport:null,
      devtools: true,
      args: ['--window-size=1920,1170','--window-position=0,0']
    });
  
    const page = (await browser.pages())[0];
    const client = await page.target().createCDPSession();

    await client.send('Emulation.setGeolocationOverride', { 
        latitude: 27.175014,
        longitude: 78.042152,
        accuracy : 1
      });

      await page.goto('https://the-internet.herokuapp.com/geolocation');
      await page.waitFor(5000);
})();      