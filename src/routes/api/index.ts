import * as express from "express";
import { storiesRouter } from './stories';

const router: express.Router = express.Router();

// Stories routes
router.use('/stories', storiesRouter);

export const apiRouter = router;
