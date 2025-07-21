// src/attachments/multer.config.ts
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'video/mp4',
  'video/avi',
  'video/mov',
];

const MAX_FILE_SIZE = 500 * 1024 * 1024; //500MB

function ensureDirectoryExistence(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function multerStorage() {
  return diskStorage({
    destination: (req, file, cb) => {
      const entityType = req.params.entityType;
      const allowedTypes = ['courses', 'lessons'];

      if (!allowedTypes.includes(entityType)) {
        return cb(new Error('Invalid entity type'), '');
      }

      const uploadPath = path.join(__dirname, `../../uploads/${entityType}`);
      ensureDirectoryExistence(uploadPath);

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const prefix = Date.now() + '-' + Math.round(Math.random() * 1000000);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${prefix}${ext}`);
    },
  });
}

export const multerConfig = {
  storage: multerStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  },
};
