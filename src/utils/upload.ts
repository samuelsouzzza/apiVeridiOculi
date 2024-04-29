import multer from 'multer';
import fs from 'fs';
import { fixExtension } from './fixExtension';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(`tmp/`, { recursive: true });
    cb(null, `tmp/`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${Math.random() * 1000}.${fixExtension(file.originalname)}`
    );
  },
});

export const upload = multer({ storage });
