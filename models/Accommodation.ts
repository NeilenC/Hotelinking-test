import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
  },
  location: {
    type: String,
    required: [true, 'La ubicación es requerida'],
  },
  image: {
    type: String,
    required: [true, 'La imagen es requerida'],
  },
  discount: {
    type: Number,
    required: [true, 'El descuento es requerido'],
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Accommodation || mongoose.model('Accommodation', accommodationSchema); 