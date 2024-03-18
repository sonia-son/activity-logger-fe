import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import UserActivityBoard from './components/UserActivityBoard';
import Header from './components/Header';
import Login from './components/Login';
import { useUserContext } from './contexts/UserContext';
import { useActivityGroupContext } from './contexts/ActivityGroupContext';
import CircularProgress from '@mui/material/CircularProgress';

const App: React.FC = () => {
  const { isLogin, isInitializedUser } = useUserContext();
  const { isInitializedGroup } = useActivityGroupContext();

  if (!isInitializedGroup || !isInitializedUser) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: '16px',
        }}
      >
        <CircularProgress />
        <Typography variant='h5'>Initializing...</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          zIndex: 1,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky',
          top: 0,
        }}
      >
        <Header />
      </Box>
      <Box sx={{ margin: 'auto', padding: '16px', maxWidth: '800px' }}>
        <Grid
          container
          flexDirection={'column'}
          justifyContent='center'
          rowGap={'16px'}
        >
          {!isLogin && (
            <Card
              sx={{
                padding: '24px',
                maxWidth: '460px',
                margin: '20px auto',
                borderRadius: '12px',
                boxShadow: 3,
              }}
            >
              <Login />
            </Card>
          )}
          <UserActivityBoard />
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
