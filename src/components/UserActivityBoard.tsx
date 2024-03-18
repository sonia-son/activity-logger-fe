import { Box, Card, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserActivityHistory from './UserActivityHistory';
import CheckIn from './CheckIn';
import LeaderBoard from './LeaderBoard';
import { useUserContext } from '../contexts/UserContext';
import { useUserActivities } from '../hooks/useUserActivities';
import { useRank } from '../hooks/useRank';
import { useActivityGroupContext } from '../contexts/ActivityGroupContext';

interface UserActivityBoardProps {}

const UserActivityBoard: React.FC<UserActivityBoardProps> = () => {
  const { isLogin } = useUserContext();
  const { currentGroup } = useActivityGroupContext();
  const [userActivityList, setUserActivityList] = useState<
    {
      activityname: string;
      points: number;
      createdAt: string;
    }[]
  >([]);
  const [rank, setRank] = useState<
    {
      username: string;
      totalPoints: number;
      dailyPoints: number;
      weeklyPoints: number;
    }[]
  >([]);

  const { getUserActivities } = useUserActivities(currentGroup.groupname);
  const { getRank } = useRank(currentGroup.groupname);

  const fetchData = async () => {
    try {
      const rank = await getRank();
      if (rank) {
        setRank(rank);
      }
      if (isLogin) {
        const userActivities = await getUserActivities();
        if (userActivities) {
          setUserActivityList(userActivities);
        }
      }
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, currentGroup]);

  const handleCheckedIn = () => {
    fetchData();
  };

  return (
    <Grid container flexDirection={'column'} rowGap='16px'>
      {isLogin && (
        <CheckIn
          currentGroup={currentGroup.groupname}
          onCheckedIn={handleCheckedIn}
        />
      )}
      <Card variant='outlined'>
        <Box sx={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
          <LeaderBoard rank={rank} />
        </Box>
      </Card>
      {isLogin && (
        <Card variant='outlined'>
          <Box sx={{ padding: '20px' }}>
            <UserActivityHistory userActivityList={userActivityList} />
          </Box>
        </Card>
      )}
    </Grid>
  );
};

export default UserActivityBoard;
