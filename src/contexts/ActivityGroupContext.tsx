import React, { useState, useEffect } from 'react';
import { useActivityGroups } from '../hooks/useActivityGroups';
import { useFavoriteGroup, useDefaultGroup } from '../hooks/useFavoriteGroup';
import { useUserContext } from './UserContext';

interface IActivityGroupContext {
  activityGroups: any[];
  isInitializedGroup: boolean;
  currentGroup: { groupname: string; logoUrl: string };
  setCurrentGroup: ({
    groupname,
    logoUrl,
  }: {
    groupname: string;
    logoUrl: string;
  }) => void;
}

const ActivityGroupContext = React.createContext<IActivityGroupContext>({
  activityGroups: [],
  isInitializedGroup: false,
  currentGroup: { groupname: '', logoUrl: '' },
  setCurrentGroup: ({
    groupname,
    logoUrl,
  }: {
    groupname: string;
    logoUrl: string;
  }) => {},
});

interface ActivityGroupContextProviderProps {
  children: React.ReactNode;
}

const ActivityGroupContextProvider: React.FC<
  ActivityGroupContextProviderProps
> = ({ children }) => {
  const [activityGroups, setActivityGroups] = useState<any[]>([]);
  const [isInitializedGroup, setIsInitializedGroup] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<{
    groupname: string;
    logoUrl: string;
  }>({ groupname: '', logoUrl: '' });
  const { getFavoriteGroup } = useFavoriteGroup();
  const { getDefaultGroup } = useDefaultGroup();
  const { isLogin } = useUserContext();
  const { getActivityGroups } = useActivityGroups();

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getActivityGroups();
        if (result.length) {
          setActivityGroups(result);
          const favorite = await getFavoriteGroup();
          if (favorite) {
            setCurrentGroup(favorite);
          } else {
            setCurrentGroup(result[0]);
          }
        }
      } catch (e) {
        try {
          const result = await getDefaultGroup();
          setCurrentGroup(result);
        } catch (e) {
          //
        }
      } finally {
        setIsInitializedGroup(true);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const contextPayload = React.useMemo(
    () => ({
      activityGroups,
      isInitializedGroup,
      currentGroup,
      setCurrentGroup,
    }),
    [activityGroups, isInitializedGroup, currentGroup]
  );

  return (
    <ActivityGroupContext.Provider value={contextPayload}>
      {children}
    </ActivityGroupContext.Provider>
  );
};

const useActivityGroupContext = () => React.useContext(ActivityGroupContext);

export default ActivityGroupContextProvider;
export { useActivityGroupContext };
