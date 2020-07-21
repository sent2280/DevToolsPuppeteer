const puppeteer = require('puppeteer');
const fs = require('fs');

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

let rBody = '[{"timestamp":"07/09/20 09:33 AM EDT","passed":0,"failed":13,"skipped":0,"environment":"md2","total":13,"type":null,"testSuiteName":null,"appName":"Test APP","appOwnerName":"Andrea Wuelfing","displayName":"Test APP","qaOwner":"Smruti Mishra","reportLoc":"\\\\\\\\Frkshare01\\\\data01$\\\\ISD01\\\\Investements Shared\\\\SAPIENT\\\\Test_Reports\\\\MMCS\\\\ThuJul092020_8_33_10","comments":null,"lastModifiedBy":null}]';
let dataAPIResponseBody = '[{"id":1,"apiName":"Investor Events Transcripts API","env":"PROD","status":"Red","notes":null,"timestamp":null,"user":null,"version":1}]';

let mockHeaders = {         
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "https://pdp.putnam.com",
    "Cache-Control":"no-cache, no-store, max-age=0, must-revalidate",
    "Connection" : "keep-alive",
    "Content-Type":"application/json;charset=UTF-8",
    "Date": (new Date()).toUTCString(),
    "Expires": "0",
    "Pragma":"no-cache",
    "Strict-Transport-Security":"max-age=31536000 ; includeSubDomains",
    "Transfer-Encoding":"chunked",
    "Vary": "Origin,Access-Control-Request-Method,Access-Control-Request-Headers",
    //"Vary": "Access-Control-Request-Method",
    //"Vary": "Access-Control-Request-Headers",
    //"x-anyproxy-origin-content-length" : rBody.length,       
    "X-Content-Type-Options":"nosniff",
    "X-Frame-Options":"SAMEORIGIN",
    "X-Xss-Protection":"1; mode=block"    
};

 await page.setRequestInterception(true);
//Listern
page.on('request', request => {

    
    if ((request.url() === 'https://devops-dashboard-mig.putnam.com/devops-dataservice/devops/qatestsummary?appIds=&date=07/09/2020'
    || request.url() === 'https://devops-dashboard-mig.putnam.com/devops-dataservice/devops/qatestsummary?appIds=&date=07/10/2020'
    || request.url() === 'https://devops-dashboard-mig.putnam.com/devops-dataservice/devops/status/dataapi')
    && (request.method() === "GET")) {

        // 1 record APP

    if (request.url() === 'https://devops-dashboard-mig.putnam.com/devops-dataservice/devops/qatestsummary?appIds=&date=07/09/2020' 
    && request.method() === "GET")
     {
        console.log("Intercepted request url = "+  request.url());
        request.respond({
            headers: mockHeaders,
            body: rBody
        });
    } else {
        console.log("Checking next block... ");
    }


    // 500 Internal server error - 07/10/2020

    if (request.url() === 'https://devops-dashboard-mig.putnam.com/devops-dataservice/devops/qatestsummary?appIds=&date=07/10/2020'
    && request.method() === "GET")
     {
        console.log("Intercepted request url = "+  request.url());
        request.respond({
            headers: mockHeaders,
            body: rBody,
            status: 500
        });
    }else {
        console.log("Checking next block... ");
    }


    // Data API - Status as Red

    if (request.url() === 'https://devops-dashboard-mig.putnam.com/devops-dataservice/devops/status/dataapi'
    && request.method() === "GET")
     {
        console.log("Intercepted request url = "+  request.url());
        request.respond({
            headers: mockHeaders,
            body: dataAPIResponseBody
        });
    }else {
        console.log("Checking next block... ");
    }

} 
else {
    request.continue();
}

}) 

    })();