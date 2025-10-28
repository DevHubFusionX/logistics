# Getting Started

## API Overview

### Base URL
```
Production: https://api.daraexpress.com/v1
Staging: https://staging-api.daraexpress.com/v1
Development: http://localhost:8000/api/v1
```

### Protocol
- HTTPS only (HTTP requests will be redirected)
- REST architecture
- JSON request/response format
- UTF-8 encoding

### Versioning
- Current version: v1
- Version specified in URL path
- Breaking changes will increment version number

### Request Headers
```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
Accept: application/json
X-Request-ID: {unique-request-id}
X-API-Version: v1
```

### Response Format
All responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_abc123xyz"
}
```

### Pagination
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Filtering & Sorting
```http
GET /resource?filter[status]=active&filter[date][gte]=2024-01-01&sort=-createdAt,name
```

### Date Format
- ISO 8601: `2024-01-15T10:30:00Z`
- Timezone: UTC (convert to WAT on client)
