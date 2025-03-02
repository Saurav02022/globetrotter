# 📡 Globetrotter API Documentation

This document provides detailed information about the Globetrotter API endpoints.

## Table of Contents
- [Authentication](#authentication)
- [Destinations](#destinations)
- [Challenges](#challenges)
- [Profiles](#profiles)

## Authentication

All API routes except public routes require authentication. Include the session token in the request headers:

```typescript
headers: {
  Authorization: `Bearer ${session.access_token}`
}
```

## Destinations

### GET /api/destinations/random
Get a random destination with multiple choice options.

**Authentication Required:** Yes

**Query Parameters:**
- `difficulty` (optional): string - Filter by difficulty level ('easy', 'medium', 'hard')
- `exclude` (optional): string[] - Array of destination IDs to exclude

**Response:**
```typescript
{
  destination: {
    id: string;
    city: string;
    country: string;
    clues: string[];
    fun_facts: string[];
    trivia: string[];
    created_at: string;
  };
  options: string[]; // Array of 4 city names including correct answer
}
```

**Error Responses:**
- 401: Unauthorized
- 500: Internal Server Error

### GET /api/destinations/[id]
Get a specific destination by ID.

**Authentication Required:** Yes

**Parameters:**
- `id`: string - Destination UUID

**Response:**
```typescript
{
  id: string;
  city: string;
  country: string;
  clues: string[];
  fun_facts: string[];
  trivia: string[];
  created_at: string;
}
```

**Error Responses:**
- 401: Unauthorized
- 404: Destination not found
- 500: Internal Server Error

## Challenges

### POST /api/challenge/create
Create a new challenge.

**Authentication Required:** Yes

**Request Body:**
```typescript
{
  creatorId: string;
  expiresIn?: number; // Hours until expiration (default: 24)
}
```

**Response:**
```typescript
{
  id: string;
  shareCode: string;
  creatorId: string;
  expiresAt: string;
  created_at: string;
}
```

**Error Responses:**
- 401: Unauthorized
- 400: Invalid request body
- 500: Internal Server Error

### GET /api/challenge/[code]
Get challenge details by share code.

**Authentication Required:** No

**Parameters:**
- `code`: string - Challenge share code

**Response:**
```typescript
{
  id: string;
  creator: {
    username: string;
    score: number;
  };
  expiresAt: string;
  created_at: string;
  participants: {
    username: string;
    score: number;
  }[];
}
```

**Error Responses:**
- 404: Challenge not found
- 410: Challenge expired
- 500: Internal Server Error

## Profiles

### GET /api/profile/[id]
Get user profile details.

**Authentication Required:** Yes

**Parameters:**
- `id`: string - User UUID

**Response:**
```typescript
{
  id: string;
  username: string;
  score: number;
  games_played: number;
  created_at: string;
  updated_at: string;
  challenges_created: number;
  challenges_completed: number;
}
```

**Error Responses:**
- 401: Unauthorized
- 404: Profile not found
- 500: Internal Server Error

### PATCH /api/profile/[id]
Update user profile.

**Authentication Required:** Yes

**Parameters:**
- `id`: string - User UUID

**Request Body:**
```typescript
{
  username?: string;
  score?: number;
  games_played?: number;
}
```

**Response:**
```typescript
{
  id: string;
  username: string;
  score: number;
  games_played: number;
  updated_at: string;
}
```

**Error Responses:**
- 401: Unauthorized
- 404: Profile not found
- 409: Username already taken
- 500: Internal Server Error

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- Public endpoints: 100 requests per hour
- Authenticated endpoints: 1000 requests per hour

## Error Handling

All error responses follow this format:
```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

Common error codes:
- `unauthorized`: Authentication required or invalid
- `not_found`: Resource not found
- `validation_error`: Invalid request data
- `rate_limit_exceeded`: Too many requests
- `internal_error`: Server error 