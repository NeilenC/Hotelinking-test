import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import PromoCode from '../../../models/PromoCode';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
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

    const { promoCodeId } = req.body;

    const promoCode = await PromoCode.findOne({
      _id: promoCodeId,
      userId,
    });

   
    promoCode.isUsed = true;
    await promoCode.save();

    res.status(200).json({
      message: 'Código canjeado exitosamente',
      promoCode: {
        id: promoCode._id,
        code: promoCode.code,
        isUsed: promoCode.isUsed,
      },
    });
  } catch (error: any) {
    console.error('Error al canjear código promocional:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
} 