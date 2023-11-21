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
  passwordrestore: {
    subject: "Restablecimiento de  contraseña",
    attachments: [
      {
        filename: "gmail.jpg",
        path: `${__dirname}/public/img/gmail.jpg`,
        cid: "gmail",
      },
    ],
  },
  order: {
    subject: "Tu pedido ha sido procesado",
    attachments: [
      {
        filename: "gmail.jpg",
        path: `${__dirname}/public/img/gmail.jpg`,
        cid: "gmail",
      },
    ],
  },
};
