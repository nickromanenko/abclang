import nodemailer from 'nodemailer';
const { EMAIL, PASSWORD } = process.env;
console.log(EMAIL, PASSWORD);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});
const from = `ABCLANG Support Bot<${EMAIL}>`;
class MailService {
    async send(to: string, subject: string, text: string) {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from,
                to,
                subject,
                html: text,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return resolve(null);
                } else {
                    return resolve(info);
                }
            });
        });
    }
}
export default new MailService();
