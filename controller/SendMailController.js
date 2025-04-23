const express = require('express');
const dotenv = require("dotenv");
const transporter = require('../util/Mailer');
const generateOtp = require('../util/OtpGenerate');
dotenv.config();

const sendMail = async (req, res) => {
  const to = req.query.email;
    const otp = generateOtp();

    const subject="Your OTP Code for Signup"
    const text=`Thank you for signing up! Please use the OTP code below to complete your registration: OTP Code: ${otp}`
    

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent', otp });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
};
  
  module.exports = { sendMail };