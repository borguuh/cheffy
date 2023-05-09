const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const logger = require("./winston");

// exports.generateOTP = () => {
//   const digits = "0123456789";
//   let OTP = "";

//   for (let i = 0; i < 6; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }

//   return OTP;
// };

// exports.sendSMS = async (to, body) => {
//   try {
//     const message = await client.messages.create({
//       to,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       body,
//     });

//     return message.sid;
//   } catch (error) {
//     logger.error(`ERROR :: sendSMS :: ${error}`);
//     console.log(`ERROR :: sendSMS :: ${error}`);
//     return;
//   }
// };
