const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Rute untuk menampilkan formulir (jika Anda ingin menampilkannya di localhost)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Ganti dengan path ke file HTML Anda
});

// Rute untuk mengirim email
app.post('/send-email', (req, res) => {
    const { name, email, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'heribangkal21@gmail.com', // Ganti dengan alamat email Anda
            pass: 'your-email-password' // Ganti dengan password email Anda
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Ganti dengan alamat email penerima
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${text}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send('Error occurred: ' + error.message);
        }
        res.send('Email sent: ' + info.response);
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});