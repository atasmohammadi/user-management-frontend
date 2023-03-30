import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useDepartmentsMutation } from '../hooks/useDepartments';

export default function NewDepartmentPage() {
  const [name, setName] = useState();
  const navigate = useNavigate();
  const { create } = useDepartmentsMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await create.mutate({
      name,
    });
    navigate('/departments');
  };

  const onChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>New Department</title>
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
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
