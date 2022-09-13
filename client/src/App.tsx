import { CssBaseline, Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes as appRoutes } from './routes/routes';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from './components/PageLoader/PageLoader';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { WithLayout } from 'WithLayout';
import { MainLayout } from 'layouts/MainLayout/MainLayout';

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <WithLayout>
      <CssBaseline />
      <Paper elevation={0}>
        <Router>
          <MainLayout>
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={
                    route.isProtected ? (
                      <ProtectedRoute component={route.component} />
                    ) : (
                      <route.component />
                    )
                  }
                />
              ))}
            </Routes>
          </MainLayout>
        </Router>
      </Paper>
    </WithLayout>
  );
};

export default App;
