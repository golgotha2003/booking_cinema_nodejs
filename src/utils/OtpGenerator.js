const otpGenerator = require("otp-generator");

const generateOtp = () => {
  return otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    specialChars: false,
  });
};

module.exports = { generateOtp };
