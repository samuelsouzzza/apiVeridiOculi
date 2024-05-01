import { Request, Response } from 'express';
import Analysis from '../models/analysisModel';
import jwt from 'jsonwebtoken';
import { API_KEY } from '../utils/generateAPIKey';

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

export const createAnalysis = async (req: Request, res: Response) => {
  try {
    const { target_species_name } = req.body;

    const TOKEN = req.headers.authorization?.toString().split(' ')[1];
    // if (!TOKEN)
    //   throw new Error('Você precisa estar autenticado para fazer as análises.');

    const decodedToken = jwt.verify(TOKEN, API_KEY) as { id_user: number };
    const userId = +decodedToken.id_user;

    const newAnalysis = await Analysis.create({
      target_species_name: target_species_name,
      date_analysis: new Date().getFullYear(),
      status_analysis: 'Concluído',
      id_user: userId,
    });

    if (!newAnalysis) throw new Error('Não foi possível fazer a análise.');
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ ok: false, message: err.message });
  }

  return res
    .status(200)
    .json({ ok: true, message: 'Rota para criação de análises.' });
};
