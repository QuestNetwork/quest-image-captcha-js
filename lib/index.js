const Jimp = require('jimp');
const utils = require('./utils');
const { v4: uuidv4 } = require('uuid');

const backgroundCharsDefault = [...'0123456789'];
const backgroundColorDefault = 0xFFFFFFFF;

exports.getCaptcha = async (code = "GENERATE", backgroundChars = backgroundCharsDefault, backgroundColor = backgroundColorDefault) => {
    if(code == "GENERATE"){
      //generate secure string
      code = uuidv4();
      //apparently uuid is too hard for humans, let's try uppercase
      code = code.toUpperCase();
      code = code.replace(/0/g,"A");
      code = code.replace(/O/g,"Z");
      code = code.replace(/B/g,"JWK");
      code = code.replace(/Q/g,"R");
      code = code.replace(/G/g,"Y");
      code = code.replace(/6/g,"L");
      code = code.replace(/8/g,"VE");
      code = code.replace(/4/g,"M");
      code = code.replace(/-/g,"#");
    }

    const font = await Jimp.loadFont('./assets/fonts/open-sans/open-sans-32-black/open-sans-32-black.fnt');
    const image = await new Jimp(String(code).length * 30 + 30, 50, backgroundColor);
    const cimage = await new Jimp(30, 30, 0xFFFFFF00);
    const x = utils.getRandomInt(20, 30);
    String(code).split('').map(async (cp, i) => {
        const chr = [...Array(1)].map(() => backgroundChars[Math.random() * backgroundChars.length | 0])[0]; // eslint-disable-line no-bitwise
        cimage
            .crop(0, 0, 30, 30)
            .print(font, 0, 0, chr)
            .rotate(utils.getRandomInt(1, utils.getRandomInt(1, 60), true))
            .opacity(0.6)
            .print(font, 0, 0, cp)
            .resize(20, 20, Jimp.RESIZE_BEZIER)
            .rotate(utils.getRandomInt(1, 15))
            .resize(utils.getRandomInt(40, 42), utils.getRandomInt(40, 42), Jimp.RESIZE_HERMITE)
            .opacity(0.8)
            .dither16();
        image.composite(cimage, x + (i * 20) - utils.getRandomInt(5, 10), utils.getRandomInt(2, 8));
    });
    image.autocrop();
    const buffer = await utils.getImageBuffer(image);
    return { captchaCode: code, captchaImageBuffer: buffer };
};
