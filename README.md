NODE.js-JavaScript-Node-Mock-Server-For-Consumer-POC
====================================================

NODE.js-JavaScript-Node-Mock-Server-For-Consumer-POC

Prerequisites
-------------

* node.js > 4.x
* git
* docker

#### Building/Testing
To build/test the project locally on your computer:
  

1. **Install dependencies**<br>
Choose one:

    ###### Without proxy
    `npm install` <br>

    ###### With Proxy
    `npm config set proxy http://your-proxy:port` <br>
    `npm config set https-proxy http://your-proxy:port` <br>
    `npm install`


2. **Run the build script**<br>
`npm start`


3. **Build and run docker image (TODO)**

* docker build --build-arg http_proxy=http://your-proxy:port -t consumerServer .
* docker run -p 9090:9090 -d consumerServer

