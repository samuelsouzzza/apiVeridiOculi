import { Router } from 'express';

import { getImages } from '../controllers/imagesController';

const imagesRouter = Router();

imagesRouter.get('/images/:id', getImages);

export default imagesRouter;
