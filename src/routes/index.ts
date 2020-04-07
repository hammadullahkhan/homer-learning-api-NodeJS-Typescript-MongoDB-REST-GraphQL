import * as express from "express";

import {apiRouter} from './api';

const router: express.Router = express.Router();

// API Routes
router.use('/api', apiRouter);

export const appRouter = router;
