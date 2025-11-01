# Error Codes

## HTTP Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `202 Accepted` - Request accepted for processing
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request data or parameters
- `401 Unauthorized` - Authentication required or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate entry)
- `422 Unprocessable Entity` - Validation error
- `423 Locked` - Resource is locked
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error
- `502 Bad Gateway` - Gateway error
- `503 Service Unavailable` - Service temporarily unavailable
- `504 Gateway Timeout` - Gateway timeout

---

## Application Error Codes

### Authentication Errors (AUTH_*)
- `AUTH_INVALID_CREDENTIALS` - Invalid email or password
- `AUTH_INVALID_TOKEN` - Invalid or expired access token
- `AUTH_INVALID_REFRESH_TOKEN` - Invalid or expired refresh token
- `AUTH_TOKEN_EXPIRED` - Access token has expired
- `AUTH_ACCOUNT_LOCKED` - Account locked due to multiple failed attempts
- `AUTH_ACCOUNT_SUSPENDED` - Account has been suspended
- `AUTH_ACCOUNT_INACTIVE` - Account is inactive
- `AUTH_EMAIL_NOT_VERIFIED` - Email address not verified
- `AUTH_2FA_REQUIRED` - Two-factor authentication required
- `AUTH_2FA_INVALID_CODE` - Invalid 2FA code
- `AUTH_PASSWORD_EXPIRED` - Password has expired
- `AUTH_SESSION_EXPIRED` - Session has expired

### Validation Errors (VALIDATION_*)
- `VALIDATION_ERROR` - General validation error
- `VALIDATION_REQUIRED_FIELD` - Required field missing
- `VALIDATION_INVALID_FORMAT` - Invalid field format
- `VALIDATION_INVALID_EMAIL` - Invalid email format
- `VALIDATION_INVALID_PHONE` - Invalid phone format
- `VALIDATION_INVALID_DATE` - Invalid date format
- `VALIDATION_MIN_LENGTH` - Value below minimum length
- `VALIDATION_MAX_LENGTH` - Value exceeds maximum length
- `VALIDATION_MIN_VALUE` - Value below minimum
- `VALIDATION_MAX_VALUE` - Value exceeds maximum
- `VALIDATION_INVALID_ENUM` - Invalid enum value

### Resource Errors (RESOURCE_*)
- `RESOURCE_NOT_FOUND` - Resource not found
- `RESOURCE_ALREADY_EXISTS` - Resource already exists
- `RESOURCE_CONFLICT` - Resource conflict
- `RESOURCE_LOCKED` - Resource is locked
- `RESOURCE_DELETED` - Resource has been deleted

### Trip Errors (TRIP_*)
- `TRIP_NOT_FOUND` - Trip not found
- `TRIP_ALREADY_STARTED` - Trip has already started
- `TRIP_ALREADY_COMPLETED` - Trip has already been completed
- `TRIP_ALREADY_CANCELLED` - Trip has already been cancelled
- `TRIP_CANNOT_CANCEL` - Trip cannot be cancelled in current state
- `TRIP_INVALID_STATUS` - Invalid trip status transition
- `TRIP_DRIVER_UNAVAILABLE` - Driver is not available
- `TRIP_VEHICLE_UNAVAILABLE` - Vehicle is not available

### Vehicle Errors (VEHICLE_*)
- `VEHICLE_NOT_FOUND` - Vehicle not found
- `VEHICLE_IN_USE` - Vehicle is currently in use
- `VEHICLE_MAINTENANCE` - Vehicle is under maintenance
- `VEHICLE_INACTIVE` - Vehicle is inactive
- `VEHICLE_DUPLICATE_PLATE` - Plate number already exists

### Driver Errors (DRIVER_*)
- `DRIVER_NOT_FOUND` - Driver not found
- `DRIVER_UNAVAILABLE` - Driver is not available
- `DRIVER_ON_TRIP` - Driver is currently on a trip
- `DRIVER_ON_LEAVE` - Driver is on leave
- `DRIVER_LICENSE_EXPIRED` - Driver's license has expired
- `DRIVER_HAS_ACTIVE_TRIP` - Driver has an active trip

### Client Errors (CLIENT_*)
- `CLIENT_NOT_FOUND` - Client not found
- `CLIENT_INACTIVE` - Client account is inactive
- `CLIENT_HAS_ACTIVE_SHIPMENTS` - Client has active shipments
- `CLIENT_CREDIT_LIMIT_EXCEEDED` - Credit limit exceeded
- `CLIENT_DUPLICATE_EMAIL` - Email already exists

