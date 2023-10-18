# Challenge Nubceo movies API
### The main idea of this challenge is to demostrate my basic Nodejs Skills in creating a REST API following the REST standar.

## Technical specifications
- Nodejs 20.2.0
- MongoDB 7.x

## Node packages modules usage
- dotenv 16.3.1 (For the use of environment variables)
- express 4.18.2 (Creation of REST API in an easy and dynamic way)
- jsonwebtoken 9.0.2 (Creating tokens for authentication)
- mongoose 7.6.3 (ODM Allows working with mongodb ^7.x)
- mongoose-paginate-v2 (makes pagination of mongo documents easier)
- winston (Logger)
- nodemon (makes api debug easier)

## Repository initialization
1. Make sure you comply with the technical specifications mentioned above.
2. Clone repository. With the command `git clone` you can clone this repository to any folder you want.
3. Install dependencies. In the "Node packages modules usage" section you will see all the dependencies that this project needs, so make sure to install them with the command: `npm install`.

## Environment initialization
At the root of the repository you will see a file called .env.example based on that file make sure to create the .env file setting the environment variables as you want.

## API REST iniialization
There are two ways to start the API with the following commands.

- ```npm run dev``` Will initialize the rest api aplication in development environment with nodemon package.

- ```npm run start``` Will initialize the rest api aplication in production environment with PM2
*Warning: for usage of PM2 make sure to install PM2 with global params ```npm install pm2 -g```*

## Get Token to usage Endpoints
To obtain the token necessary to make requests to the REST API. You must use the ```npm run get-token``` command.

## Endpoints

In this section I prepared a postman folder to view the requests. Only the url and authorization token must be adjusted for correct operation.
[Nubceo-movies-api-postman](https://documenter.getpostman.com/view/23504160/2s9YR9YCM6)

- All request headers:
```json
    {
        "Authorization": "token"
    }
```

### Actors request
- Create an actor
    * Endpoint: "/api/actors"
    * Method: POST
    * Body:
    ```json
        {
            "name": String,
            "lastName": String,
            "birthDate": "YYYY-MM-DD",
            "nationality": String
        }
    ```
- Update an actor
    * Endpoint: "/api/actors/:id"
    * Method: PUT
    * Body: 
    ```json
        {
            "name": String,
            "lastName": String,
            "birthDate": "YYYY-MM-DD",
            "nationality": String
        }
    ```
- Delete an actor
    * Endpoint: "/api/actors/:id"
    * Method: DELETE

- Paginated actors
    * Endpoint: "/api/actors/:page/:limit"
    * Method: GET
    * Querie params:
    ```json
        {
            "name": String,
            "lastName": String,
            "nationality": String,
            "sinceBirthDate": "YYYY-MM-DD",
            "untilBirthDate": "YYYY-MM-DD",
            "orderBy": "name" || "lastName" || "nationality",
            "orderDesc": true || false
        }
    ```
- Get actor by id
    * Endpoint: "/api/actors/:id"
    * Method: GET

### Directors Request

- Create a Director
    * Endpoint: "/api/directors"
    * Method: POST
    * Body: 
    ```json
        {
            "name": String,
            "lastName": String,
            "birthDate": "YYYY-MM-DD",
            "nationality": String
        }
    ```
- Update a Director
    * Endpoint: "/api/directors/:id"
    * Method: PUT
    * Body:
    ```json
        {
            "name": String,
            "lastName": String,
            "birthDate": "YYYY-MM-DD",
            "nationality": String
        }
    ```
- Delete a Director
    * Endpoint: "/api/directors/:id"
    * Method: DELETE
- Paginated Directors
    * Endpoint: "/api/directors/:page/:limit"
    * Method: GET
    * Query params:
    ```json
        {
            "name": String,
            "lastName": String,
            "nationality": String,
            "sinceBirthDate": "YYYY-MM-DD",
            "untilBirthDate": "YYYY-MM-DD",
            "orderBy": "name" || "lastName" || "nationality",
            "orderDesc": true || false
        }
    ```
- Get Director by id
    * Endpoint: "/apí/directors/:id"
    * Method: GET

### Movies Request

- Create a movie
    * Endpoint: "/api/movies"
    * Method: POST
    * Body: 
    ```json
        {
            "title": String,
            "releaseYear": Number,
            "description": String,
            "actors": [
                {
                    "actor": ObjectId,
                    "character": String
                }
            ],
            "directors": [ObjectId]
        }
    ```
- Update a movie
    * Endpoint: "/api/movies/:id"
    * Method: PUT
    * Body: 
    ```json
        {
            "title": String,
            "releaseYear": Number,
            "description": String,
            "actors": [
                {
                    "actor": ObjectId,
                    "character": String
                }
            ],
            "directors": [ObjectId]
        }
    ```
- Delete a movie
    * Endpoint: "/api/movies/:id"
    * Method: DELETE
- Paginated movies
    * Endpoint: "/api/movies/:page/:limit"
    * Method: GET
    * Query Params:
    ```json
        {
            "title": String,
            "description": String,
            "sinceReleaseYear": Number,
            "untilReleaseYear": Number
        }
    ```
- Get movie by id
    * Endpoint: "/api/movies/:id"
    * Method: GET

### Series Request
- Create a serie
    * Endpoint: "/api/series"
    * Method: POST
    * Body: 
    ```json
        {
            "title": String,
            "releaseYear": Number,
            "description": String,
            "seasons": [
                {
                    "number": Number,
                    "title": String,
                    "episodes": [
                        {
                            "title": String,
                            "actors": [
                                {
                                    "actor": ObjectId,
                                    "character": String
                                }
                            ],
                            "directors": [ObjectId]
                        }
                    ]
                }
            ]
        }
    ```
- Update a serie
    * Endpoint: "/api/series/:id"
    * Method: PUT
    * Body:
    ```json
        {
            "title": String,
            "releaseYear": Number,
            "description": String,
            "seasons": [
                {
                    "number": Number,
                    "title": String,
                    "episodes": [
                        {
                            "title": String,
                            "actors": [
                                {
                                    "actor": ObjectId,
                                    "character": String
                                }
                            ],
                            "directors": [ObjectId]
                        }
                    ]
                }
            ]
        }
    ```
- Delete a serie
    * Endpoint: "/api/series/:id"
    * Method: DELETE
- Paginated series
    * Endpoint: "/api/series/:page/:limit"
    * Method: GET
    * Query Params:
    ```json
        {
            "title": String,
            "description": String,
            "sinceReleaseYear": Number,
            "untilReleaseYear": Number,
            "sortBy": "title" || "description",
            "sortDesc": true || false
        }
    ```
- Get serie by id
    * Endpoint: "/api/series/:id"
    * Method: GET