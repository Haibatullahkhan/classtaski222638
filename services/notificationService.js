// services/notificationService.js
const nodemailer = require('nodemailer');
const User = require('../models/userModel');

// Helper function to send email notification
exports.sendEmailNotification = async (recipient, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Use your email service provider
        auth: {
            user: process.env.EMAIL_USER,  // Use environment variables for email credentials
            pass: process.env.EMAIL_PASS   // Use environment variables for email credentials
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully');
    } catch (error) {
        throw new Error('Error sending email notification: ' + error.message);
    }
};

// Notify the user about an upcoming movie release
exports.notifyUpcomingRelease = async (userId, movie) => {
    try {
        const user = await User.findById(userId).exec();
        
        const message = `Dear ${user.name},\n\nThe movie "${movie.title}" is releasing soon. Don't miss it!\nRelease Date: ${movie.releaseDate}`;
        await this.sendEmailNotification(user.email, 'Upcoming Movie Release', message);
    } catch (error) {
        throw new Error('Error notifying user about upcoming release: ' + error.message);
    }
};
