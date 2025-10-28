# Rate Limiting

## Rate Limit Tiers

**Free Tier:**
- 100 requests per minute
- 5,000 requests per hour
- 50,000 requests per day

**Standard Tier:**
- 500 requests per minute
- 25,000 requests per hour
- 250,000 requests per day

**Premium Tier:**
- 2,000 requests per minute
- 100,000 requests per hour
- 1,000,000 requests per day

**Enterprise Tier:**
- Custom limits
- Dedicated infrastructure
- SLA guarantees

---

## Rate Limit Headers

All API responses include rate limit information in headers:

```http
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 487
X-RateLimit-Reset: 1705318800
X-RateLimit-Reset-After: 45
```

**Header Descriptions:**
- `X-RateLimit-Limit` - Maximum requests allowed in the current window
- `X-RateLimit-Remaining` - Remaining requests in the current window
- `X-RateLimit-Reset` - Unix timestamp when the rate limit resets
- `X-RateLimit-Reset-After` - Seconds until the rate limit resets

---

## Rate Limit Exceeded Response

**Status Code:** 429 Too Many Requests

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again in 45 seconds.",
    "statusCode": 429,
    "details": {
      "limit": 500,
      "remaining": 0,
      "resetAt": "2024-01-15T10:45:00Z",
      "resetAfter": 45
    }
  },
  "timestamp": "2024-01-15T10:44:15Z"
}
```

---

## Rate Limit Best Practices

1. **Implement Exponential Backoff**
   - Wait progressively longer between retries
   - Example: 1s, 2s, 4s, 8s, 16s

2. **Cache Responses**
   - Cache GET requests when possible
   - Use ETags for conditional requests

3. **Batch Requests**
   - Use bulk endpoints when available
   - Combine multiple operations

4. **Monitor Headers**
   - Check `X-RateLimit-Remaining` before making requests
   - Implement client-side rate limiting

5. **Use Webhooks**
   - Subscribe to webhooks instead of polling
   - Reduces API calls significantly

---

## Endpoint-Specific Rate Limits

Some endpoints have stricter rate limits:

**Authentication Endpoints:**
- Login: 5 requests per minute per IP
- Password Reset: 3 requests per hour per email
- 2FA Verification: 10 requests per minute per user

**Export Endpoints:**
- Report Export: 10 requests per hour
- Data Export: 5 requests per hour

**Webhook Endpoints:**
- Test Webhook: 20 requests per hour
