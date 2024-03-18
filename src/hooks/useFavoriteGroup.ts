import apiRequest from './apiRequest';
import { useState } from 'react';

export const useFavoriteGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setFavoriteGroup = async ({ groupname }: { groupname: string }) => {
    try {
      setIsLoading(true);
      await apiRequest.put(`/user-groups/set-favorite`, {
        groupname,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFavoriteGroup = async () => {
    try {
      setIsLoading(true);
      const result = await apiRequest.get(`/user-groups/favorite`);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setFavoriteGroup,
    getFavoriteGroup,
  };
};

export const useDefaultGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultGroup = async () => {
    try {
      setIsLoading(true);
      const result = await apiRequest.get(`/user-groups/favorite`);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getDefaultGroup,
  };
};
