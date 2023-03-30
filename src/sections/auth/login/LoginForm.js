import { useState } from 'react';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import { useAuth } from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function LoginForm({ isLoginForm }) {
  const { login, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const fn = isLoginForm ? login : register;
    await fn(email, password);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ my: 2 }}>
          {isLoginForm ? 'Login' : 'Register'}
        </LoadingButton>
      </form>
    </>
  );
}
