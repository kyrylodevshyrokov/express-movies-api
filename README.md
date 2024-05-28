# Movies API

## About

This API is designed for getting info about movies and actors, and searching for particular movie and actor. User may be authenticated via GitHub for optional further profile creating.

## Features

- User authentication using passport-github and express-session.
- Getting info about current top-rated/now-playing movies.
- Filtering and searching for particular movie or actor.
- Leaving and updating the rating for particular movie.

## Technologies

- **Express.js:** a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Passport-github:** the module that lets you authenticate using GitHub in Node.js applications.
- **Express-session:** Node.js module that creates a session middleware with the given options.

## Getting Started

1. Clone the repository to your local machine.
   
2. Install dependencies using
```bash
npm install
```

3. Fill `.env` file with a secret key for your express-session object option. Here is an example:
```bash
SECRET_KEY=secret
```

4. In your Developer Setiings on your GitHub Profile create a new OAuth App with next filled fields:
```bash
#Application name: Your App name
#Homepage URL: localhost:3000
#Application description (what visitors will see during authentication via GitHub): We want your profile info for our movie website!
#Authorization callback URL: http://localhost:3000/auth
```

5. Fill `config.js` file with secret info that is appeared after OAuth App creation. Here is an example:
```bash
clientID: "your_cliend_id",
clientSecret: "your_client_secret",
callbackURL: "http://localhost:3000/auth"
```
   
5. Launch the local server using
```bash
npm run start
```

## API Endpoints
Here are the routes that can be used for routing in the app.

### _Auth And Users_

### Register

- Method: **POST**
- URL: {{URL}}/users
- Data:
```bash
{
    "username": "Jonny",
    "password": "password",
    "retypedPassword": "password",
    "firstName": "Jonny",
    "lastName": "Doe",
    "email": "john@gmail.com"
}
```
- Requires Auth: **NO**
- Description: This endpoint enables users to register by sending a POST request containing their chosen username, password, first name, last name, and email.

### Authenticate

- Method: **POST**
- URL: {{URL}}/auth/login
- Data:
```bash
{
    "username": "Jonny",
    "password": "password"
}
```
- Requires Auth: **NO**
- Description: This endpoint enables users authenticate by sending a POST request with their username and password; upon successful authentication, the server returns a JSON object containing an access token.

### Get Current User Profile

- Method: **GET**
- URL: {{URL}}/auth/profile
- Requires Auth: **YES**
- Description: This endpoint retrieves the profile information of the currently authenticated user. 

### _Events_

### Create Event

- Method: **POST**
- URL: {{URL}}/events
- Data:
```bash
{
    "name": "Interesting Party",
    "description": "That is a crazy event, must go there!",
    "address": "Local St 101",
    "when": "2023-08-16 21:00:00"
}
```
- Requires Auth: **YES**
- Description: This endpoint allows authenticated users to create a new event with filled following fields: name, description, address, and when.

### Get All Events

- Method: **GET**
- URL: {{URL}}/events
- Requires Auth: **NO**
- Description: This endpoint allows both authenticated and unauthenticated users to retrieve all events.

### Get Single Event

- Method: **GET**
- URL: {{URL}}/events/:id
- Requires Auth: **NO**
- Description: This endpoint allows both authenticated and unauthenticated users to retrieve information about a specific event with ID.

### Delete Event

- Method: **DELETE**
- URL: {{URL}}/events/:id
- Requires Auth: **YES**
- Description: This endpoint allows authenticated users to delete an event with ID.

### Get Events Organized By User

- Method: **GET**
- URL: {{URL}}/events-organized-by-user/:id
- Requires Auth: **NO**
- Description: This endpoint allows both authenticated and unauthenticated users to retrieve a list of events organized by the user with ID.

### _Event Attendance_

### Get Event Attendees

- Method: **GET**
- URL: {{URL}}/events/:id/attendees
- Requires Auth: **NO**
- Description: This endpoint allows both authenticated and unauthenticated users to retrieve the list of attendees for a specific event with ID.

### Attend Event

- Method: **PUT**
- URL: {{URL}}/current-user-event-attendance/:id
- Data:
```bash
{
    "answer": 1
}
```
- Requires Auth: **YES**
- Description: This endpoint enables authenticated users to indicate their attendance at a specific event.

### Get Specific Event Attendance By Current User

- Method: **GET**
- URL: {{URL}}/current-user-event-attendance/:id
- Requires Auth: **YES**
- Description: This endpoint allows authenticated users to retrieve their attendance status for a specific event with ID.

### Get All Events Attendance By Current User

- Method: **GET**
- URL: {{URL}}/current-user-event-attendance
- Requires Auth: **YES**
- Description: This endpoint allows authenticated users to retrieve their attendance status for all events.
