import __dirname from "../utils.js";

export default {
  welcome: {
    subject: "¡Bienvenido a La Tienda !",
    attachments: [
      {
        filename: "gmail.jpg",
        path: `${__dirname}/public/img/gmail.jpg`,
        cid: "gmail",
      },
    ],
  },
};
