import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import { appReducer, initialState, ACTIONS, calculateStatistics } from '../reducer/AppReducer';
import { activityAPI } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Fetch all activities from API
  const fetchActivities = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await activityAPI.getAll();
      const activities = Array.isArray(response) ? response : response.data || [];
      dispatch({ type: ACTIONS.SET_ACTIVITIES, payload: activities });

      // Calculate and set statistics
      const stats = calculateStatistics(activities);
      dispatch({ type: ACTIONS.SET_STATISTICS, payload: stats });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message || 'Failed to fetch activities' });
    }
  }, []);

  // Add new activity
  const addActivity = useCallback(async (activity) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const newActivity = {
        ...activity,
        id: activity.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      // Uncomment to use real API
      // const response = await activityAPI.create(newActivity);
      // dispatch({ type: ACTIONS.ADD_ACTIVITY, payload: response });

      dispatch({ type: ACTIONS.ADD_ACTIVITY, payload: newActivity });
      dispatch({ type: ACTIONS.CLEAR_ERROR });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message || 'Failed to add activity' });
    }
  }, []);

  // Update existing activity
  const updateActivity = useCallback(async (id, updatedData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const updatedActivity = {
        ...updatedData,
        id,
        updatedAt: new Date().toISOString(),
      };

      // Uncomment to use real API
      // const response = await activityAPI.update(id, updatedActivity);
      // dispatch({ type: ACTIONS.UPDATE_ACTIVITY, payload: response });

      dispatch({ type: ACTIONS.UPDATE_ACTIVITY, payload: updatedActivity });
      dispatch({ type: ACTIONS.CLEAR_ERROR });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message || 'Failed to update activity' });
    }
  }, []);

  // Delete activity
  const deleteActivity = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      // Uncomment to use real API
      // await activityAPI.delete(id);

      dispatch({ type: ACTIONS.DELETE_ACTIVITY, payload: id });
      dispatch({ type: ACTIONS.CLEAR_ERROR });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message || 'Failed to delete activity' });
    }
  }, []);

  // Set filter
  const setFilter = useCallback((filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  }, []);

  // Set search term
  const setSearchTerm = useCallback((term) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  // Reset entire state
  const resetState = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_STATE });
  }, []);

  // Fetch activities on component mount
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Context value
  const value = {
    // State
    activities: state.activities,
    filteredActivities: state.filteredActivities,
    loading: state.loading,
    error: state.error,
    statistics: state.statistics,
    filters: state.filters,
    searchTerm: state.searchTerm,
    userData: state.userData,

    // Actions
    fetchActivities,
    addActivity,
    updateActivity,
    deleteActivity,
    setFilter,
    setSearchTerm,
    clearError,
    resetState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use AppContext
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
