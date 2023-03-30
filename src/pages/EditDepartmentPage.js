import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from 'react-router-dom';
import { useDepartment, useDepartmentsMutation } from '../hooks/useDepartments';

export default function EditDepartmentPage() {
  const { departmentId } = useParams();
  const { data, isLoading } = useDepartment(departmentId);
  const [name, setName] = useState();
  const navigate = useNavigate();
  const { update } = useDepartmentsMutation();

  useEffect(() => {
    if (!data || !data.name) return;
    setName(data.name);
  }, [data]);

  if (isLoading || !departmentId) return <></>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log(data.get('name'));
    await update.mutate({
      id: departmentId,
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
        <title>Edit Department</title>
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
              Modify
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
