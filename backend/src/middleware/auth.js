import prisma from '../config/database.js';
import { verifyToken } from '../utils/jwt.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Token de acesso não fornecido'
      });
    }

    const decoded = verifyToken(token);

    const donor = await prisma.donor.findUnique({
      where: { id: decoded.donorId },
      select: { id: true, email: true, name: true }
    });

    if (!donor) {
      return res.status(401).json({
        error: 'Usuário não encontrado'
      });
    }

    req.donor = donor;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }

    return res.status(401).json({
      error: 'Token inválido'
    });
  }
};
