
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1000000000 }, 
}).fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'videoContents', maxCount: 10 }, 
]);
