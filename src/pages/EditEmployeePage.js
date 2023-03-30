import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee, useEmployeesMutation } from '../hooks/useEmployees';
import { useDepartments } from '../hooks/useDepartments';

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const { data, isLoading } = useEmployee(employeeId);
  const { data: departmentsData, isLoading: isDepartmentsDataLoading } = useDepartments();
  const [department, setDepartment] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const { update } = useEmployeesMutation();

  useEffect(() => {
    if (!data) return;
    setDepartment(data.department.id);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setJobTitle(data.jobTitle);
    setAddress(data.address);
  }, [data]);

  if (isLoading || isDepartmentsDataLoading || !employeeId || !department) return <></>;

  const handleSubmit = async (event) => {
    event.preventDefault();

    await update.mutate({
      id: employeeId,
      firstName,
      lastName,
      jobTitle,
      department,
      address,
    });
    navigate('/employees');
  };

  const onChange = (event) => {
    const { value } = event.target;
    switch (event.target.name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'department':
        setDepartment(value);
        break;
      case 'jobTitle':
        setJobTitle(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        console.log('Invalid input');
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Employee</title>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="jobTitle"
                  required
                  fullWidth
                  id="jobTitle"
                  label="Job Title"
                  value={jobTitle}
                  onChange={onChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  id="department"
                  required
                  value={department}
                  fullWidth
                  label="Department"
                  onChange={onChange}
                  name="department"
                >
                  {departmentsData.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  value={address}
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
