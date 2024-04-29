import { Router } from 'express';
import {
  createAnalysis,
  getAllAnalysis,
} from '../controllers/analysisController';
import { upload } from '../utils/upload';

const analysisRouter = Router();

analysisRouter.get('/analysis', getAllAnalysis);
analysisRouter.post(
  '/upload-analysis',
  upload.array('imgs_analysis'),
  createAnalysis
);

export default analysisRouter;
