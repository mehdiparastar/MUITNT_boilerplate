import React from 'react';
import { CssBaseline, Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes as appRoutes } from './routes/routes';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { WithLayout } from 'WithLayout';


const App: React.FC = () => {
  return (
    <Paper elevation={0} sx={{ minHeight: "100vh" }}>
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
  );
};

export default App;
