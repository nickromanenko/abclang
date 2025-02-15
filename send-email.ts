import 'dotenv/config';

import mailService from 'app/services/mail.service';

async function main() {
    const response = await mailService.send('lgaowxceodkumzejfe@nbmbb.com', 'Hello from ABCLANG', 'Hello, this is a test email from ABCLANG');
    console.log(response);
}

main().catch(console.error);
