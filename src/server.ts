import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import { testConnection } from './config/database';

const app = express();

app.use(
  cors({
    origin: 'http://localhost',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(userRoutes);

app.get('/', (req, res) => {
  const response = { message: 'Bem-vindo à API da Veridi Oculi!' };

  testConnection()
    .then((status_db) => {
      res.json({ ...response, status_db });
    })
    .catch((status_db) => {
      res.json({ ...response, status_db });
    });
});

app.listen(3333, () => console.log('Servidor aberto em http://localhost:3333'));
