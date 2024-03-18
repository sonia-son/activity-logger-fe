import apiRequest from './apiRequest';
import { useState } from 'react';

export const useRank = (groupname: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const getRank = async () => {
    try {
      setIsLoading(true);
      const result = await apiRequest.get(`/user-groups/groups/${groupname}`);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getRank,
  };
};
