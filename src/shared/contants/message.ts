const MESSAGE = {
  COMMON: {
    NOT_FOUND: "error.common.not_found",
    REQUIRED_FIELD: "error.common:required_field",
    VALIDATION_ERROR: "error.common.validation_error",
    SERVER_ERROR: "error.common.server_error",
    BAD_REQUEST: "error.common.bad_request",
    CONFLICT: "error.common.conflict",
    UNPROCESSABLE: "error.common.unprocessable",
  },
  AUTH: {
    EMAIL_ALREADY_USED: "error.auth.email_already_used",
    INVALID_CREDENTIALS: "error.auth.invalid_credentials",
    TOKEN_EXPIRED: "error.auth.token_expired",
    TOKEN_INVALID: "error.auth.token_invalid",
    UNAUTHORIZED: "error.auth.unauthorized",
    FORBIDDEN: "error.auth.forbidden",
    PASSWORD_LENGTH_MIN: "error.auth.password_length_min",
    REQUIRED_FIELD: "error.auth.required_field",
    CREATE_SUCCESS: "succes.auth.create_success",
    ACCOUNT_NOT_EXIST: "error.auth.account_not_exist",
    INCORRECT_PASSWORD: "error.auth.incorrect_password",
    INCORRECT_PASSWORD_ACCOUNT: "error.auth.incorrect_password_account",
  },

  VALIDATION: {
    INVALID_EMAIL_FORMAT: "error.validation.invalid_email_format",
    REQUIRED_FIELD: "error.validation.required_field",
    INVALID_PASSWORD_FORMAT: "error.validation.invalid_password_format",
    INVALID_USERNAME_FORMAT: "error.validation.invalid_username_format",
  },

  USER: {
    NOT_FOUND: "error.user.not_found",
    ALREADY_EXISTS: "error.user.already_exists",
    INVALID_STATUS: "error.user.invalid_status",
    REQUIRED_ID: "error.user.required_id",
  },

  SERVER: {
    INTERNAL_ERROR: "error.server.internal_error",
    DATABASE_ERROR: "error.server.database_error",
    SERVICE_UNAVAILABLE: "error.server.service_unavailable",
  },
};

export default MESSAGE;
