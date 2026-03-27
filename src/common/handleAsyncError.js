import { getErrorMessage, getSuccessMessage } from "./ErrorHandler";
import { setMessage } from "../components/redux/message";

/**
 * Wrapper for async thunk error handling
 * Converts technical errors to user-friendly messages
 */
export const handleAsyncError = (error, thunkAPI, operation = null) => {
  const message = getErrorMessage(error);
  thunkAPI.dispatch(setMessage(message));
  return thunkAPI.rejectWithValue();
};

/**
 * Handle success case with optional success message
 */
export const handleSuccess = (thunkAPI, operation = null) => {
  if (operation) {
    thunkAPI.dispatch(setMessage(getSuccessMessage(operation)));
  }
};

/**
 * Create a standardized error handler for async thunks
 * @param {string} operationType - Type of operation: 'save', 'update', 'delete'
 */
export const createErrorHandler = (operationType = null) => {
  return (error, thunkAPI) => {
    const message = getErrorMessage(error);
    thunkAPI.dispatch(setMessage(message));
    
    // If operation type provided, also dispatch success message on successful completion
    if (operationType) {
      // This will be called in the fulfilled case separately
    }
    
    return thunkAPI.rejectWithValue();
  };
};

/**
 * Create a standardized success handler for async thunks
 * @param {string} operationType - Type of operation: 'save', 'update', 'delete'
 */
export const createSuccessHandler = (operationType) => {
  return (thunkAPI) => {
    if (operationType) {
      thunkAPI.dispatch(setMessage(getSuccessMessage(operationType)));
    }
  };
};

export default { handleAsyncError, handleSuccess, createErrorHandler, createSuccessHandler };