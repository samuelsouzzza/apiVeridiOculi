import { Request, Response } from 'express';

export const getAllAnalysis = (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ ok: true, message: 'Todas as análises aparecerão aqui.' });
};

export const createAnalysis = (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ ok: true, message: 'Rota para criação de análises.' });
};
