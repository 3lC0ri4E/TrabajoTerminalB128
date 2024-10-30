const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cryptopredict20@gmail.com',
        pass: 'Crypto123',
    },
});

async function sendConfirmationEmail(to, token) {
    const url = `http://localhost:3000/confirm?token=${token}`;
    await transporter.sendMail({
        from: 'tuCorreo@gmail.com', // Reemplaza con tu correo de Gmail
        to,
        subject: 'Confirma tu correo electrónico',
        html: `<h3>Gracias por registrarte!</h3>
               <p>Para confirmar tu cuenta, haz clic en el siguiente enlace:</p>
               <a href="${url}">Confirmar correo</a>`,
    });
}


module.exports = { sendConfirmationEmail };
