import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './ActivityDetails.css';

const ActivityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities, updateActivity, deleteActivity } = useAppContext();

  const activity = activities.find((a) => a.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(activity || {});

  if (!activity) {
    return (
      <div className="activity-details-page">
        <div className="error-message">Activity not found</div>
        <button onClick={() => navigate('/')} className="btn btn-back">
          Back to Home
        </button>
      </div>
    );
  }

  const handleEdit = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    await updateActivity(id, editData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      await deleteActivity(id);
      navigate('/');
    }
  };

  return (
    <div className="activity-details-page">
      <button onClick={() => navigate('/')} className="btn btn-back">
        ← Back to Home
      </button>

      <div className="activity-details-card">
        {!isEditing ? (
          <div className="activity-view-mode">
            <div className="activity-header">
              <h1>{activity.name}</h1>
              <span className={`goal-badge ${activity.goalAchieved ? 'achieved' : ''}`}>
                {activity.goalAchieved ? '✓ Goal Achieved' : 'Goal Pending'}
              </span>
            </div>

            <div className="details-grid">
              <div className="detail-section">
                <h3>Steps</h3>
                <p>{activity.steps?.toLocaleString() || 0}</p>
              </div>

              <div className="detail-section">
                <h3>Calories Burned</h3>
                <p>{activity.caloriesBurned || 0} kcal</p>
              </div>

              <div className="detail-section">
                <h3>Workout Time</h3>
                <p>{activity.workoutMinutes || 0} minutes</p>
              </div>

              <div className="detail-section">
                <h3>Date</h3>
                <p>{new Date(activity.date).toLocaleDateString()}</p>
              </div>
            </div>

            {activity.createdAt && (
              <div className="metadata">
                <small>Created: {new Date(activity.createdAt).toLocaleString()}</small>
              </div>
            )}

            <div className="action-buttons">
              <button onClick={() => setIsEditing(true)} className="btn btn-edit">
                Edit Activity
              </button>
              <button onClick={handleDelete} className="btn btn-delete">
                Delete Activity
              </button>
            </div>
          </div>
        ) : (
          <div className="activity-edit-mode">
            <h2>Edit Activity</h2>

            <div className="form-group">
              <label>Activity Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEdit}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Steps</label>
                <input
                  type="number"
                  name="steps"
                  value={editData.steps}
                  onChange={handleEdit}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Calories Burned</label>
                <input
                  type="number"
                  name="caloriesBurned"
                  value={editData.caloriesBurned}
                  onChange={handleEdit}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Workout Minutes</label>
                <input
                  type="number"
                  name="workoutMinutes"
                  value={editData.workoutMinutes}
                  onChange={handleEdit}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={editData.date?.split('T')[0] || ''}
                  onChange={handleEdit}
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="goalAchieved"
                    checked={editData.goalAchieved}
                    onChange={handleEdit}
                  />
                  Goal Achieved
                </label>
              </div>
            </div>

            <div className="edit-action-buttons">
              <button onClick={handleSave} className="btn btn-save">
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditData(activity);
                }}
                className="btn btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetails;
