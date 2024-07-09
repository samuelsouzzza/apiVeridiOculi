import multer from 'multer';
import fs from 'fs';
import { fixExtension } from './fixExtension';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `tmp_upload/`;
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${Math.round(Math.random() * 1000)}.${fixExtension(
        file.originalname
      )}`
    );
  },
});

export const upload = multer({ storage });
