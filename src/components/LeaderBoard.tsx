import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useUserContext } from '../contexts/UserContext';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LightModeIcon from '@mui/icons-material/LightMode';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    // color: theme.palette.common.black,
    color: theme.palette.success.light,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: theme.palette.success.light,
  },
}));

interface LeaderBoardProps {
  rank: {
    username: string;
    totalPoints: number;
    dailyPoints: number;
    weeklyPoints: number;
  }[];
}
const LeaderBoard: React.FC<LeaderBoardProps> = ({ rank }) => {
  const { user, isLogin } = useUserContext();
  const [tabValue, setTabValue] = useState(0);

  const myLank = rank.findIndex((rankItem) => rankItem.username === user);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const displayRank = rank.map((rankItem) => {
    return {
      ...rankItem,
      username: isLogin
        ? rankItem.username
        : rankItem.username.slice(0, 3) +
          '*'.repeat(rankItem.username.length - 3),
    };
  });

  const totalRank = displayRank.sort((a, b) => b.totalPoints - a.totalPoints);
  const weeklyRank = displayRank.sort(
    (a, b) => b.weeklyPoints - a.weeklyPoints
  );
  const dailyRank = displayRank.sort((a, b) => b.dailyPoints - a.dailyPoints);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          gap: '4px',
          color: '#4caf50',
          position: 'relative',
          marginBottom: '24px',
        }}
      >
        <EmojiEventsIcon fontSize='large' />
        <Typography fontSize={'24px'}>Ranking</Typography>
        <StyledTooltip
          placement='left-start'
          arrow
          title={
            <>
              <Typography fontSize={14}>Win a quarterly prize!</Typography>
              <Typography fontSize={14}>Let's check in</Typography>
            </>
          }
        >
          <Box
            sx={{ position: 'absolute', right: '50px', width: '50px' }}
            component='img'
            src='https://upload.wikimedia.org/wikipedia/sco/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/297px-Starbucks_Corporation_Logo_2011.svg.png'
            alt='logo'
          />
        </StyledTooltip>
      </Box>
      <Tabs textColor='secondary' value={tabValue} onChange={handleChangeTab}>
        <Tab icon={<CalendarMonthIcon />} label='Weekly rank' />
        <Tab icon={<LightModeIcon />} label='Daily rank' />
        <Tab icon={<CelebrationIcon />} label='Total rank' />
      </Tabs>

      <CustomTabPanel value={tabValue} index={0}>
        <List dense={false}>
          {weeklyRank.map((rankItem, index) => {
            const color = ['#FFD700', '#C0C0C0', '#CD7F32'];
            return (
              <ListItem key={rankItem.username} disableGutters={true}>
                <ListItemIcon
                  sx={{ justifyContent: 'center', minWidth: 'unset' }}
                >
                  {index < 3 ? (
                    <MilitaryTechIcon sx={{ color: color[index], mr: 1 }} />
                  ) : (
                    index + 1
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`${rankItem.username}  (${rankItem.weeklyPoints}-point)`}
                />
              </ListItem>
            );
          })}
          {myLank > 10 && isLogin && (
            <>
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='...' />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ justifyContent: 'center' }}>
                  {myLank}
                </ListItemIcon>
                <ListItemText primary={user} />
              </ListItem>
            </>
          )}
        </List>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <List dense={false}>
          {dailyRank.map((rankItem, index) => {
            const color = ['#FFD700', '#C0C0C0', '#CD7F32'];
            return (
              <ListItem key={rankItem.username} disableGutters={true}>
                <ListItemIcon
                  sx={{ justifyContent: 'center', minWidth: 'unset' }}
                >
                  {index < 3 ? (
                    <MilitaryTechIcon sx={{ color: color[index], mr: 1 }} />
                  ) : (
                    index + 1
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`${rankItem.username} (${rankItem.dailyPoints}-point)`}
                />
              </ListItem>
            );
          })}
          {myLank > 10 && isLogin && (
            <>
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='...' />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ justifyContent: 'center' }}>
                  {myLank}
                </ListItemIcon>
                <ListItemText primary={user} />
              </ListItem>
            </>
          )}
        </List>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <List dense={false}>
          {totalRank.map((rankItem, index) => {
            const color = ['#FFD700', '#C0C0C0', '#CD7F32'];
            return (
              <ListItem key={rankItem.username} disableGutters={true}>
                <ListItemIcon
                  sx={{ justifyContent: 'center', minWidth: 'unset' }}
                >
                  {index < 3 ? (
                    <MilitaryTechIcon sx={{ color: color[index], mr: 1 }} />
                  ) : (
                    index + 1
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`${rankItem.username} (${rankItem.totalPoints}-point)`}
                />
              </ListItem>
            );
          })}
          {myLank > 10 && isLogin && (
            <>
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='...' />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ justifyContent: 'center' }}>
                  {myLank}
                </ListItemIcon>
                <ListItemText primary={user} />
              </ListItem>
            </>
          )}
        </List>
      </CustomTabPanel>
    </div>
  );
};

export default LeaderBoard;
