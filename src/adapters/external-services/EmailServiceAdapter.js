import nodemailer from 'nodemailer';

class EmailServiceAdapter {
    constructor(smtpConfig) {
        this.transporter = nodemailer.createTransport(smtpConfig);
    // smtpConfig contiene la configuración para el servicio de correo (host, port, auth, etc.)
    }

    async sendEmail(to, subject, message) {
        try {
            const mailOptions = {
                from: 'your_email@example.com',
                to,
                subject,
                html: message
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
            return info.messageId;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

export default EmailServiceAdapter;
