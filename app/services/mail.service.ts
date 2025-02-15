import { ServerClient } from 'postmark';
const client = new ServerClient(process.env.POSTMARK_TOKEN as string);
const From = `ABCLANG Support Bot<noreply@bosar.agency>`;

class MailService {
    async send(to: string, subject: string, body: string) {
        const response = await client.sendEmail({
            From,
            To: to,
            Subject: subject,
            TextBody: body,
        });
        return response;
    }
}
export default new MailService();
