import { toast } from 'react-toastify';

import { fetchWrapper } from '@/functions/fetch';
import { z } from 'zod';

interface CepSchema {
  city: string;
  cityId: string;
  complement: string;
  district: string;
  districtId: string;
  ibgeId: string;
  state: string;
  stateShortname: string;
  street: string;
  zipcode: string;
}
export const useCep = () => {
  const findCep = async (cep: string) => {
    try {
      return fetchWrapper<CepSchema>(
        '/api/cep?cep=' + cep?.replace(/\D/g, ''),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error;
      }
      if (error instanceof Error) {
        return error;
      }
      toast.error('Something went wrong with your login.');
    }
  };

  return {
    findCep
  };
};
