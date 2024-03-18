import apiRequest from './apiRequest';
import { useState } from 'react';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signUp = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const result = await apiRequest.post(`signup/`, {
        username: username,
        password: password,
      });
      apiRequest.setToken(result.data.token);
      return result.data.token;
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    signUp,
  };
};
