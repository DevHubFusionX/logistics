# Authentication

## 1. Register
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+234-801-234-5678",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "role": "Fleet Officer"
}
```

**Validation Rules:**
- `name`: Required, min 2, max 100 chars
- `email`: Required, valid email, unique
- `phone`: Optional, valid phone format
- `password`: Required, min 8 chars, must contain uppercase, lowercase, number, special char
- `confirmPassword`: Required, must match password
- `role`: Optional, enum: `Super Admin|Fleet Officer|Dispatcher|Finance|Support|Customer` (default: `Customer`)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "usr_026",
    "userId": "USR-026",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Fleet Officer",
    "status": "active",
    "emailVerificationSent": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Registration successful. Please verify your email."
}
```

**Error Response (400):**
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
      }
    ]
  }
}
```

**Rate Limit:** 10 requests per hour per IP

---

## 2. Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@daraexpress.com",
  "password": "SecurePass123!",
  "rememberMe": false
}
```

**Validation Rules:**
- `email`: Required, valid email format, max 255 chars
- `password`: Required, min 8 chars
- `rememberMe`: Optional, boolean (default: false)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "user": {
      "id": "usr_001",
      "name": "John Doe",
      "email": "admin@daraexpress.com",
      "role": "Super Admin",
      "permissions": ["all"],
      "avatar": "https://cdn.daraexpress.com/avatars/usr_001.jpg",
      "lastLogin": "2024-01-15T10:30:00Z",
      "company": "Dara Express",
      "department": "Administration"
    }
  },
  "message": "Login successful"
}
```

**Error Responses:**
```json
// 401 - Invalid credentials
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "statusCode": 401
  }
}

// 423 - Account locked
{
  "success": false,
  "error": {
    "code": "AUTH_ACCOUNT_LOCKED",
    "message": "Account locked due to multiple failed login attempts. Try again in 30 minutes.",
    "statusCode": 423,
    "details": {
      "lockedUntil": "2024-01-15T11:00:00Z",
      "remainingTime": 1800
    }
  }
}
```

**Rate Limit:** 5 requests per minute per IP

---

## 3. Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

---

## 4. Logout
```http
POST /auth/logout
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 5. Forgot Password
```http
POST /auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@daraexpress.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset link sent to your email",
  "data": {
    "expiresIn": 3600
  }
}
```

**Rate Limit:** 3 requests per hour per email

---

## 6. Reset Password
```http
POST /auth/reset-password
```

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

**Validation Rules:**
- `newPassword`: Min 8 chars, must contain uppercase, lowercase, number, special char
- `confirmPassword`: Must match newPassword

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## 7. Change Password
```http
PUT /auth/change-password
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 8. Verify Email
```http
POST /auth/verify-email
```

**Request Body:**
```json
{
  "token": "email_verification_token"
}
```

---

## 9. Two-Factor Authentication Setup
```http
POST /auth/2fa/setup
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "secret": "JBSWY3DPEHPK3PXP",
    "backupCodes": [
      "12345678",
      "87654321",
      "11223344"
    ]
  }
}
```

---

## 10. Two-Factor Authentication Verify
```http
POST /auth/2fa/verify
```

**Request Body:**
```json
{
  "email": "user@daraexpress.com",
  "password": "SecurePass123!",
  "code": "123456"
}
```
