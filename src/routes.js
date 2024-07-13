import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/App';
import NewUserForm from './components/NewUserForm';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/create" element={<NewUserForm />} />
        <Route path="/user/:id" element={<NewUserForm />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
