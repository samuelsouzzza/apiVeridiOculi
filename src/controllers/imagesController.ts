import { Request, Response } from 'express';
import Images from '../models/imagesModel';
import Analysis from '../models/analysisModel';

export const getImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const images = await Images.findAll({
      where: { id_analysis: id },
    });

    const analysis = await Analysis.findAll({ where: { id_analysis: id } });

    return res.status(200).json({ analysis, images });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ ok: false, message: err.message });
  }
};
