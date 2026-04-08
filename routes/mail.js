const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure the nodemailer transporter using env variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

// POST route to send emails
// Useful payload: { "to": "recipient@example.com", "subject": "Hello", "text": "World" }
router.post('/send', async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: to || process.env.EMAIL, // Default to sending to the configured email if none provided
            subject: subject || 'No Subject',
            text: text || '',
            html: html || ''
        };

        const info = await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully!',
            messageId: info.messageId 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email', 
            error: error.message 
        });
    }
});

module.exports = router;
