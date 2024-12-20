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

