// Action types for state management
export const ACTIONS = {
  // Activity actions
  SET_ACTIVITIES: 'SET_ACTIVITIES',
  ADD_ACTIVITY: 'ADD_ACTIVITY',
  UPDATE_ACTIVITY: 'UPDATE_ACTIVITY',
  DELETE_ACTIVITY: 'DELETE_ACTIVITY',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',

  // Filter and search actions
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',

  // Statistics actions
  SET_STATISTICS: 'SET_STATISTICS',

  // User data actions
  SET_USER_DATA: 'SET_USER_DATA',

  // Reset state
  RESET_STATE: 'RESET_STATE',
};

// Initial state for the app
export const initialState = {
  activities: [],
  filteredActivities: [],
  loading: false,
  error: null,
  statistics: {
    totalSteps: 0,
    totalCalories: 0,
    totalWorkoutMinutes: 0,
    goalsAchieved: 0,
  },
  filters: {
    dateRange: 'week',
    activityType: null,
  },
  searchTerm: '',
  userData: {
    userId: null,
    name: '',
    goals: {},
  },
};

// Reducer function to manage state transitions
export const appReducer = (state, action) => {
  switch (action.type) {
    // Activity management actions
    case ACTIONS.SET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        filteredActivities: action.payload,
        loading: false,
        error: null,
      };

    case ACTIONS.ADD_ACTIVITY:
      const newActivities = [...state.activities, action.payload];
      return {
        ...state,
        activities: newActivities,
        filteredActivities: applyFilters(newActivities, state.filters, state.searchTerm),
      };

    case ACTIONS.UPDATE_ACTIVITY:
      const updatedActivities = state.activities.map((activity) =>
        activity.id === action.payload.id ? action.payload : activity
      );
      return {
        ...state,
        activities: updatedActivities,
        filteredActivities: applyFilters(updatedActivities, state.filters, state.searchTerm),
      };

    case ACTIONS.DELETE_ACTIVITY:
      const filteredByDelete = state.activities.filter(
        (activity) => activity.id !== action.payload
      );
      return {
        ...state,
        activities: filteredByDelete,
        filteredActivities: applyFilters(filteredByDelete, state.filters, state.searchTerm),
      };

    // Loading and error states
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    // Filter and search actions
    case ACTIONS.SET_FILTER:
      const filterUpdated = { ...state.filters, ...action.payload };
      return {
        ...state,
        filters: filterUpdated,
        filteredActivities: applyFilters(state.activities, filterUpdated, state.searchTerm),
      };

    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
        filteredActivities: applyFilters(
          state.activities,
          state.filters,
          action.payload
        ),
      };

    // Statistics actions
    case ACTIONS.SET_STATISTICS:
      return {
        ...state,
        statistics: action.payload,
      };

    // User data actions
    case ACTIONS.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };

    // Reset state
    case ACTIONS.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// Helper function to apply filters and search
const applyFilters = (activities, filters, searchTerm) => {
  let filtered = activities;

  // Apply search term filter
  if (searchTerm) {
    filtered = filtered.filter((activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply activity type filter
  if (filters.activityType) {
    filtered = filtered.filter((activity) => activity.type === filters.activityType);
  }

  return filtered;
};

// Helper to calculate statistics
export const calculateStatistics = (activities) => {
  return {
    totalSteps: activities.reduce((sum, activity) => sum + (activity.steps || 0), 0),
    totalCalories: activities.reduce((sum, activity) => sum + (activity.caloriesBurned || 0), 0),
    totalWorkoutMinutes: activities.reduce(
      (sum, activity) => sum + (activity.workoutMinutes || 0),
      0
    ),
    goalsAchieved: activities.filter((activity) => activity.goalAchieved).length,
  };
};
