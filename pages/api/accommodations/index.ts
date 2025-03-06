import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../backend/lib/mongodb';
import Accommodation from '../../../backend/models/Accommodation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    await connectDB();

    const {
      search,
      minPrice,
      maxPrice,
      minDiscount,
      location,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minDiscount) {
      filter.discount = { $gte: Number(minDiscount) };
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const sortOptions: any = {};
    sortOptions[sortBy as string] = order === 'desc' ? -1 : 1;

    const accommodations = await Accommodation.find(filter)
      .sort(sortOptions)
      .limit(50);

    res.status(200).json({
      accommodations,
      filters: {
        search,
        minPrice,
        maxPrice,
        minDiscount,
        location,
        sortBy,
        order,
      },
    });
  } catch (error: any) {
    console.error('Error al obtener hospedajes:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
} 