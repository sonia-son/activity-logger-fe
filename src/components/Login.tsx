import {
  Snackbar,
  Box,
  Button,
  Divider,
  TextField,
  Alert,
} from '@mui/material';
import CableIcon from '@mui/icons-material/Cable';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React, { useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import { useSignUp } from '../hooks/useSignUp';
import { useUserContext } from '../contexts/UserContext';

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newId, setNewId] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [messageType, setMessageType] = useState<
    'success' | 'error' | 'info' | 'warning'
  >();
  const [errorMessage, setErrorMessage] = useState('');

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const handleChangeId = (e: React.ChangeEvent<{ value: string }>) => {
    setId(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<{ value: string }>) => {
    setPassword(e.target.value);
  };

  const handleChangeNewId = (e: React.ChangeEvent<{ value: string }>) => {
    setNewId(e.target.value);
  };

  const handleChangeNewPassword = (e: React.ChangeEvent<{ value: string }>) => {
    setNewPassword(e.target.value);
  };

  const handleClickLogin = async () => {
    try {
      const result = await signIn({ username: id, password });
      if (result) {
        setMessageType('success');
        setErrorMessage('Successfully login!');
      }
    } catch (e) {
      setMessageType('error');
      setErrorMessage('Login failed, please try agin');
    }
  };

  const handleClickSignUp = async () => {
    try {
      const result = await signUp({ username: id, password });
      if (result) {
        setMessageType('success');
        setErrorMessage('Successfully sign up!');
      }
    } catch (e) {
      setMessageType('error');
      setErrorMessage('Failed to sign up, please try again!');
    }
  };

  const handleKeyDownPassword = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleClickLogin();
    }
  };
  const handleKeyDownPasswordSignup = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleClickSignUp();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          width: '300px',
          gap: '10px',
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'warning.main' }}>
          <LockOpenIcon style={{ fontSize: '48px' }} />
        </Box>
        <TextField
          size='small'
          placeholder='ID'
          onChange={handleChangeId}
        ></TextField>
        <TextField
          size='small'
          type='password'
          placeholder='Password'
          onChange={handleChangePassword}
          onKeyDown={handleKeyDownPassword}
        ></TextField>
        <Button
          variant='contained'
          disabled={!id || !password}
          onClick={handleClickLogin}
        >
          Login
        </Button>
        <Divider sx={{ padding: '10px' }}>or</Divider>
        <TextField
          size='small'
          placeholder='ID'
          onChange={handleChangeNewId}
        ></TextField>
        <TextField
          size='small'
          type='password'
          placeholder='Password'
          onChange={handleChangeNewPassword}
          onKeyDown={handleKeyDownPasswordSignup}
        ></TextField>
        <Button
          variant='contained'
          disabled={!newId || !newPassword}
          onClick={handleClickSignUp}
        >
          Register now
        </Button>
      </Box>
      {messageType && (
        <Snackbar open={!!messageType} autoHideDuration={1000}>
          <Alert severity={messageType} variant='filled' sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Login;
