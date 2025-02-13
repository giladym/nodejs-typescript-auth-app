enum ErrorCode {    
    // Bad Request errors (400)
    INVALID_REQUEST = 4001,
    INVALID_PARAMS = 4002,
    VALIDATION_ERROR = 4003,
    CAST_ERROR = 4004,
  
    // Unauthorized errors (401)
    INVALID_CREDENTIALS = 4101,
    INVALID_TOKEN = 4102,
  
    // Forbidden errors (403)  
    ACCESS_DENIED = 4301,

    // Not Found errors (404)
    RESOURCE_NOT_FOUND = 4401,

    // Conflict errors (409)
    DUPLICATE_KEY_ERROR = 4901,

    // Internal Server errors (500)
    INTERNAL_SERVER_ERROR = 5001,
    MONGODB_ERROR = 5002,
  
    // Service Unavailable errors (503)  
    SERVICE_UNAVAILABLE = 5003,

  };

export default ErrorCode;