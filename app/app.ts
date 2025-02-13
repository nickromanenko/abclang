import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import moment from 'moment';
import {
    processExistingBooking,
    processGeneralEnquiry,
    processMarketing,
    processNewBooking,
    processRecruitment,
    processSupplierAccounts,
    processVisitingOffice,
} from './services/bot.service';

const app = express();
const router = express.Router();

router.use(compression());
router.use(cors());
router.use(
    express.json({
        limit: '150mb',
    }),
);
router.use(express.urlencoded({ extended: true, limit: '150mb' }));

router.get('/', (req: Request, res: Response) => res.json({ message: 'ABCLANG API v1.01' }));
router.get('/start', (req: Request, res: Response) => {
    console.log('[🚀] START');
    return res.json({ current_time: moment().format('MMMM Do YYYY, dddd, HH:mm') });
});
router.post('/start', (req: Request, res: Response) => {
    console.log('[🚀] START:', JSON.stringify(req.body));
    return res.json({ current_time: moment().format('MMMM Do YYYY, dddd, HH:mm') });
});
router.post('/event', async (req: Request, res: Response) => {
    console.log('[🎭] Event:', req.body.event);
    if (req.body.event === 'call_analyzed') {
        const call = req.body.call;
        console.log('[📞] Call:', JSON.stringify(call));
        const category = call?.call_analysis?.custom_analysis_data?.category || '';
        console.log('[🗂️] Category:', category);
        if (category === 'new_booking') {
            await processNewBooking(call.transcript);
        } else if (category === 'existing_project') {
            await processExistingBooking(call.transcript);
        } else if (category === 'general_enquiry') {
            await processGeneralEnquiry(call.transcript);
        } else if (category === 'supplier_accounts') {
            await processSupplierAccounts(call.transcript);
        } else if (category === 'recruitment') {
            await processRecruitment(call.transcript);
        } else if (category === 'visiting_office') {
            await processVisitingOffice(call.transcript);
        } else if (category === 'marketing') {
            await processMarketing(call.transcript);
        }

        try {
            // Update Report
        } catch (error) {
            console.error('ERROR:', error);
        }
    }
    return res.json({ success: true });
});

app.use('/', router);

export { app };
