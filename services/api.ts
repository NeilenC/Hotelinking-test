import { Accommodation } from '../types/accommodation';
import { Filters } from '../components/accommodations/AccommodationFilters';

const getAuthToken = () => localStorage.getItem('token');

export const fetchAccommodations = async (filters: Filters) => {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const res = await fetch(`/api/accommodations?${queryParams.toString()}`);
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message);
    
    return data.accommodations;
  } catch (err) {
    throw new Error('Error al cargar los hospedajes');
  }
};

export const generatePromoCode = async (accommodationId: string) => {
  try {
    const token = getAuthToken();
    const res = await fetch('/api/promoCode/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ accommodationId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data.promoCode;
  } catch (err: any) {
    console.error('Error al generar código promocional:', err);
    throw new Error(err.message || 'Error al generar el código promocional');
  }
};

export const createTestData = async () => {
  try {
    const res = await fetch('/api/accommodations/seed', {
      method: 'POST',
    });
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message);
    
    return data;
  } catch (err) {
    console.error('Error al crear datos de prueba:', err);
    throw new Error('Error al crear los datos de prueba');
  }
};

export const fetchPromoCodes = async () => {
  try {
    const token = getAuthToken();
    const res = await fetch('/api/promoCode/list', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message);
    
    return data.promoCodes;
  } catch (err) {
    console.error('Error al cargar códigos promocionales:', err);
    throw new Error('Error al cargar los códigos promocionales');
  }
};

export const redeemPromoCode = async (promoCodeId: string) => {
  try {
    const token = getAuthToken();
    const res = await fetch('/api/promoCode/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ promoCodeId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err: any) {
    console.error('Error al canjear código promocional:', err);
    throw new Error(err.message || 'Error al canjear el código promocional');
  }
};

export const fetchAccommodationsWithPromoCodes = async () => {
  try {
    const token = getAuthToken();
    const res = await fetch('/api/promoCode/existing-accommodations', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message);
    
    return data.accommodationIds;
  } catch (err) {
    console.error('Error al verificar códigos existentes:', err);
    return [];
  }
}; 