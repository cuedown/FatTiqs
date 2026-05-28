# FatTips API Documentation

## Overview

REST API for the FatTips Solana tipping bot. All endpoints require authentication via JWT bearer token.

## Base URL

```
http://localhost:3001
```

## Authentication

All API endpoints (except `/health` and `/api/docs`) require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check

```
GET /health
```

Returns server health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-28T01:00:00.000Z",
  "uptime": 12345.67,
  "version": "0.1.0"
}
```

### API Documentation

```
GET /api/docs
```

Returns OpenAPI 3.0 specification.

### User Profile

```
GET /api/users
```

Returns the authenticated user's profile.

**Response:**
```json
{
  "discordId": "123456789",
  "walletPubkey": "...",
  "createdAt": "2026-05-28T01:00:00.000Z",
  "lastActive": "2026-05-28T01:00:00.000Z"
}
```

### Transaction History

```
GET /api/transactions
```

Returns the authenticated user's transaction history.

**Response:**
```json
[
  {
    "id": "uuid",
    "signature": "...",
    "fromId": "123456789",
    "toId": "987654321",
    "amountUsd": 5.00,
    "amountToken": 0.05,
    "tokenMint": "SOL",
    "status": "CONFIRMED",
    "createdAt": "2026-05-28T01:00:00.000Z"
  }
]
```

### Leaderboard

```
GET /api/leaderboard
```

Returns the current leaderboard.

**Response:**
```json
[
  {
    "rank": 1,
    "discordId": "123456789",
    "totalTipsSent": 100.00,
    "totalTipsReceived": 50.00,
    "airdropsCreated": 5,
    "airdropsClaimed": 10
  }
]
```

## Rate Limiting

- **General API:** 100 requests per 15 minutes
- **Authentication:** 5 attempts per 15 minutes

When rate limited, you'll receive a `429 Too Many Requests` response with a `Retry-After` header.

## Error Responses

### 401 Unauthorized

```
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 429 Too Many Requests

```
{
  "error": "Too many requests, please try again later.",
  "retryAfter": "15 minutes"
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API server port | `3001` |
| `API_RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` (15 min) |
| `API_RATE_LIMIT_MAX` | Max requests per window | `100` |

