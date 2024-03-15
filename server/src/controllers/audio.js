import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}.${file.mimetype.split('/')[1]}`);
  },
});

export const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 5 * 1000 * 1000,
  },
});

export const combineAudio = async (req, res) => {
  try {
    const audioPath1 = path.join(__dirname, '../../uploads/recording1.mp3');
    const audioPath2 = path.join(__dirname, '../../uploads/recording2.mp3');
    const outputPath = path.join(__dirname, '../../uploads/output.mp3');

    const audioStream1 = fs.createReadStream(audioPath1);
    const audioStream2 = fs.createReadStream(audioPath2);
    const outputStream = fs.createWriteStream(outputPath);

    audioStream1.on('data', (chunk) => {
      outputStream.write(chunk);
    });

    audioStream1.on('end', () => {
      audioStream2.on('data', (chunk) => {
        outputStream.write(chunk);
      });
    });

    audioStream2.on('end', () => {
      outputStream.close();
      res.sendFile(outputPath, () => {
        fs.unlinkSync(audioPath1);
        fs.unlinkSync(audioPath2);
        fs.unlinkSync(outputPath);
      });
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
