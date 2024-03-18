import apiRequest from './apiRequest';
import { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsLogin } = useUserContext();

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const result = await apiRequest.post(`login/`, {
        username: username,
        password: password,
      });
      apiRequest.setToken(result.data.token);
      setUser(username);
      setIsLogin(true);
      return result.data.token;
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    signIn,
  };
};
