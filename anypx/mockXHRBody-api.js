let rBody = '[{"id":1,"apiName":"Investor Events Transcripts API","env":"PROD","status":"Red","notes":null,"timestamp":null,"user":null,"version":1}]';
module.exports ={
    
    *beforeSendRequest(requestDetail){

        const mockResponse = {

            statusCode : 200,
            body : rBody,
            
            header : {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "https://pdp.putnam.com",
            "Cache-Control":"no-cache, no-store, max-age=0, must-revalidate",
            "Content-Type": "application/json;charset=UTF-8",
            "Date": (new Date()).toUTCString(),
            "Expires": "0",
            "Pragma":"no-cache",
            "Strict-Transport-Security":"max-age=31536000 ; includeSubDomains",
            "Transfer-Encoding":"chunked",
            "Vary": "Origin",
            "Vary": "Access-Control-Request-Method",
            "Vary": "Access-Control-Request-Headers",
         //   "x-anyproxy-origin-content-length" : rBody.length,       
            "X-Content-Type-Options":"nosniff",
            "X-Frame-Options":"SAMEORIGIN",
            "X-Xss-Protection":"1; mode=block"        
        }    
                
        };

        if(requestDetail.requestOptions.method.indexOf('GET')===0){

        if(requestDetail.url.indexOf('https://devops-dashboard.putnam.com/devops-dataservice/devops/status/dataapi') === 0){

            return {
                response : mockResponse
            };
        }
            }
    },
};