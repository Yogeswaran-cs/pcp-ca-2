import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './AddActivityForm.css';

const AddActivityForm = () => {
  const { addActivity } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    steps: '',
    caloriesBurned: '',
    workoutMinutes: '',
    goalAchieved: false,
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Activity name is required';
    }

    if (!formData.steps && formData.steps !== 0) {
      newErrors.steps = 'Steps is required';
    } else if (isNaN(formData.steps) || Number(formData.steps) < 0) {
      newErrors.steps = 'Please enter a valid number';
    }

    if (!formData.caloriesBurned && formData.caloriesBurned !== 0) {
      newErrors.caloriesBurned = 'Calories burned is required';
    } else if (isNaN(formData.caloriesBurned) || Number(formData.caloriesBurned) < 0) {
      newErrors.caloriesBurned = 'Please enter a valid number';
    }

    if (!formData.workoutMinutes && formData.workoutMinutes !== 0) {
      newErrors.workoutMinutes = 'Workout minutes is required';
    } else if (isNaN(formData.workoutMinutes) || Number(formData.workoutMinutes) < 0) {
      newErrors.workoutMinutes = 'Please enter a valid number';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await addActivity({
        ...formData,
        steps: Number(formData.steps),
        caloriesBurned: Number(formData.caloriesBurned),
        workoutMinutes: Number(formData.workoutMinutes),
      });

      // Reset form
      setFormData({
        name: '',
        steps: '',
        caloriesBurned: '',
        workoutMinutes: '',
        goalAchieved: false,
        date: new Date().toISOString().split('T')[0],
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  return (
    <div className="add-activity-form">
      <h2>Add New Activity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Activity Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Morning Run"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="steps">Steps *</label>
            <input
              type="number"
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={errors.steps ? 'error' : ''}
            />
            {errors.steps && <span className="error-message">{errors.steps}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="caloriesBurned">Calories Burned *</label>
            <input
              type="number"
              id="caloriesBurned"
              name="caloriesBurned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={errors.caloriesBurned ? 'error' : ''}
            />
            {errors.caloriesBurned && (
              <span className="error-message">{errors.caloriesBurned}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="workoutMinutes">Workout Minutes *</label>
            <input
              type="number"
              id="workoutMinutes"
              name="workoutMinutes"
              value={formData.workoutMinutes}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={errors.workoutMinutes ? 'error' : ''}
            />
            {errors.workoutMinutes && (
              <span className="error-message">{errors.workoutMinutes}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group checkbox">
            <label htmlFor="goalAchieved">
              <input
                type="checkbox"
                id="goalAchieved"
                name="goalAchieved"
                checked={formData.goalAchieved}
                onChange={handleChange}
              />
              Goal Achieved
            </label>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          Add Activity
        </button>
      </form>
    </div>
  );
};

export default AddActivityForm;
