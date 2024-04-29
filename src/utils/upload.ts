import multer from 'multer';

const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     const id = req.body.id_user;
  //     cb(null, `uploads-analysis/${id}`);
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, file.filename);
  //   },
});

export const upload = multer({ storage });
