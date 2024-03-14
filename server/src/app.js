import express from 'express';
import cors from 'cors';
import audioRouter from './routers/audio.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/audio', audioRouter);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
