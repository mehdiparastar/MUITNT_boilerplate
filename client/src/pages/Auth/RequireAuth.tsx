
import { useAppSelector } from 'redux/hooks';
import { PageLoader } from 'components/PageLoader/PageLoader';
import { selectCurrentAccessToken } from 'redux/features/WHOLE_APP/auth/authSlice';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
import { getRolesExpand } from 'helperFunctions/get-roles-expand';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles,
}) => {
  const accessToken = useAppSelector(selectCurrentAccessToken)

  const { data: currentUser, isSuccess, isLoading, isError } = useGetCurrentUserQuery()
  const location = useLocation();

  let content = <p>unknown status(bug)!!!</p>;

  if (isLoading) {
    content = <PageLoader />
  } else
    if (isSuccess) {
      if (accessToken) {
        let inDBRoles: string[] = []
        if (currentUser.roles) {
          inDBRoles = getRolesExpand(currentUser.roles)
        }
        if (!!(inDBRoles?.find((role) => allowedRoles?.includes(role)))) {
          content = <Outlet />
        } else {
          if (currentUser.email) {
            content = <Navigate to="/unauthorized" state={{ from: location }} replace />
          } else {
            content = <Navigate to="/auth" state={{ from: location }} replace />
          }
        }
      } else {
        content = <Navigate to="/auth" state={{ from: location }} replace />
      }
    } else if (isError) {
      content = <Navigate to="/auth" state={{ from: location }} replace />
    }
  return content
};

export default RequireAuth;