### Payment Errors (PAYMENT_*)
- `PAYMENT_NOT_FOUND` - Payment not found
- `PAYMENT_ALREADY_PAID` - Payment has already been paid
- `PAYMENT_CANCELLED` - Payment has been cancelled
- `PAYMENT_INVALID_AMOUNT` - Invalid payment amount
- `PAYMENT_PROCESSING_FAILED` - Payment processing failed
- `PAYMENT_GATEWAY_ERROR` - Payment gateway error

### Temperature Errors (TEMP_*)
- `TEMP_SENSOR_OFFLINE` - Temperature sensor is offline
- `TEMP_THRESHOLD_EXCEEDED` - Temperature threshold exceeded
- `TEMP_INVALID_READING` - Invalid temperature reading
- `TEMP_CALIBRATION_REQUIRED` - Sensor calibration required

### Booking Errors (BOOKING_*)
- `BOOKING_NOT_FOUND` - Booking not found
- `BOOKING_ALREADY_CONFIRMED` - Booking has already been confirmed
- `BOOKING_ALREADY_CANCELLED` - Booking has already been cancelled
- `BOOKING_CANNOT_CANCEL` - Booking cannot be cancelled in current state
- `BOOKING_INVALID_STATUS` - Invalid booking status transition
- `BOOKING_DRIVER_NOT_ASSIGNED` - Driver not assigned to booking
- `BOOKING_PAYMENT_REQUIRED` - Payment required before confirmation

### Address Errors (ADDRESS_*)
- `ADDRESS_NOT_FOUND` - Address not found
- `ADDRESS_CANNOT_DELETE_DEFAULT` - Cannot delete default address
- `ADDRESS_LIMIT_EXCEEDED` - Maximum address limit reached

### User Errors (USER_*)
- `USER_NOT_FOUND` - User not found
- `USER_ALREADY_EXISTS` - User already exists
- `USER_INACTIVE` - User account is inactive
- `USER_SUSPENDED` - User account is suspended
- `USER_HAS_ACTIVE_SESSIONS` - User has active sessions
- `USER_INSUFFICIENT_PERMISSIONS` - Insufficient permissions
- `USER_INVALID_ROLE` - Invalid user role

### Integration Errors (INTEGRATION_*)
- `INTEGRATION_NOT_CONFIGURED` - Integration not configured
- `INTEGRATION_CONNECTION_FAILED` - Failed to connect to integration
- `INTEGRATION_INVALID_CREDENTIALS` - Invalid integration credentials
- `INTEGRATION_API_ERROR` - Integration API error
- `INTEGRATION_RATE_LIMIT` - Integration rate limit exceeded

### File Errors (FILE_*)
- `FILE_NOT_FOUND` - File not found
- `FILE_TOO_LARGE` - File size exceeds limit
- `FILE_INVALID_TYPE` - Invalid file type
- `FILE_UPLOAD_FAILED` - File upload failed
- `FILE_CORRUPTED` - File is corrupted

### Reconciliation Errors (RECON_*)
- `RECON_RECORD_NOT_FOUND` - Reconciliation record not found
- `RECON_ALREADY_RESOLVED` - Mismatch already resolved
- `RECON_INVALID_RESOLUTION` - Invalid resolution type
- `RECON_APPROVAL_REQUIRED` - Manager approval required for this resolution
- `RECON_JOB_FAILED` - Reconciliation job failed

### Rate Limit Errors (RATE_LIMIT_*)
- `RATE_LIMIT_EXCEEDED` - Rate limit exceeded
- `RATE_LIMIT_DAILY_EXCEEDED` - Daily rate limit exceeded
- `RATE_LIMIT_HOURLY_EXCEEDED` - Hourly rate limit exceeded

---

## Error Response Format

**Standard Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "statusCode": 400,
    "details": {
      "field": "email",
      "value": "invalid@email",
      "constraint": "must be a valid email"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_abc123xyz"
}
```

**Validation Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "statusCode": 400,
    "details": [
      {
        "field": "email",
        "message": "Email already exists",
        "value": "john@example.com"
      },
      {
        "field": "phone",
        "message": "Invalid phone format",
        "value": "123456"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_abc123xyz"
}
```
