import React from 'react';
import { useAppContext } from '../context/AppContext';
import AddActivityForm from '../components/AddActivityForm';
import ActivityList from '../components/ActivityList';
import './Home.css';

const Home = () => {
  const { statistics, searchTerm, setSearchTerm } = useAppContext();

  return (
    <div className="home">
      <div className="statistics-dashboard">
        <h1>Fitness Tracker Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👟</div>
            <div className="stat-content">
              <h3>Total Steps</h3>
              <p className="stat-value">{statistics.totalSteps.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <h3>Calories Burned</h3>
              <p className="stat-value">{statistics.totalCalories.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>Workout Minutes</h3>
              <p className="stat-value">{statistics.totalWorkoutMinutes}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>Goals Achieved</h3>
              <p className="stat-value">{statistics.goalsAchieved}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <AddActivityForm />
      <ActivityList />
    </div>
  );
};

export default Home;
