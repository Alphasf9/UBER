# Users Register Endpoint

## Endpoint: `/users/register`

### Method: `POST`

This endpoint is used to register a new user in the application. It takes user details such as name, email, and password, validates the input, hashes the password, and stores the user data in the database. A JWT token is generated upon successful registration.

---

### Request Body:
The request body should be in JSON format and must include the following fields:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "example@example.com",
  "password": "securepassword"
}
```

| Field             | Type   | Required | Description                                           |
|-------------------|--------|----------|-------------------------------------------------------|
| `fullname`        | Object | Yes      | An object containing `firstname` and `lastname`.      |
| `fullname.firstname` | String | Yes      | The first name of the user (minimum 3 characters).    |
| `fullname.lastname`  | String | No       | The last name of the user.                           |
| `email`           | String | Yes      | The user's email address (must be a valid email).     |
| `password`        | String | Yes      | The user's password (minimum 6 characters).          |

---

### Response:

#### Success Response:

- **Status Code:** `201 Created`

- **Body:**

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "example@example.com",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  },
  "message": "User Registered successfully"
}
```

#### Error Responses:

1. **Validation Error:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

   ```json
   {
     "errors": [
       {
         "msg": "Invalid email",
         "param": "email",
         "location": "body"
       }
     ],
     "success": false
   }
   ```

2. **Missing Fields:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

   ```json
   {
     "message": "All fields are required"
   }
   ```

3. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**

   ```json
   {
     "message": "Error creating user: <error_message>"
   }
   ```

---

### Notes:
- Ensure that `JWT_SECRET` is set in your environment variables for token generation.
- The `password` field is hashed before being stored in the database.
- If the `email` is already in use, the `userModel.create()` function will throw an error due to the `unique` constraint on the `email` field.



# Users Login Endpoint

## Endpoint: `/users/login`

### Method: `POST`

This endpoint is used to authenticate a user. It takes the user's email and password, validates the input, verifies the credentials, and returns a JWT token upon successful authentication.

---

### Request Body:
The request body should be in JSON format and must include the following fields:

```json
{
  "email": "example@example.com",
  "password": "securepassword"
}
```

| Field      | Type   | Required | Description                                           |
|------------|--------|----------|-------------------------------------------------------|
| `email`    | String | Yes      | The user's email address (must be a valid email).     |
| `password` | String | Yes      | The user's password (minimum 6 characters).           |

---

### Response:

#### Success Response:

- **Status Code:** `200 OK`

- **Body:**

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "example@example.com",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  },
  "message": "User logged in successfully"
}
```

#### Error Responses:

1. **Validation Error:**
   - **Status Code:** `400 Bad Request`
   - **Body:**

   ```json
   {
     "errors": [
       {
         "msg": "Invalid email",
         "param": "email",
         "location": "body"
       }
     ],
     "success": false
   }
   ```

2. **Invalid Credentials:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

   ```json
   {
     "message": "Invalid email or password"
   }
   ```

3. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**

   ```json
   {
     "message": "An error occurred: <error_message>"
   }
   ```

---

### Notes:
- Ensure that `JWT_SECRET` is set in your environment variables for token generation.
- The `email` and `password` fields must match the records in the database.
- The password is verified using bcrypt's `compare` method.
- The response includes a JWT token for authenticating further requests.




# Get User Profile Endpoint

## Endpoint: `/users/profile`

### Method: `GET`

This endpoint retrieves the profile details of the authenticated user. The user must be logged in and provide a valid JWT token for authentication.

---

### Headers:
The request must include the following headers:

| Header             | Type   | Required | Description                          |
|--------------------|--------|----------|--------------------------------------|
| `Authorization`    | String | Yes      | Bearer token for user authentication |

---

### Response:

#### Success Response:

- **Status Code:** `200 OK`

- **Body:**

```json
{
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "example@example.com",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  }
}
```

#### Error Responses:

1. **Unauthorized (No Token Provided):**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

   ```json
   {
     "message": "Unauthorized. Please login again"
   }
   ```

2. **Invalid or Expired Token:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

   ```json
   {
     "message": "Invalid token"
   }
   ```

3. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**

   ```json
   {
     "message": "Internal Server Error"
   }
   ```

---

### Notes:
- Ensure that `JWT_SECRET` is set in your environment variables for token verification.
- The `Authorization` header must include the prefix `Bearer ` followed by the token.
- This endpoint returns the user's profile based on the token's payload.

---

### Example Request:

#### cURL:
```bash
curl -X GET \
     -H "Authorization: Bearer <jwt_token>" \
     http://localhost:5000/users/profile
