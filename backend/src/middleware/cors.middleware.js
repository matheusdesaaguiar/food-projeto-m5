// src/middleware/cors.middleware.js
import cors from 'cors';

const corsOptions = {
  origin: '*', // ou especificar um domínio: 'http://localhost:3000' ou o do render
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
