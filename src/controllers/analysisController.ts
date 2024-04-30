import { Request, Response } from 'express';
import Analysis from '../models/analysisModel';

export const getAllAnalysis = async (req: Request, res: Response) => {
  try {
    const analysis = await Analysis.findAll();
    return res.status(200).json(analysis);
  } catch {
    return res
      .status(500)
      .json({ ok: false, message: 'Não foi possível buscar as análises.' });
  }
};

export const createAnalysis = (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ ok: true, message: 'Rota para criação de análises.' });
};
