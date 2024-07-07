import { Router } from 'express';
import {
  createAnalysis,
  getAllAnalysis,
} from '../controllers/analysisController';
import { upload } from '../utils/upload';

const analysisRouter = Router();


analysisRouter.get('/analysis/:id', getAllAnalysis);
analysisRouter.post(
  '/upload-analysis',
  upload.array('imgs_analysis', 3),
  createAnalysis
);

export default analysisRouter;
