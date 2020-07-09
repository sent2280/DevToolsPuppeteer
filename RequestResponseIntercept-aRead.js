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
    await client.send('Network.enable');

    await client.send('Network.setRequestInterception', { 
        patterns: [
      //   { urlPattern: '*', resourceType: 'Script', interceptionStage: 'HeadersReceived' }
      { urlPattern: '*', interceptionStage: 'HeadersReceived' }
        ]
      });

      
  client.on('Network.requestIntercepted', async ({ interceptionId, request, responseHeaders, resourceType, responseStatusCode }) => {
    console.log(`Intercepted ${request.url} {interception id: ${interceptionId}} responseHeaders: ${responseHeaders.status} responseStatusCode: ${responseStatusCode}`);
  
      console.log(`Continuing interception ${interceptionId}`)
    client.send('Network.continueInterceptedRequest', {
      interceptionId,
        });
    });
})();