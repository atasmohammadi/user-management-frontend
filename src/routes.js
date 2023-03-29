import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LogsPage from './pages/LogsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DepartmentsPage from './pages/DepartmentsPage';
import EmployeesPage from './pages/EmployeesPage';

import ProtectedComponent from './components/protected-component';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <ProtectedComponent>
          <DashboardLayout />
        </ProtectedComponent>
      ),
      children: [
        { element: <Navigate to="/employees" />, index: true },
        { path: 'users', element: <UsersPage /> },
        { path: 'employees', element: <EmployeesPage /> },
        { path: 'departments', element: <DepartmentsPage /> },
        { path: 'logs', element: <LogsPage /> },
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
