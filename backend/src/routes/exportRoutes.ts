import express from 'express';

import { savePuckData } from '../controllers/exportController.ts';

const router = express.Router();

router.post('/puck-data', savePuckData);

export default router;
