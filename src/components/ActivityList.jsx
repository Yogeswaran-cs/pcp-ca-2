import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './ActivityList.css';

const ActivityList = () => {
  const { filteredActivities, deleteActivity, loading, error } = useAppContext();

  if (loading) {
    return <div className="loading">Loading activities...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (filteredActivities.length === 0) {
    return (
      <div className="no-activities">
        <p>No activities found. Start by adding a new activity!</p>
      </div>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      deleteActivity(id);
    }
  };

  return (
    <div className="activity-list">
      <h2>Your Activities</h2>
      <div className="activities-grid">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="activity-header">
              <h3>{activity.name}</h3>
              <span className={`goal-badge ${activity.goalAchieved ? 'achieved' : ''}`}>
                {activity.goalAchieved ? 'Goal Achieved' : 'Goal Pending'}
              </span>
            </div>

            <div className="activity-details">
              <div className="detail-item">
                <span className="label">Steps:</span>
                <span className="value">{activity.steps?.toLocaleString() || 0}</span>
              </div>
              <div className="detail-item">
                <span className="label">Calories Burned:</span>
                <span className="value">{activity.caloriesBurned || 0} kcal</span>
              </div>
              <div className="detail-item">
                <span className="label">Workout Time:</span>
                <span className="value">{activity.workoutMinutes || 0} min</span>
              </div>
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="activity-actions">
              <Link to={`/activity/${activity.id}`} className="btn btn-view">
                View Details
              </Link>
              <button
                onClick={() => handleDelete(activity.id)}
                className="btn btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
