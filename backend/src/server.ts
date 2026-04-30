import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.ts';

import groupRoutes from './routes/groupRoutes.ts';
import pageRoutes from './routes/pageRoutes.ts';
import userRoutes from './routes/userRoutes.ts';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.get('/', (_req, res) => {
  res.json({ message: 'API funcionando' });
});


app.use('/pages', pageRoutes);
app.use('/groups', groupRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log('server.ts - Servidor rodando 🚀');
  console.log(`server.ts - Local:   http://localhost:${PORT}/`);
});
