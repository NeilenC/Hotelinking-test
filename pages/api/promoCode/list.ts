import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../backend/lib/mongodb';
import PromoCode from '../../../backend/models/PromoCode';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    await connectDB();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_jwt_secret') as { userId: string };
    const userId = decoded.userId;

    const promoCodes = await PromoCode.find({ userId })
      .populate('accommodationId', 'name image price description location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      promoCodes: promoCodes.map(code => ({
        id: code._id,
        code: code.code,
        accommodation: code.accommodationId,
        isUsed: code.isUsed,
        discount: code.discount,
        originalPrice: code.originalPrice,
        finalPrice: code.finalPrice,
        expiresAt: code.expiresAt,
        createdAt: code.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('Error al obtener códigos promocionales:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
} 