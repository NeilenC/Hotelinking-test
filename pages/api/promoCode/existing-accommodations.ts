import { NextApiRequest, NextApiResponse } from 'next';
import PromoCode from '../../../models/PromoCode';
import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Verificar el token
    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    await connectDB();

    // Buscar todos los códigos promocionales activos del usuario
    const promoCodes = await PromoCode.find({
      userId: decoded.userId,
      expiresAt: { $gt: new Date() }, // Solo códigos no expirados
    }).select('accommodationId');

    // Extraer los IDs de alojamiento únicos
    const accommodationIds = [...new Set(promoCodes.map(code => code.accommodationId.toString()))];

    return res.status(200).json({ accommodationIds });
  } catch (error) {
    console.error('Error al obtener alojamientos con códigos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
} 