import React, { useEffect } from 'react';
import { CssBaseline, Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes as appRoutes } from './routes/routes';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from './components/PageLoader/PageLoader';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { WithLayout } from 'WithLayout';
import 'aos/dist/aos.css';

const App: React.FC = () => {
  const { isLoading, getAccessTokenSilently, getIdTokenClaims, isAuthenticated } = useAuth0();

  // if (isLoading) {
  //   return <PageLoader />;
  // }

  useEffect(() => {
    const getIdentification = async () => {
      if (isAuthenticated) {
        const idToken = await getIdTokenClaims()
        console.log(idToken)
      }
    }
    getIdentification()
  }, [isAuthenticated])


  return (
    <WithLayout>
      <CssBaseline enableColorScheme />
      <Paper elevation={0}>
        <Router>
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  route.isProtected ? (
                    <route.layout>
                      <ProtectedRoute component={route.component} />
                    </route.layout>
                  ) : (
                    <route.layout>
                      <route.component />
                    </route.layout>
                  )
                }
              />
            ))}
          </Routes>
        </Router>
      </Paper>
    </WithLayout>
  );
};

export default App;
