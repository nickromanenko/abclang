import 'dotenv/config';
import { app } from './app';

const port = 3000;

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
