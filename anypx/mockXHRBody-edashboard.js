// let ReportPath = "\\\\\\\\Frkshare01\\\\data01$\\\\ISD01\\\\Investements Shared\\\\SAPIENT\\\\Test_Reports\\\\MMCS\\\\ThuJul092020_8_33_10"
let rBody = '[{"timestamp":"07/09/20 09:33 AM EDT","passed":0,"failed":13,"skipped":0,"environment":"md2","total":13,"type":null,"testSuiteName":null,"appName":"MMCS","appOwnerName":"Andrea Wuelfing","displayName":"MMCS UI_Sniff","qaOwner":"Smruti Mishra","reportLoc":"\\\\\\\\Frkshare01\\\\data01$\\\\ISD01\\\\Investements Shared\\\\SAPIENT\\\\Test_Reports\\\\MMCS\\\\ThuJul092020_8_33_10","comments":null,"lastModifiedBy":null}]';

module.exports ={
    
    *beforeSendRequest(requestDetail){

        const mockResponse = {

            statusCode : 200,
            body : rBody,
            
            header : {         
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
            "x-anyproxy-origin-content-length" : rBody.length,       
            "X-Content-Type-Options":"nosniff",
            "X-Frame-Options":"SAMEORIGIN",
            "X-Xss-Protection":"1; mode=block"    
        }    
                
        };

        if(requestDetail.requestOptions.method.indexOf('GET')===0 && requestDetail.url.indexOf('https://devops-dashboard.putnam.com/devops-dataservice/devops/qatestsummary?appIds=&date=07/09/2020') === 0){

            return {
                response : mockResponse
            };
        }
    },
};