import { ServerClient } from 'postmark';
const client = new ServerClient(process.env.POSTMARK_TOKEN as string);
const fromEmail = 'noreply@bosar.agency';
const fromName = 'ABCLANG Support Bot';

export enum TemplateIds {
    default = '38500293',
}

export interface IMailTemplatePayload {
    templateId: string;
    to: string;
    cc?: string;
    from?: string;
    data?: any;
    metadata?: any;
    attachments?: any[];
}

class MailService {
    async send(to: string, subject: string, body: string) {
        const payload: IMailTemplatePayload = {
            templateId: TemplateIds.default,
            to,
            data: {
                subject,
                body,
            },
        };
        return this.sendWithTemplate(payload);
    }

    async sendWithTemplate(payload: IMailTemplatePayload) {
        const { templateId, to, from, data, cc, metadata, attachments } = payload;
        const postmarkPayload = this.prepareTemplatePayload(templateId, data, to, from, cc, metadata, attachments);
        return client.sendEmailWithTemplate(postmarkPayload);
    }

    prepareTemplatePayload(
        templateId: string,
        data: any,
        to: null | string = null,
        from: null | string = null,
        cc = '',
        metadata: null | string = null,
        attachments: any = [],
    ) {
        const From = `${from ? from : fromName}<${fromEmail}>`;
        const payload: any = {
            TemplateId: templateId,
            TemplateModel: data,
            InlineCss: true,
            From,
            To: to,
            Cc: cc,
            ReplyTo: fromEmail,
            TrackOpens: true,
        };
        if (metadata) {
            payload.Metadata = metadata;
        }
        if (attachments.length) {
            payload.Attachments = attachments;
        }

        return payload;
    }
}
export default new MailService();
