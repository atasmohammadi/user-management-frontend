import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AuthorizedComponent = ({ children, requiredPermissions }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  const isAuthorized = requiredPermissions.reduce((acc, i) => {
    if (!user.permissions.includes(i)) return false;
    return acc;
  }, true);
  if (!isAuthorized) {
    // user is not authorized
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default AuthorizedComponent;
