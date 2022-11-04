import { useAuth0 } from '@auth0/auth0-react';
import React, { PropsWithChildren, useEffect } from 'react';
import { loginService } from 'services/auth/login.service';

interface AuthLocalProviderProps {
  children: React.ReactNode;
}

export const AuthLoalProvider = ({
  children,
}: PropsWithChildren<AuthLocalProviderProps>): JSX.Element | null => {
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();

  useEffect(() => {
    const localLogin = async () => {
      const claimId = await getIdTokenClaims();
      console.log(claimId);
      if (claimId && claimId.aud) {
        console.log('nnnn')
        const res = await loginService(
          user?.email || '',
          `${claimId.aud}_+_${claimId.sub}`,
        );
        console.log(`${claimId.aud}_+_${claimId.sub}`);
        console.log(res);
      }
    };

    if (isAuthenticated) {
      console.log('mmmm');
      localLogin();
    }
  }, [isAuthenticated, getIdTokenClaims, user?.email]);

  return <div>{children}</div>;
};