```

---

### Example Usage:

#### JavaScript Fetch:
```javascript
fetch("http://localhost:5000/users/profile", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));




# Logout User Endpoint

## Endpoint: `/users/logout`

### Method: `GET`

This endpoint is used to log out a user by blacklisting their current JWT token. Once logged out, the user cannot perform any actions that require authentication until they log in again.

---

### Request:
- The request must include a valid JWT token in the `Authorization` header or in cookies.

#### Headers:
| Header             | Value                | Required | Description                          |
|--------------------|----------------------|----------|--------------------------------------|
| `Authorization`    | `Bearer <jwt_token>` | Yes      | The user's JWT token for validation. |

---

### Response:

#### Success Response:
- **Status Code:** `200 OK`

- **Body:**

```json
{
  "message": "User logged out successfully"
}
```

#### Error Responses:

1. **Unauthorized (No Token):**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

   ```json
   {
     "message": "Unauthorized"
   }
   ```

2. **Invalid Token:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**

   ```json
   {
     "message": "Invalid token"
   }
   ```

3. **Internal Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**

   ```json
   {
     "message": "Internal Server Error"
   }
   ```

---

### Notes:
- The token is stored in a blacklist collection in the database and will remain invalid until it expires.
- Ensure that the `BlacklistToken` schema is properly configured to handle token expiration.
- If using cookies, make sure they are sent securely over HTTPS in production.



# API Documentation: Captain Endpoints

## 1. Captain Register
### Endpoint
`POST /captain/register`

### Description
This endpoint is used to register a new captain in the application. It takes captain details such as name, email, password, and vehicle information, validates the input, hashes the password, and stores the captain's data in the database. A JWT token is generated upon successful registration.

### Request Headers
- `Content-Type`: `application/json`

### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "example@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "MH12AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

| Field                  | Type    | Required | Description                                                   |
|------------------------|---------|----------|---------------------------------------------------------------|
| `fullname`             | Object  | Yes      | An object containing `firstname` and `lastname`.              |
| `fullname.firstname`   | String  | Yes      | The first name of the captain (minimum 3 characters).          |
| `fullname.lastname`    | String  | No       | The last name of the captain (minimum 3 characters).           |
| `email`                | String  | Yes      | The captain's email address (must be a valid email).           |
| `password`             | String  | Yes      | The captain's password (minimum 6 characters).                 |
| `vehicle`              | Object  | Yes      | An object containing vehicle details.                          |
| `vehicle.color`        | String  | Yes      | The color of the vehicle (minimum 3 characters).               |
| `vehicle.plate`        | String  | Yes      | The vehicle's plate number (in Indian format, e.g., MH12AB1234).|
| `vehicle.capacity`     | Number  | Yes      | The capacity of the vehicle (minimum 1).                       |
| `vehicle.vehicleType`  | String  | Yes      | The type of vehicle (`car`, `motorcycle`, or `auto`).          |

### Responses
#### Success
- **Status Code**: `201 Created`
- **Response Body**:
```json
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "example@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  },
  "message": "Captain Registered successfully"
}
```

#### Error
1. **Validation Error**:
   - **Status Code**: `400 Bad Request`
   - **Response Body**:
   ```json
   {
     "errors": [
       {
         "msg": "Invalid email",
         "param": "email",
         "location": "body"
       }
     ],
     "success": false
   }
   ```

2. **Email Already Exists**:
   - **Status Code**: `409 Conflict`
   - **Response Body**:
   ```json
   {
     "message": "Email already in use"
   }
   ```

3. **Internal Server Error**:
   - **Status Code**: `500 Internal Server Error`
   - **Response Body**:
   ```json
   {
     "message": "Internal Server Error while registering captain"
   }
   ```

---

## 2. Captain Login
### Endpoint
`POST /captain/login`

### Description
This endpoint allows a captain to log in by providing their email and password.

### Request Headers
- `Content-Type`: `application/json`

### Request Body
```json
{
  "email": "captain@example.com",
  "password": "securepassword"
}
```

