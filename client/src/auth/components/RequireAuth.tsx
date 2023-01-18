
import { useAppSelector } from 'apps/hooks';
import { PageLoader } from 'components/PageLoader/PageLoader';
import { selectAuthUser } from 'features/auth/authSlice';
import { getRolesExpand } from 'helperFunctions/get-roles-expand';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles,
}) => {

  const { userProfile } = useAppSelector(selectAuthUser)
  const location = useLocation();
  const inDBRoles = userProfile?.roles
    ? getRolesExpand(userProfile.roles)
    : userProfile?.roles;

  if (userProfile === null) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return userProfile ?
    (
      !!(inDBRoles?.find((role) => allowedRoles?.includes(role))) ?
        <Outlet />
        :
        userProfile?.email ?
          <Navigate to="/unauthorized" state={{ from: location }} replace />
          :
          <Navigate to="/auth" state={{ from: location }} replace />
    )
    :
    <PageLoader />
};

export default RequireAuth;
