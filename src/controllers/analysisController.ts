import { Request, Response } from 'express';
import Analysis from '../models/analysisModel';
import Images from '../models/imagesModel';
import jwt from 'jsonwebtoken';
import { API_KEY } from '../utils/generateAPIKey';
import { uploadGoogleStorage } from '../utils/uploadGoogleStorage';

export const getAllAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const decodedToken = jwt.verify(id, API_KEY) as {
      id_user: number;
    };

    if (!decodedToken)
      throw new Error('Sessão expirada, faça login novamente.');

    const analysis = await Analysis.findAll({
      where: { id_user: decodedToken.id_user },
    });

    return res
      .status(200)
      .json({ ok: true, message: 'Análises encontradas.', data: analysis });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ ok: false, message: err.message });
  }
};

export const createAnalysis = async (req: Request, res: Response) => {
  try {
    const { target_species_name } = req.body;

    if (!req.headers.authorization)
      throw new Error('Você precisa estar autenticado para fazer as análises.');

    const TOKEN = req.headers.authorization?.toString().split(' ')[1];

    const decodedToken = jwt.verify(TOKEN, API_KEY) as {
      id_user: number;
    };
    if (!decodedToken)
      throw new Error('Sessão expirada, faça login novamente.');

    const userId = +decodedToken.id_user;

    const now = new Date();

    const newAnalysis = await Analysis.create({
      target_species_name_analysis: target_species_name,
      date_analysis: `${now.getDate().toString().padStart(2, '0')}/${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${now.getFullYear()}`,
      status_analysis: 'Concluído',
      id_user: userId,
    });

    if (!req.files)
      throw new Error(
        'Você precisa subir algumas imagens para efetuar a análise.'
      );

    if (req.files) {
      const uploadErrors: string[] = [];
      const fileUploads = await Promise.all(
        (req.files as Express.Multer.File[]).map(
          async (file: Express.Multer.File) => {
            try {
              const publicUrl = await uploadGoogleStorage(file);
              if (!publicUrl) throw new Error('Falha no upload do arquivo');

              const newImage = await Images.create({
                original_path_image: file.path.replace('\\', '/'),
                ia_path_image: publicUrl,
                species_name_image: newAnalysis.getDataValue(
                  'target_species_name_analysis'
                ),
                accuracy_image: Math.random().toFixed(2),
                id_analysis: newAnalysis.getDataValue('id_analysis'),
              });

              if (!newImage)
                throw new Error('Não foi possível analisar as imagens.');

              return publicUrl;
            } catch (err) {
              if (err instanceof Error) {
                console.error('Erro ao processar o arquivo:', err.message);
                uploadErrors.push(
                  `Erro ao processar o arquivo ${file.originalname}: ${err.message}`
                );
                return null;
              }
            }
          }
        )
      );
      const successfulUploads = fileUploads.filter((url) => url !== null);

      if (uploadErrors.length > 0) {
        console.log('ERROS ', uploadErrors);
        console.log('URLS geradas ', successfulUploads);

        return res.status(500).json({
          ok: false,
          message: `Erros em ${
            uploadErrors.length + 1
          } arquivo(s). Acesse o console para mais detalhes.`,
        });
      } else {
        return res
          .status(200)
          .json({ ok: true, message: 'Arquivos enviados para a análise.' });
      }
    } else {
      return res.status(400).send('No files uploaded');
    }
  } catch (err: unknown) {
    if (err instanceof Error)
      return res.status(500).json({ ok: false, message: err.message });
  }
};
