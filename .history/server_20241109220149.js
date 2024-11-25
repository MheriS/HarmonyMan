const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors()); // Izinkan CORS
app.use(express.json()); // Untuk parsing application/json
app.use(express.urlencoded({ extended: true })); // Untuk parsing application/x-www-form-urlencoded

// Rute untuk mengirim email
app.post('/send-email', (req, res) => {
    const { name, email, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'heribangkal21@gmail.com', // Ganti dengan alamat email Anda
            pass: 'Herie$21' // Ganti dengan password email Anda
        }
    });

    const mailOptions = {
        from: email, // Email pengirim diambil dari formulir
        to: 'heribangkal21@gmail.com', // Ganti dengan alamat email Anda
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${text}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});