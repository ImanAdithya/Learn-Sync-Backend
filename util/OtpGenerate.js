  // utils/generateOtp.js
  const crypto = require('crypto');

  function generateOtp() {
    const otp = crypto.randomInt(1000, 10000); // Generates a number between 1000 and 9999
    return otp.toString();
  }

  module.exports = generateOtp;
