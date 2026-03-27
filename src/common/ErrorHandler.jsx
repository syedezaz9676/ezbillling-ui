// Error codes and user-friendly messages
export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: "Unable to connect to the server. Please check your internet connection.",
  TIMEOUT: "The request took too long. Please try again.",
  
  // Server errors
  INTERNAL_SERVER_ERROR: "Something went wrong on our end. Please try again later.",
  SERVICE_UNAVAILABLE: "The service is temporarily unavailable. Please try again later.",
  BAD_GATEWAY: "Unable to process your request. Please try again.",
  
  // Authentication errors
  UNAUTHORIZED: "Your session has expired. Please log in again.",
  FORBIDDEN: "You don't have permission to perform this action.",
  INVALID_CREDENTIALS: "Invalid username or password. Please try again.",
  
  // Client errors
  BAD_REQUEST: "Invalid data submitted. Please check your input.",
  NOT_FOUND: "The requested resource was not found.",
  CONFLICT: "Data already exists. Please check and try again.",
  
  // Custom messages
  SAVE_SUCCESS: "Data saved successfully!",
  UPDATE_SUCCESS: "Data updated successfully!",
  DELETE_SUCCESS: "Data deleted successfully!",
  OPERATION_FAILED: "Operation failed. Please try again.",
  
  // Default fallback
  DEFAULT: "An unexpected error occurred. Please try again."
};

// Map HTTP status codes to user-friendly messages
export const getErrorMessage = (error) => {
  // Handle case where error is not an object
  if (!error) {
    return ERROR_MESSAGES.DEFAULT;
  }

  // Handle axios error response
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    
    // Check for custom error message from server
    if (data && data.message) {
      // Check for invalid credentials - case insensitive
      const messageLower = data.message.toLowerCase();
      if (messageLower.includes('invalid') || 
          messageLower.includes('credentials') ||
          messageLower.includes('wrong') ||
          messageLower.includes('incorrect') ||
          messageLower.includes('bad credentials') ||
          messageLower.includes('not found') ||
          messageLower.includes('username') ||
          messageLower.includes('password')) {
        return ERROR_MESSAGES.INVALID_CREDENTIALS;
      }
      return data.message;
    }
    
    // Map status codes to messages
    switch (status) {
      case 400:
        return ERROR_MESSAGES.BAD_REQUEST;
      case 401:
        // For 401, always show invalid credentials (common for login failures)
        return ERROR_MESSAGES.INVALID_CREDENTIALS;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 409:
        return ERROR_MESSAGES.CONFLICT;
      case 500:
        return ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
      case 502:
        return ERROR_MESSAGES.BAD_GATEWAY;
      case 503:
        return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
      default:
        return ERROR_MESSAGES.DEFAULT;
    }
  }
  
  // Handle network errors
  if (error.code === 'ECONNABORTED') {
    return ERROR_MESSAGES.TIMEOUT;
  }
  
  if (error.message && error.message.includes('Network Error')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  // Check error message for credential-related keywords
  if (error.message) {
    const messageLower = error.message.toLowerCase();
    if (messageLower.includes('invalid') || 
        messageLower.includes('credentials') ||
        messageLower.includes('wrong') ||
        messageLower.includes('incorrect') ||
        messageLower.includes('bad credentials')) {
      return ERROR_MESSAGES.INVALID_CREDENTIALS;
    }
  }

  // Handle case where error is a string
  if (typeof error === 'string') {
    return error;
  }

  // Handle case where error has a message property
  if (error.message) {
    return error.message;
  }
  
  // Default fallback
  return ERROR_MESSAGES.DEFAULT;
};

// Get success message based on operation type
export const getSuccessMessage = (operation) => {
  switch (operation) {
    case 'save':
      return ERROR_MESSAGES.SAVE_SUCCESS;
    case 'update':
      return ERROR_MESSAGES.UPDATE_SUCCESS;
    case 'delete':
      return ERROR_MESSAGES.DELETE_SUCCESS;
    default:
      return "Operation completed successfully!";
  }
};