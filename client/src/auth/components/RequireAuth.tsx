import { assess } from 'helperFunctions/componentAssess';
import { getRolesExpand } from 'helperFunctions/get-roles-expand';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles,
}) => {
  assess && console.log('assess')
  const { userCtx, loadingPersistCtx } = useAuth();
  const location = useLocation();
  const inDBRoles = userCtx.profile?.roles
    ? getRolesExpand(userCtx.profile.roles)
    : userCtx.profile?.roles;

  return (!loadingPersistCtx.value) ? (
    !!(inDBRoles?.find((role) => allowedRoles?.includes(role))) ? (
      <Outlet />
    ) : userCtx.profile?.email ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/auth" state={{ from: location }} replace />
    )) : <p>loading...</p>;
};

export default RequireAuth;
