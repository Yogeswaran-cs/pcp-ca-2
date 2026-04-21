import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import ActivityDetails from '../pages/ActivityDetails';
import './AppRouter.css';

const AppRouter = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">💪 Fitness Tracker</h1>
            <p className="app-subtitle">Track your daily fitness activities</p>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activity/:id" element={<ActivityDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2026 Fitness Tracker. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default AppRouter;
