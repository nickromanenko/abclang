import mailService from './mail.service';
import { getCompletion } from './openai.service';

export async function processNewBooking(transcript: string) {
    console.log('=> processNewBooking');
    try {
        const emailText = await processNewBookingScript(transcript);
        let subject = 'ABCLANG BOT: New Booking';
        if (emailText.toLowerCase().includes('order form')) {
            subject = 'QUOTE REQUEST';
        } else if (emailText.toLowerCase().includes('basic customer inquiry form')) {
            subject = 'CALL REQUEST ASAP';
        }
        const to = 'vyvdgudjvetniyzold@hthlm.com';
        const text = emailText.split('```').join('').split('\n').join('<br>').replace('plaintext', '');
        await mailService.send(to, subject, text);
    } catch (error) {
        console.error(error);
    }
    return;
}

export async function processNewBookingScript(transcript: string) {
    const prompt: string = `Analyze the following transcript of the call and return either the Order Form or the Basic Customer Inquiry Form based on the user's intent. Return only the form without the additional comments. Return response in plaintext (not Markdown, not JSON).
        Transcript: ${transcript}

        If it is a new booking and user proceeds with the order, extract the following information for the Order Form (the whole form in form key-value pairs. If not possible, leave the value blank):

        Order Form
        a. Full name
        b. Company name
        c. Contact information
        d. Detailed description of the project:
        ▪ Type of service (translation, interpretation, etc. and type of document)
        ▪ Source and target languages
        ▪ Deadline requirements
        ▪ Any special instructions

        If user is not ready to proceed, extract the following information for the Basic Customer Inquiry Form (the whole form in form key-value pairs. If not possible, leave the value blank):

        Basic Customer Inquiry Form
        a. Full name
        b. Company name
        c. Contact information (phone number and email)
        d. Services interested in: (translation, interpretation, etc.)
        e. Preferred language services
        f. Any specific questions or concerns
        `;

    const completion = await getCompletion(prompt);
    return completion;
}

export async function processExistingBooking(transcript: string) {
    console.log('=> processExistingBooking');
    try {
        const emailText = await processExistingBookingScript(transcript);
        const subject = 'ABCLANG BOT: Existing Booking';
        const to = 'vyvdgudjvetniyzold@hthlm.com';

        const text = emailText.split('```').join('').split('\n').join('<br>').replace('plaintext', '');
        await mailService.send(to, subject, text);
    } catch (error) {
        console.error(error);
    }
    return;
}

export async function processExistingBookingScript(transcript: string) {
    const prompt: string = `Analyze the following transcript of the call about the existing project and return the Inquiry form with all the information that can be relevant to project manager. Return only the form without the additional comments. Return response in plaintext (not Markdown, not JSON).

    Transcript: ${transcript}`;

    const completion = await getCompletion(prompt);
    return completion;
}

export async function processGeneralEnquiry(transcript: string) {
    console.log('=> processGeneralEnquiry');
    try {
        const emailText = await processGeneralEnquiryScript(transcript);
        const to = 'vyvdgudjvetniyzold@hthlm.com';

        const subject = 'ABCLANG BOT: General Enquiry';
        const text = emailText.split('```').join('').split('\n').join('<br>').replace('plaintext', '');

        await mailService.send(to, subject, text);
    } catch (error) {
        console.error(error);
    }
    return;
}

export async function processGeneralEnquiryScript(transcript: string) {
    const prompt: string = `Analyze the following transcript and extract the key information.  Return response in plaintext (not Markdown) without any additional annotations. Return response in plaintext (not Markdown, not JSON).

    Transcript: ${transcript}`;

    const completion = await getCompletion(prompt);
    return completion;
}

export async function processSupplierAccounts(transcript: string) {
    console.log('=> processSupplierAccounts');
    try {
        const emailText = await processSupplierAccountsScript(transcript);
        const to = 'vyvdgudjvetniyzold@hthlm.com';

        const subject = 'ABCLANG BOT: Supplier Accounts';
        const text = emailText.split('```').join('').split('\n').join('<br>').replace('plaintext', '');
        await mailService.send(to, subject, text);
    } catch (error) {
        console.error(error);
    }
    return;
}

