import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import moment from 'moment';

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
    console.log(JSON.stringify(req.body));

    return res.json({ success: true });
});

app.use('/', router);

export { app };
