import {
  Alert,
  Box,
  Button,
  Grid,
  Card,
  Snackbar,
  Typography,
} from '@mui/material';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import React, { useEffect, useState } from 'react';
import { useCheckIn } from '../hooks/useCheckIn';
import { useActivities } from '../hooks/useActivities';

const colorList = [
  //Magenta
  {
    lighter: '#fff0f6',
    light: '#ffd6e7',
    main: '#eb2f96',
    dark: '#c41d7f',
    text: '#fff',
  },
  // //green
  // {
  //   lighter: '#f6ffed',
  //   light: '#d9f7be',
  //   main: '#52c41a',
  //   dark: '#389e0d',
  //   text: '#fff',
  // },

  //purple
  {
    lighter: '#f9f0ff',
    light: '#efdbff',
    main: '#722ed1',
    dark: '#531dab',
    text: '#fff',
  },
  // //red
  // {
  //   lighter: '#fff1f0',
  //   light: '#ffa39e',
  //   main: '#f5222d',
  //   dark: '#cf1322',
  //   text: '#fff',
  // },
  //cyan
  {
    lighter: '#e6fffb',
    light: '#b5f5ec',
    main: '#13c2c2',
    dark: '#08979c',
    text: '#fff',
  },
  //orange
  {
    lighter: '#fff7e6',
    light: '#ffd591',
    main: '#fa8c16',
    dark: '#d46b08',
    text: '#fff',
  },
  // //gold
  // {
  //   lighter: '#fffbe6',
  //   light: '#fff1b8',
  //   main: '#faad14',
  //   dark: '#d48806',
  //   text: '#fff',
  // },
  //lime
  {
    lighter: '#fcffe6',
    light: '#f4ffb8',
    main: '#a0d911',
    dark: '#7cb305',
    text: '#fff',
  },
  //blue
  {
    lighter: '#f0f5ff',
    light: '#d6e4ff',
    main: '#2f54eb',
    dark: '#1d39c4',
    text: '#fff',
  },
];

interface CheckInProps {
  currentGroup: string;
  onCheckedIn: () => void;
}
const CheckIn: React.FC<CheckInProps> = ({ currentGroup, onCheckedIn }) => {
  const [openResult, setOpenResult] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activities, setActivities] = useState<
    { activityname: string; points: number; description: string }[]
  >([]);
  const { getActivities } = useActivities(currentGroup);
  const { checkIn } = useCheckIn(currentGroup);

  useEffect(() => {
    const init = async () => {
      try {
        const activities = await getActivities();
        if (activities) {
          setActivities(activities);
        }
      } catch (e) {
        //
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup]);

  const handleClickCheckIn = async ({ activity }: { activity: string }) => {
    try {
      await checkIn({ activity });
      onCheckedIn();
      setOpenResult(true);
      setSuccess(true);
    } catch (e) {
      setOpenResult(true);
      setSuccess(false);
    }
  };

  const handleCloseAlert = () => {
    setOpenResult(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: '4px', color: '#ef5350' }}>
        <ChecklistRtlIcon fontSize='large' />
        <Typography fontSize={'24px'}>Daily Check-in</Typography>
      </Box>
      <Grid container>
        {activities.map((activity, index) => {
          return (
            <Grid item xs={6} sm={4} key={`${index}-${activity.activityname}`}>
              <Box sx={{ padding: '16px 0' }}>
                <Card
                  raised
                  sx={{
                    margin: '0 16px',
                    padding: '16px',
                    backgroundColor:
                      colorList[index % colorList.length].lighter,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: '8px',
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ color: colorList[index % colorList.length].dark }}
                  >
                    {activity.description}
                  </Typography>

                  <Typography
                    sx={{ color: '#595959' }}
                  >{`You will earn  ${activity.points}-point`}</Typography>
                  <Button
                    disableElevation
                    sx={{
                      borderRadius: '20px',
                      backgroundColor: colorList[index % colorList.length].main,
                      '&:hover': {
                        backgroundColor:
                          colorList[index % colorList.length].dark,
                      },
                    }}
                    variant='contained'
                    endIcon={<TaskAltIcon />}
                    onClick={() =>
                      handleClickCheckIn({
                        activity: activity.activityname,
                      })
                    }
                  >
                    <Typography>{'Check'}</Typography>
                  </Button>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      {openResult && (
        <Snackbar
          onClose={handleCloseAlert}
          open={openResult}
          autoHideDuration={1000}
        >
          <Alert
            severity={success ? 'success' : 'error'}
            variant='filled'
            sx={{ width: '100%' }}
            onClose={handleCloseAlert}
          >
            {success ? 'Successfully checked in!!' : 'Fail to check in!'}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CheckIn;
