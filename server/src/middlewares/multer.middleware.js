
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, './public/images');
    } else if (file.fieldname === 'videoContents') {
      cb(null, './public/videos');
    } else {
      cb(null, './public/temp');
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1000000000 }, //1gb
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'videoContents', maxCount: 10 }, 
  { name: 'previewVideo',maxCount:1}
]);
