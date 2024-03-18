import apiRequest from './apiRequest';
import { useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const checkSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await apiRequest.get(`/user`);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    checkSignIn,
  };
};
