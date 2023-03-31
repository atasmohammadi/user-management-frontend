import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEmployees, useEmployeesMutation } from '../hooks/useEmployees';
import { useDepartmentsMutation, useDepartments } from '../hooks/useDepartments';
import { useSnackbar } from '../hooks/useSnackbar';
import { csvFileToArray } from '../utils/csvToArray';

export default function NewEmployeesPage() {
  const { data: departmentsData, isLoading: isDepartmentsDataLoading } = useDepartments();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const { batchCreate: batchCreateEmployees } = useEmployeesMutation();
  const { batchCreate: batchCreateDepartments } = useDepartmentsMutation();
  const { data: employeesData, isLoading } = useEmployees();
  const { showSnackbar } = useSnackbar();

  if (isDepartmentsDataLoading || !departmentsData || isLoading) return <></>;

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const processEmployees = async (arr) => {
    if (!arr.length) return;
    try {
      const departmentsToBeCreated = [];
      // requirements were not clear. what are the required fields? for now firstName and Department are required.
      const filteredArr = arr.filter((i) => i.Vorname && i.Abteilung);
      filteredArr.forEach((a) => {
        const found = departmentsData.find((d) => d.name.toLowerCase() === a.Abteilung.toLowerCase());
        if (!departmentsToBeCreated.includes(a.Abteilung) && !found) departmentsToBeCreated.push({ name: a.Abteilung });
      });
      const createdDeps = departmentsToBeCreated.length
        ? await batchCreateDepartments.mutateAsync({ departments: departmentsToBeCreated })
        : [];
      const findDepId = (dpName) =>
        departmentsData.concat(createdDeps).find((dp) => dp.name.toLowerCase() === dpName.toLowerCase()).id;
      const employeesToBeCreated = filteredArr
        .filter((j) => {
          const deptId = findDepId(j.Abteilung);
          // requirements were not clear. ideally we should check more fields to see if an employee already exists. maybe an employee id?
          const foundEmployee = employeesData.find(
            (em) => em.firstName.toLowerCase() === j.Vorname.toLowerCase() && em.department.id === deptId
          );
          if (foundEmployee) return false;
          return true;
        })
        .map((i) => {
          const deptId = findDepId(i.Abteilung);
          return {
            firstName: i.Vorname,
            lastName: i.Nachname,
            jobTitle: i.Position,
            department: deptId,
            address: `${i.Strasse} ${i.Nr}, ${i.PLZ} ${i.Ort}, ${i.Land}`,
          };
        });
      if (batchCreateEmployees.length) {
        const emps = await batchCreateEmployees.mutateAsync({ employees: employeesToBeCreated });
        showSnackbar(`${emps.length} Employees Created Successfullly`, 'success');
        navigate('/employees');
      } else {
        showSnackbar('Imported Employees already exist. no new employee has been created', 'error');
      }
    } catch (e) {
      showSnackbar(`Something went wrong`, 'error');
      console.log(e);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = (event) => {
        const csv = event.target.result;
        const arr = csvFileToArray(csv);
        processEmployees(arr);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <>
      <Helmet>
        <title>Import Employees (CSV)</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box component="form" noValidate onSubmit={handleOnSubmit}>
                <input type={'file'} id={'csvFileInput'} accept={'.csv'} onChange={handleOnChange} />
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleOnSubmit}>
                  IMPORT CSV
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
