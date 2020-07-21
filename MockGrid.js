const puppeteer = require('puppeteer');
const atob = require('atob');
const btoa = require('btoa');

/* const prettier = require('prettier');
const atob = require('atob');
const btoa = require('btoa'); */



(async function main(){
    const browser = await puppeteer.launch({
      executablePath : 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
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
       { urlPattern: 'https://devops-dashboard.putnam.com/devops-dataservice/devops/qatestsummary?appIds=&date=07/08/2020', resourceType: 'XHR', interceptionStage: 'HeadersReceived' }
     // { urlPattern: '*', interceptionStage: 'HeadersReceived' }
     
     /* { urlPattern: 'https://cdn.quilljs.com/1.3.6/quill.js', 
         resourceType : 'XHR',
         interceptionStage: 'HeadersReceived' } */
        ]
      });

    client.on('Network.requestIntercepted', async ({ interceptionId, request, responseHeaders, resourceType, responseStatusCode }) => {
    console.log(`Intercepted ${request.url} {interception id: ${interceptionId}} responseStatusCode: ${responseStatusCode}`);
    let interceptionIdStr  = String(interceptionId);
    const response = await client.send('Network.getResponseBodyForInterception',{ interceptionId });
    // const response = await client.send('Network.getResponseBody', { interceptionIdStr });

    const contentTypeHeader = Object.keys(responseHeaders).find(k => k.toLowerCase() === 'content-type');
    let newBody, contentType = responseHeaders[contentTypeHeader];
    let bodyData = null;
    
    try{
      let decodedResponse = atob(response.body);
    //  console.log("decodedResponse appName = " + decodedResponse.body.$[0].appName);
      console.log("decodedResponse = " + decodedResponse)
      console.log(`response.base64Encoded ` + response.base64Encoded);
    //  console.log("response.body = " + response.body);
   //   console.log("atob - response.body = " + atob(response.body));
      bodyData = response.base64Encoded ? atob(response.body) : response.body;
    }catch(e){
      console.log(`Failed to decode the request for url ${request.url} {interception id: ${interceptionId}}: ${e}`);
    }

    const newHeaders = [
      'Date: ' + (new Date()).toUTCString(),
      'Connection: closed',
      'Content-Length: ' + bodyData.length,
      'Content-Type: ' + contentType
    ];


      console.log(`Continuing interception ${interceptionId}`)
    client.send('Network.continueInterceptedRequest', {
      interceptionId,
      // Overriding the same response which received from intercepted request
      // rawResponse: btoa('HTTP/1.1 200 OK' + '\r\n' + newHeaders.join('\r\n') + '\r\n\r\n' + bodyData)
      // rawResponse: btoa('HTTP/1.1  401 Unauthorized' + '\r\n' + newHeaders.join('\r\n') + '\r\n\r\n' + bodyData)
         rawResponse: btoa('HTTP/1.1 200 OK' + '\r\n' + newHeaders.join('\r\n') + '\r\n\r\n' + bodyData)
        });
    });
})();