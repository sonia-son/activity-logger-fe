import apiRequest from './apiRequest';
import { useState } from 'react';

export const useActivities = (groupname: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const getActivities = async () => {
    try {
      setIsLoading(true);
      const result = await apiRequest.get(`/activities/groups/${groupname}`);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getActivities,
  };
};
