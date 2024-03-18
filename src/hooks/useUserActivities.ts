import apiRequest from './apiRequest';
import { useState } from 'react';

export const useUserActivities = (groupname: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const getUserActivities = async () => {
    try {
      setIsLoading(true);
      const result = await apiRequest.get(
        `/user-activities/groups/${groupname}`
      );

      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getUserActivities,
  };
};
