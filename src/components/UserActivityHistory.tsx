import { Box, List, ListItem, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import React from 'react';
import { formatDistance } from 'date-fns';

interface UserActivityHistoryProps {
  userActivityList: {
    activityname: string;
    points: number;
    createdAt: string;
  }[];
}
const UserActivityHistory: React.FC<UserActivityHistoryProps> = ({
  userActivityList,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: '4px', color: '#ff9800' }}>
        <HistoryIcon fontSize='large' />
        <Typography fontSize={'24px'}>Check-in History</Typography>
      </Box>
      <List dense={true}>
        {userActivityList.map((activity, index) => {
          return (
            <ListItem key={`${index}-${activity.createdAt}`}>
              <Typography
                sx={{ mr: '8px' }}
              >{`${activity.activityname}(${activity.points}-point) checked`}</Typography>
              <Typography color='gray'>
                {formatDistance(activity.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default UserActivityHistory;
