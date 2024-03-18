import apiRequest from './apiRequest';
import { useState } from 'react';

export const useActivityGroups = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getActivityGroups = async () => {
    try {
      setIsLoading(true);
      const activityGroups = await apiRequest.get(`/activity-groups/`);
      return activityGroups;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getActivityGroups,
  };
};
