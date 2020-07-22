const {browser} = require('protractor');
 
describe('Example suite', () => {
    
    it('Simple test', async () => {

        await browser.get('https://angular.io/');

    })
})