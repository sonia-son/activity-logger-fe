import apiRequest from './apiRequest';
import { useState } from 'react';
import { useActivityGroupContext } from '../contexts/ActivityGroupContext';

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentGroup } = useActivityGroupContext();
  const signOut = async () => {
    try {
      setIsLoading(true);
      await apiRequest.post(`logout/`);
      apiRequest.setToken('');
      setCurrentGroup({ groupname: '', logoUrl: '' });
      return true;
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    signOut,
  };
};
