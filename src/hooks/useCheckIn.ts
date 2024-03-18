import apiRequest from './apiRequest';
import { useState } from 'react';

export const useCheckIn = (groupname: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const checkIn = async ({ activity }: { activity: string }) => {
    try {
      setIsLoading(true);
      await apiRequest.post(`/user-activities/`, {
        activityname: activity,
        groupname,
        // points: points,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    checkIn,
  };
};
