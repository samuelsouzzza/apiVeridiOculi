import { Storage } from '@google-cloud/storage';
import fs from 'fs';

export const uploadGoogleStorage = async (
  file: Express.Multer.File
): Promise<string | undefined> => {
  try {
    if (!file) throw new Error('Sem arquivo para enviar.');

    const filePath = file.path;
    if (!fs.existsSync(filePath))
      throw new Error('Arquivo não encontrado no disco.');

    const buffer = fs.readFileSync(filePath);
    if (buffer.length < 1) throw new Error('O arquivo não pode estar vazio.');

    const storage = new Storage();
    const bucketName = 'bucket_veridioculi';

    await storage.bucket(bucketName).file(file.filename).save(buffer);

    const bucket = storage.bucket(bucketName);
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.filename}`;

    fs.unlinkSync(filePath);

    return publicUrl;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    return undefined;
  }
};
