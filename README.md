## Quest Image Captcha JS

> Quick Example To Integrate P2P Challenges As A Starting Off Point For Decentralized Challenge Generation/Validation In P2P Apps Like [Quest Messenger JS](https://github.com/QuestNetwork/quest-messenger-js), forked from: https://github.com/xtremespb/zoia-captcha

## License
GNU GPLv3

## Installation
1. Make sure you've cloned this repository into the same folder as your Quest Network apps.
2. Go to the root directory of your Quest Network app, for example [Quest Messenger JS](https://github.com/QuestNetwork/quest-messenger-js) and:
```
npm install --save @questnetwork/quest-image-captcha-js
```

Then you need to include *quest-image-captcha-js* in your code:
```javascript
const captcha = require('@questnetwork/quest-image-captcha-js');
```
*quest-image-captcha-js* exports the following methods:
```javascript
getCaptcha = async (code = "GENERATE", backgroundChars = backgroundCharsDefault, backgroundColor = backgroudColorDefault)
```
* The parameter *code* represents a string which is displayed on the image, left empty it will generate a uuidv4.
* The first optional parameter is *backgroundChars* (default value is [...'0123456789']) which indicates which characters are displayed on the background as "garbage"
* The second optional parameter is *backgroundColor* (default value is 0xFFFFFFFF) which indicates the background color of the captcha image (it's not recommended to set the opacity to 00 as it makes easier to recognize the captcha image)

The method *getCaptcha* returns a promise and resolves a binary image buffer.

## Examples

To save the result image to a file, you may use the following code:
```javascript
const qCaptcha = require('quest-image-captcha-js');
const fs = require('fs');
const test = async() => {
	const img = await qCaptcha.getCaptcha('1234');
	fs.writeFileSync('image.png', img);
};
test();
```
In the following example there is a 4-digit captcha is returned as an *Express* route:
```javascript
const getCaptcha = async (req, res) => {
    const code = Math.random().toString().substr(2, 4);
    const image = await qCaptcha.getCaptcha(code);
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    return res.end(image, 'binary');
};
```
