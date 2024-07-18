
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routesConfig from './routesConfig';

const renderRoute = (route, index) => (
  <Route key={index} path={route.path} element={route.element} />
);

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {routesConfig.map(renderRoute)}
      </Routes>
    </Router>
  );
};

export default AppRoutes;