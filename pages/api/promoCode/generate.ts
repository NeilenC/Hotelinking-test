import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../backend/lib/mongodb';
import PromoCode from '../../../backend/models/PromoCode';
import Accommodation from '../../../backend/models/Accommodation';
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';

// Creamos un generador de códigos personalizado
const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 8);

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const { accommodationId } = req.body;
    if (!accommodationId) {
      return res.status(400).json({ message: 'ID de alojamiento requerido' });
    }

    await connectDB();

    const accommodation = await Accommodation.findById(accommodationId);

    const originalPrice = accommodation.price;
    const discount = accommodation.discount;
    const finalPrice = originalPrice * (1 - discount / 100);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const promoCode = new PromoCode({
      code: nanoid(),
      userId: decoded.userId,
      accommodationId,
      discount,
      originalPrice,
      finalPrice,
      expiresAt,
      isUsed: false,
      createdAt: new Date(),
    });

    await promoCode.save();

    res.status(201).json({
      message: 'Código promocional generado exitosamente',
      promoCode: {
        id: promoCode._id,
        code: promoCode.code,
        accommodation: {
          name: accommodation.name,
          price: accommodation.price,
          discount: accommodation.discount,
        },
        discount: promoCode.discount,
        originalPrice: promoCode.originalPrice,
        finalPrice: promoCode.finalPrice,
        expiresAt: promoCode.expiresAt,
      },
    });
  } catch (error: any) {
    console.error('Error al generar código promocional:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
} 