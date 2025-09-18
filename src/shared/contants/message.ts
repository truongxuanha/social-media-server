const MESSAGE = {
  AUTH: {
    EMAIL_ALREADY_USED: "error:auth:email_already_used",
    INVALID_CREDENTIALS: "error:auth:invalid_credentials",
    TOKEN_EXPIRED: "error:auth:token_expired",
    TOKEN_INVALID: "error:auth:token_invalid",
    UNAUTHORIZED: "error:auth:unauthorized",
    FORBIDDEN: "error:auth:forbidden",
    PASSWORD_LENGTH_MIN: "error:auth:password_length_min",
    REQUIRED_FIELD: "error:auth:required_field",
    CREATE_SUCCESS: "error:auth:create_success"
  },
  
  VALIDATION: {
    INVALID_EMAIL_FORMAT: "error:validation:invalid_email_format",
    REQUIRED_FIELD: "error:validation:required_field",
    INVALID_PASSWORD_FORMAT: "error:validation:invalid_password_format",
    INVALID_USERNAME_FORMAT: "error:validation:invalid_username_format"
  },

  USER: {
    NOT_FOUND: "error:user:not_found",
    ALREADY_EXISTS: "error:user:already_exists",
    INVALID_STATUS: "error:user:invalid_status"
  },

  SERVER: {
    INTERNAL_ERROR: "error:server:internal_error",
    DATABASE_ERROR: "error:server:database_error",
    SERVICE_UNAVAILABLE: "error:server:service_unavailable"
  }
};

export default MESSAGE;