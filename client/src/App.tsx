import React from 'react';
import { Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoutesList } from './routes/routes';
import { assess } from 'helperFunctions/componentAssess';


const App: React.FC = () => {
  assess && console.log('assess')
  return (
    <Paper elevation={0} sx={{ minHeight: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/*" element={<RoutesList />} />
        </Routes>
      </Router>
    </Paper>
  );
};

export default App;
