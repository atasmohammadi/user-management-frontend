import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser, useUsersMutation } from '../hooks/useUsers';

export default function EditUserPage() {
  const { userId } = useParams();
  const { data, isLoading } = useUser(userId);
  const [checkboxes, setCheckboxes] = useState({});
  const navigate = useNavigate();
  const { update } = useUsersMutation();

  useEffect(() => {
    if (!data) return;
    data.permissions.forEach((p) => {
      setCheckboxes((prev) => ({ ...prev, [p]: true }));
    });
  }, [data]);

  if (isLoading || !userId) return <></>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    await update.mutate({
      id: userId,
      permissions: Object.keys(checkboxes).filter((k) => checkboxes[k]),
    });
    navigate('/users');
  };

  const onChange = (event) => {
    setCheckboxes((prev) => ({ ...prev, [event.target.value]: !prev[event.target.value] }));
  };

  return (
    <>
      <Helmet>
        <title>Edit User</title>
      </Helmet>

      <Container component="main" maxWidth="m">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  // autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  // autoFocus
                  disabled
                  value={data.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="admin"
                      value="admin"
                      color="primary"
                      checked={checkboxes.admin || false}
                      onChange={onChange}
                    />
                  }
                  label="Admin (Can modify employees/users)"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Modify
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