### Responses
#### Success
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "message": "Captain logged in successfully"
}
```

#### Error
1. **Invalid Credentials**:
   - **Status Code**: `401 Unauthorized`
   - **Response Body**:
   ```json
   {
     "message": "Invalid email or password"
   }
   ```

2. **Validation Error**:
   - **Status Code**: `400 Bad Request`
   - **Response Body**:
   ```json
   {
     "errors": [
       {
         "msg": "Invalid email",
         "param": "email",
         "location": "body"
       }
     ],
     "success": false
   }
   ```

---

## 3. Get Captain Profile
### Endpoint
`GET /captain/profile`

### Description
Retrieve the logged-in captain's profile information.

### Request Headers
- `Authorization`: `Bearer <JWT_TOKEN>`

### Responses
#### Success
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error
- **Status Code**: `401 Unauthorized`
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## 4. Logout Captain
### Endpoint
`GET /captain/logout`

### Description
Logs out the captain by clearing the authentication token and blacklisting it.

### Request Headers
- `Authorization`: `Bearer <JWT_TOKEN>`
- **OR**
- Cookie: `token=<JWT_TOKEN>`

### Responses
#### Success
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "message": "Captain logged out successfully"
}
```

#### Error
- **Status Code**: `500 Internal Server Error`
  ```json
  {
    "message": "An error occurred while logging out"
  }
  ```

---

## 5. Ride Endpoints

### Create Ride
#### Endpoint
`POST /rides/create`

#### Description
Create a new ride request by specifying pickup and destination details.

#### Request Headers
- `Authorization`: `Bearer <JWT_TOKEN>`

#### Request Body
```json
{
  "pickup": "123 Main St",
  "destination": "456 Park Ave",
  "vehicleType": "car"
}
```

#### Responses
##### Success
- **Status Code**: `201 Created`
- **Response Body**:
  ```json
  {
    "ride": {
      "_id": "<ride_id>",
      "pickup": "123 Main St",
      "destination": "456 Park Ave",
      "fare": 15.0,
      "status": "pending"
    },
    "message": "Ride created successfully"
  }
  ```

##### Error
1. **Validation Error**:
   - **Status Code**: `400 Bad Request`
   - **Response Body**:
     ```json
     {
       "errors": [
         {
           "msg": "pickup must be a string with a minimum length of 3 characters",
           "param": "pickup",
           "location": "body"
         }
       ],
       "success": false
     }
     ```

2. **Unauthorized**:
   - **Status Code**: `401 Unauthorized`
   - **Response Body**:
     ```json
     {
       "message": "Unauthorized"
     }
     ```

---

### Get Fare
#### Endpoint
`GET /rides/fare`

#### Description
Get the estimated fare for a ride based on pickup and destination locations.

#### Request Headers
- `Authorization`: `Bearer <JWT_TOKEN>`

#### Request Query
- `pickup`: String
- `destination`: String

#### Responses
##### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "fare": 15.0,
    "duration": 25,
    "distance": 10
  }
  ```

##### Error
- **Status Code**: `401 Unauthorized`
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## 6. Maps Endpoints

### Get Coordinates
#### Endpoint
`GET /maps/get-coordinates`

#### Description
Retrieve geographic coordinates based on an address.

#### Request Headers
- `Authorization`: `Bearer <JWT_TOKEN>`

#### Request Query
- `address`: String

#### Responses
##### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  }
  ```

##### Error
- **Status Code**: `401 Unauthorized`
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### Get Distance and Time
#### Endpoint
`GET /maps/get-distance-time`

#### Description
Calculate the estimated time and distance between two locations.

#### Request Headers
- `Authorization`: `Bearer <JWT_TOKEN>`

#### Request Query
- `origin`: String
- `destination`: String

#### Responses
##### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "duration": 25,
    "distance": 10
  }
  ```

##### Error
- **Status Code**: `401 Unauthorized`
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### Get Suggestions
#### Endpoint
`GET /maps/get-suggestions`

#### Description
Retrieve address suggestions based on input.

#### Request Headers
- `Authorization`: `Bearer <JWT_TOKEN>`

#### Request Query
- `input`: String

#### Responses
##### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "suggestions": [
      "123 Main St",
      "124 Main St"
    ]
  }
  ```

##### Error
- **Status Code**: `401 Unauthorized`
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---




