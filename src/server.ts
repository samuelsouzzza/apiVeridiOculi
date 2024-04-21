import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

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

app.get('/', (req, res) => res.json({ message: 'Seja bem-vindo' }));

app.listen(3333, () => console.log('Servidor aberto em http://localhost:3333'));