export async function processSupplierAccountsScript(transcript: string) {
    const prompt: string = `Analyze the following transcript of the call and return the Supplier Call/Accounts Form (the whole form in form key-value pairs. If not possible, leave the value blank). Return only the form without the additional comments. Return response in plaintext (not Markdown, not JSON).
    Supplier Call/Accounts Form:
    a. Full name
    b. Company name
    c. Contact information
    d. Nature of inquiry:
    ▪ Billing
    ▪ Payment status
    ▪ Account updates
    ▪ Other concerns

    Transcript: ${transcript}`;

    const completion = await getCompletion(prompt);
    return completion;
}

export async function processRecruitment(transcript: string) {
    console.log('=> processRecruitment');
    try {
        const emailText = await processRecruitmentScript(transcript);
        const to = 'vyvdgudjvetniyzold@hthlm.com';

        const subject = 'ABCLANG BOT: Recruitment';
        const text = emailText.split('```').join('').split('\n').join('<br>').replace('plaintext', '');
        await mailService.send(to, subject, text);
    } catch (error) {
        console.error(error);
    }
    return;
}

export async function processRecruitmentScript(transcript: string) {
    const prompt: string = `Analyze the following transcript of the call and return the Recruitment Inquiry Form (the whole form in form key-value pairs. If not possible, leave the value blank). Return only the form without the additional comments. Return response in plaintext (not Markdown, not JSON).
    Recruitment Inquiry Form:
    a. Full name
    b. Contact information
    c. Position interested in
    d. Relevant experience and qualifications

    Transcript: ${transcript}`;

    const completion = await getCompletion(prompt);
    return completion;
}

export async function processVisitingOffice(transcript: string) {
    console.log('=> processVisitingOffice');
    try {
        const emailText = await processVisitingOfficeScript(transcript);
        const to = 'vyvdgudjvetniyzold@hthlm.com';

        const subject = 'ABCLANG BOT: Visiting Office';
        const text = emailText.split('```').join('').split('\n').join('<br>').replace('plaintext', '');
        await mailService.send(to, subject, text);
    } catch (error) {
        console.error(error);
    }
    return;
}

export async function processVisitingOfficeScript(transcript: string) {
    const prompt: string = `Analyze the following transcript and extract the key information. Return response in plaintext (not Markdown) without any additional annotations. Return response in plaintext (not Markdown, not JSON).
        Transcript: ${transcript}
        `;

    const completion = await getCompletion(prompt);
    return completion;
}

export async function processMarketing(transcript: string) {
    console.log('=> processMarketing');
    try {
        const emailText = await processMarketingScript(transcript);
        const to = 'vyvdgudjvetniyzold@hthlm.com';
        const subject = 'ABCLANG BOT: Marketing';
        const text = emailText.split('```').join('').split('\n').join('<br>').replace('plaintext', '');

        await mailService.send(to, subject, text);
    } catch (error) {
        console.error(error);
    }
    return;
}

export async function processMarketingScript(transcript: string) {
    const prompt: string = `Analyze the following transcript of the call and return the Sales/Marketing Inquiry Form (the whole form in form key-value pairs. If not possible, leave the value blank). Return only the form without the additional comments. Return response in plaintext (not Markdown, not JSON).
    Sales/Marketing Inquiry Form:
    a. Full name
    b. Company name
    c. Contact information
    d. Purpose of inquiry:
        ▪ Partnership opportunities
        ▪ Promotional offers
        ▪ Media inquiries

    Transcript: ${transcript}
        `;

    const completion = await getCompletion(prompt);
    return completion;
}

export async function getCallCategory(transcript: string) {
    const prompt: string = `Analyze the following transcript of the call and return the category of a call. Possible categories are: new_booking, existing_project, general_enquiry, supplier_accounts, recruitment, visiting_office, marketing. If call is about new project, then set the category to new_booking. If call is about existing project (user may be asking about a progress in the project), then set the category to existing_project. If call is about supplier accounts, then set the category to supplier_accounts. If call is about recruitment, then set the category to recruitment. If call is about visiting the office, then set the category to visiting_office. If call is about marketing, then set the category to marketing.
    If call is incomplete and there's no useful information, set the category to "null". If call is about using services and making a booking, then set the category to new_booking. But if user didn't proceed with the booking and didn't provide a name, then it is a general_enquiry booking. Return response in plaintext (not Markdown, not JSON) - single word.
        Transcript: ${transcript}
        `;

    const completion = await getCompletion(prompt);
    return completion;
}
