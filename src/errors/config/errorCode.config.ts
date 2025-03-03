enum ErrorCode {    
    // Bad Request errors (400)
    INVALID_REQUEST = 4001,
    INVALID_PARAMS = 4002,
    VALIDATION_ERROR = 4003,
    CAST_ERROR = 4004,
    ROLE_ALREADY_EXISTS = 4005,
    USER_ALREADY_EXISTS = 4006,

  
    // Unauthorized errors (401)
    INVALID_CREDENTIALS = 4101,
    INVALID_TOKEN = 4102,
    TOKEN_NOT_FOUND = 4103,
    
    
    // Forbidden errors (403)  
    ACCESS_DENIED = 4301,
    TOKEN_EXPIRE = 4302,

    // Not Found errors (404)
    RESOURCE_NOT_FOUND = 4401,
    USER_NOT_FOUND = 4402,
    ROLE_NOT_FOUND = 4403,

    // Conflict errors (409)
    DUPLICATE_KEY_ERROR = 4901,

    // Internal Server errors (500)
    INTERNAL_SERVER_ERROR = 5001,
    MONGODB_ERROR = 5002,
    ROLE_GET_ERROR = 5006,
    ROLE_CREATE_ERROR = 5007,
    ROLE_UPDATE_ERROR = 5008,
    ROLE_DELETE_ERROR = 5009,
    USER_GET_ERROR = 5010,
    USER_CREATE_ERROR = 5011,
    USER_UPDATE_ERROR = 5012,
    USER_DELETE_ERROR = 5013,
  
    // Service Unavailable errors (503)  
    SERVICE_UNAVAILABLE = 5003,

  };

export default ErrorCode;