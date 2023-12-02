import Twilio from "twilio";

export default class TwilioService {
  constructor() {
    this.twilioClient = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
      process.env.TWILIO_TEST_NUMBER
    );
  }

  sendSMS = (phoneNumber, message) => {
    this.twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_TEST_NUMBER,
      to: phoneNumber,
    });
  };

  sendWhatsapp = (phoneNumber, message) => {
    this.twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_TEST_NUMBER,
      to: `whatsapp:${phoneNumber}`,
    });
  };
}
