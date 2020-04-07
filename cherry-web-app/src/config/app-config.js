const { reCaptchaSiteKey } = require('./web-config');
const minLengthFirstName = 2;
const minLength = 4;
const minLengthPhone = 9;
const minReCaptchaWidth = 384;
const hostName = "";

module.exports = {
    reCaptchaSiteKey,
    minLengthFirstName,
    minLength,
    minLengthPhone,
    minReCaptchaWidth,
    hostName
}