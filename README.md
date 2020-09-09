# node-mock-server
It is a mock server built in node that takes input as json and then define and run functions against it.

# Installation Instructions
To install this app first you need node installed on your system and if not you can install them by clicking [here](https://nodejs.org/en/download/ "Download Node Page"). Then go into the app directory using cmd or terminal and run the command:
```console
$ npm install
```
This command will install all the modules required for running this app. After that you can run the app using command:
```console
$ node app.js
```
Congratulations your server is running now. Now you can send requests to this server. To define the routes for the api you need to call api ```/define``` with json data using format as given in exampleDefine.json file attached with this app.


---
**NOTE**

int is depraciated in json-schema-faker therefore our app replaces int to number so that it can work properly

---