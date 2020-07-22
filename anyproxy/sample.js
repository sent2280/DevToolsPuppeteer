module.exports = {
    *beforeSendRequest(requestDetail) {
        const mockResponse = {
            statusCode : 200,
         //   header : { 'Content-Type' : 'application/javascript; charset=UTF-8'},
             header : { 'Content-Type' : 'application/json; charset=UTF-8'},
            body : 'console.log("Hello Wordl")'
        };

      // if (requestDetail.url.indexOf('https://jsonplaceholder.typicode.com/todos') === 0 ) {
      //     if (requestDetail.url.indexOf('https://www.googleadservices.com/pagead/conversion.js') === 0 ) {
        if (requestDetail.url.indexOf('https://www.netflix.com/personalization/log') === 0 ) {
      console.log("URL is matching ......");
        return {
            response : mockResponse
        };
      }
    },
  };