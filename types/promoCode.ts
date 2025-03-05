export interface PromoCode {
  id: string;
  code: string;
  accommodation: {
    name: string;
    price: number;
    description: string;
    location: string;
    image: string;
  };
  isUsed: boolean;
  discount: number;
  originalPrice: number;
  finalPrice: number;
  expiresAt: string;
  createdAt: string;
} 