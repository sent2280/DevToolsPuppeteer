// An example configuration file
exports.config = {
    // The address of a running selenium server.
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect:true,
  
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
      browserName: 'chrome'
    },
  
    // Spec patterns are relative to the configuration file location passed
    // to protractor (in this example conf.js).
    // They may include glob patterns.
    specs: ['amazonDemo.js'],
  
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
      showColors: true // Use colors in the command line report.
    },

    plugins: [
        {
           // package: 'protractor-puppeteer-plugin',
            path : 'node_modules/protractor-puppeteer-plugin/index.js',
            
            configOptions: {
                connectToBrowser: true
            }
           // (or path: require.resolve('protractor-puppeteer-plugin'))
           // configFile?: './path/to/puppeteer.conf.json',
          /*  configOptions?: {
                connectToBrowser?: boolean,
                connectOptions?: {
                    defaultViewport?: {
                        width?: number, // (Default: 800px)
                        height?: number,//  (Default: 600px)
                        deviceScaleFactor?: number, // (Default: 1)
                        isMobile?: boolean, // (Default: false)
                        hasTouch?: boolean, // (Default: false)
                        isLandscape?: boolean // (Default: false)
                    },
                    ignoreHTTPSErrors?: boolean, // (Default: false)
                    slowMo?: number//  (Default: 0ms)
                },
                timeout?: number, // (Default: 30000ms)
              
                defaultArgs?: {
                    headless?: boolean,
                    args?: Array<string>,
                    userDataDir?: string,
                    devtools?: boolean
                }, 
                harDir?: './path/to/artifatcs/dir/',// (Default: './artifacts/har/')
               selenoid?: {
                    host: string, (E.g.: 'selenoid.example.com' or 'localhost')
                    port?: number (Default: 4444)
                } 
            } */
        }  
    ]
  };