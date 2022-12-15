import { assess } from 'helperFunctions/componentAssess';
import { getRolesExpand } from 'helperFunctions/get-roles-expand';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles,
}) => {
  assess && console.log('assess')
  const { userProfile, loadingPersist } = useAuth();
  const location = useLocation();
  const inDBRoles = userProfile?.roles
    ? getRolesExpand(userProfile.roles)
    : userProfile?.roles;

  return (!loadingPersist) ? (
    !!(inDBRoles?.find((role) => allowedRoles?.includes(role))) ? (
      <Outlet />
    ) : userProfile?.email ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/auth" state={{ from: location }} replace />
    )) : <p>loading...</p>;
};

export default RequireAuth;
