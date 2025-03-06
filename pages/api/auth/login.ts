import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '../../../backend/lib/mongodb';
import User from '../../../backend/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-aqui';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        message: 'Por favor, proporciona email y contraseña',
      });
    }

    // Conectar a la base de datos
    await connectDB();

    // Buscar el usuario
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(401).json({
        message: 'Credenciales inválidas',
      });
    }

    // Verificar la contraseña
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      console.log('Contraseña inválida para usuario:', email);
      return res.status(401).json({
        message: 'Credenciales inválidas',
      });
    }

    // Generar token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // Enviar respuesta exitosa
    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error('Error en login:', error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message,
    });
  }
} 