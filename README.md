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

### Log In With GitHub Account

- Method: **GET**
- URL: {{URL}}/login
- Requires Auth: **NO**
- Description: This endpoint enables users to log in by sending a GET request via their GitHub profile. 

### _Movies_

### Get Most Popular Movies

- Method: **GET**
- URL: {{URL}}/most_popular
- Requires Auth: **NO**
- Description: This endpoint allows users to get list of most popular movies.

### Get The Single Movie Details

- Method: **GET**
- URL: {{URL}}/movie/:id
- Requires Auth: **NO**
- Description: This endpoint allows both users to get details about particular movie.

### Get Top-Rated Movies In Descending Order

- Method: **GET**
- URL: {{URL}}/movie/top_rated
- Requires Auth: **NO**
- Description: This endpoint allows users to retrieve information about top-rated movies in descending order.

### Submit The Rating For One Movie

- Method: **POST**
- URL: {{URL}}/movie/:id/rating
- Data:
```bash
   value: 5
```
- Requires Auth: **NO**
- Description: This endpoint allows users to submit rating for movie with particular ID.

### Delete The Rating For One Movie

- Method: **DELETE**
- URL: {{URL}}/movie/:id/rating
- Data:
```bash
   value: 5
```
- Requires Auth: **NO**
- Description: This endpoint allows users to delete rating for movie with particular ID.

### Search The Movie By Query

- Method: **GET**
- URL: {{URL}}/search/movie?query=Spider
- Requires Auth: **NO**
- Description: This endpoint allows users to search movie by title or description.

### Search The Actor By Query

- Method: **GET**
- URL: {{URL}}/search/person?query=Keaton
- Requires Auth: **NO**
- Description: This endpoint allows users to search the actor by name or surname.
