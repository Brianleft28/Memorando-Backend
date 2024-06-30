import express from 'express';
import cors from 'cors';

import router from './routes/router.js';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
router(app);

  


export default app;
