import express from 'express';
import { combineAudio, upload } from '../controllers/audio.js';

const audioRouter = express.Router();

audioRouter.post(
  '/combine',
  upload.fields([
    { name: 'audio1', maxCount: 1 },
    { name: 'audio2', maxCount: 1 },
  ]),
  combineAudio
);

export default audioRouter;
