import { updateReport } from './services/report.service';

export const handler = async (event: any): Promise<void> => {
    try {
        console.log('{!} Report Function HANDLER:', JSON.stringify(event));

        if (event.Records && event.Records.length) {
            const record = event.Records[0];
            const message = JSON.parse(record.Sns.Message);
            console.log('MESSAGE:', message);

            try {
                await updateReport();
            } catch (error) {
                console.error('ERROR:', error);
            }
        }

        return;
    } catch (error) {
        console.log('ERROR:', error);
        console.error(error);
        return;
    }
};
