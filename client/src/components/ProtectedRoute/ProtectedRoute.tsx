import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { ComponentType, useEffect } from 'react';
import { PageLoader } from '../PageLoader/PageLoader';
import { useAuth0 } from "@auth0/auth0-react";
import { signupService } from 'services/auth/signup.service';
import { loginService } from 'services/auth/login.service';

interface ProtectedRouteProps {
  component: ComponentType;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
}) => {
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0();

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />,
  });

  useEffect(() => {
    const login = async () => {
      const claimId = await getIdTokenClaims()
      if (claimId?.aud) {
        const res = await loginService(user?.email || '', claimId.aud)
        console.log(claimId?.aud, res)
      }
    }
    if (isAuthenticated) {
      login()
    }
  }, [isAuthenticated])


  return <Component />;
};
