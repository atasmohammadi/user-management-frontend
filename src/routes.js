import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages
import LogsPage from './pages/LogsPage';
import UsersPage from './pages/UsersPage';
import EditUserPage from './pages/EditUserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Unauthorized from './pages/Unauthorized';
import DepartmentsPage from './pages/DepartmentsPage';
import EditDepartmentPage from './pages/EditDepartmentPage';
import NewDepartmentPage from './pages/NewDepartmentPage';
import EmployeesPage from './pages/EmployeesPage';
import EditEmployeePage from './pages/EditEmployeePage';
import NewEmployeePage from './pages/NewEmployeePage';
import NewEmployeesPage from './pages/NewEmployeesPage';
// components
import AuthenticatedComponent from './components/authenticated-component';
import AuthorizedComponent from './components/authorized-component';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <AuthenticatedComponent>
          <DashboardLayout />
        </AuthenticatedComponent>
      ),
      children: [
        { element: <Navigate to="/employees" />, index: true },
        {
          path: 'users',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <UsersPage />
            </AuthorizedComponent>
          ),
        },
        {
          path: 'editUser/:userId',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <EditUserPage />
            </AuthorizedComponent>
          ),
        },
        { path: 'employees', element: <EmployeesPage /> },
        {
          path: 'newEmployee',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <NewEmployeePage />
            </AuthorizedComponent>
          ),
        },
        {
          path: 'newEmployees',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <NewEmployeesPage />
            </AuthorizedComponent>
          ),
        },
        {
          path: 'editEmployee/:employeeId',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <EditEmployeePage />
            </AuthorizedComponent>
          ),
        },
        {
          path: 'departments',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <DepartmentsPage />
            </AuthorizedComponent>
          ),
        },
        {
          path: 'newDepartment',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <NewDepartmentPage />
            </AuthorizedComponent>
          ),
        },
        {
          path: 'editDepartment/:departmentId',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <EditDepartmentPage />
            </AuthorizedComponent>
          ),
        },
        {
          path: 'logs',
          element: (
            <AuthorizedComponent requiredPermissions={['admin']}>
              <LogsPage />
            </AuthorizedComponent>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: 'unauthorized', element: <Unauthorized /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
