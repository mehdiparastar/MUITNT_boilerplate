import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes/routes";
import HomeLayout from './layouts/HomeLayout/HomeLayout';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from './components/PageLoader/PageLoader';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';


const App: React.FC = () => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <HomeLayout>
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  route.isProtected ?
                    <ProtectedRoute component={route.component} /> :
                    <route.component />}
              />
            ))}
          </Routes>
        </HomeLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

