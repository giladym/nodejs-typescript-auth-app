import ErrorCode from "./errorCode.config";


const ErrorMessage = {
    // Bad Request errors (400)
    [ErrorCode.INVALID_REQUEST]: 'Bad Request',
    [ErrorCode.INVALID_PARAMS]: 'Invalid params provided',
    [ErrorCode.VALIDATION_ERROR]: 'Validation Error',
    [ErrorCode.CAST_ERROR]: 'Invalid data type provided',

    // Unauthorized errors (401)
    [ErrorCode.INVALID_CREDENTIALS]: 'Unauthorized',
    [ErrorCode.INVALID_TOKEN]: 'Unauthorized',

    // Forbidden errors (403)
    [ErrorCode.ACCESS_DENIED]: 'Forbidden',

    // Not Found errors (404)
    [ErrorCode.RESOURCE_NOT_FOUND]: 'Not Found',

    // Conflict errors (409)
    [ErrorCode.DUPLICATE_KEY_ERROR]: 'Conflict Error',

    // Internal Server errors (500)
    [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [ErrorCode.MONGODB_ERROR]: 'Internal DB Error',

    // Service Unavailable errors (503)
    [ErrorCode.SERVICE_UNAVAILABLE]: 'Service Unavailable',

  };
 
  export default ErrorMessage;