import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../backend/lib/mongodb';
import Accommodation from '../../../backend/models/Accommodation';

const sampleAccommodations = [
  {
    name: 'Hotel Marina Bay',
    description: 'Lujoso hotel frente al mar con vistas espectaculares y acceso directo a la playa',
    price: 250,
    location: 'Cancún, México',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    discount: 15,
  },
  {
    name: 'Mountain Lodge Resort',
    description: 'Resort de montaña con spa y actividades al aire libre',
    price: 180,
    location: 'Aspen, Colorado',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    discount: 20,
  },
  {
    name: 'Urban Boutique Hotel',
    description: 'Hotel boutique en el centro de la ciudad con diseño moderno',
    price: 150,
    location: 'Barcelona, España',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
    discount: 10,
  },
  {
    name: 'Paradise Beach Resort',
    description: 'Resort todo incluido con múltiples piscinas y restaurantes',
    price: 300,
    location: 'Punta Cana, República Dominicana',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    discount: 25,
  },
  {
    name: 'Historic City Hotel',
    description: 'Hotel histórico renovado en el casco antiguo',
    price: 200,
    location: 'Roma, Italia',
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800',
    discount: 12,
  },
  {
    name: 'Eco Lodge Experience',
    description: 'Alojamiento sostenible en medio de la naturaleza',
    price: 120,
    location: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
    discount: 18,
  },
  {
    name: 'Luxury Desert Camp',
    description: 'Experiencia única de glamping en el desierto',
    price: 400,
    location: 'Dubai, EAU',
    image: 'https://desertluxurycamp.com/wp-content/uploads/2022/10/Dome-tent-1-700x430.jpg',
    discount: 30,
  },
  {
    name: 'Skyline View Hotel',
    description: 'Hotel de lujo con vistas panorámicas de la ciudad',
    price: 280,
    location: 'Nueva York, USA',
    image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800',
    discount: 15,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    await connectDB();

    // Eliminar todos los hospedajes existentes
    await Accommodation.deleteMany({});

    // Insertar los nuevos hospedajes
    const accommodations = await Accommodation.insertMany(sampleAccommodations);

    res.status(201).json({
      message: 'Datos de prueba creados exitosamente',
      count: accommodations.length,
      accommodations,
    });
  } catch (error: any) {
    console.error('Error al crear datos de prueba:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
} 