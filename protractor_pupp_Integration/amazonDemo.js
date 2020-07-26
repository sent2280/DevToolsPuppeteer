const {browser} = require('protractor');
 
describe('Example suite', () => {
    
    it('Simple test', async () => {

        await browser.cdp.page.setRequestInterception(true);
        
        browser.cdp.page.on('response', async response => {
            if (response.url() !== null) {
            console.log('response url and status code\'s are ' + response.url() + response.status());
            } else {
                await response.continue();
            }

     })

        await browser.get('https://www.amazon.in/');

    })
})