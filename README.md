

# Project Overview

RESTful API has been developed with Express.js and MongoDB native driver that fetches data from MongoDB instance.

### Used Libraries

 - [Express.js](https://www.npmjs.com/package/express): For creating API
 - [express-validator](https://www.npmjs.com/package/express-validator): Request body validation is doing by this library. For all body field, requirements are determined and these are checked.
 - [MongoDB Driver](https://www.npmjs.com/package/mongodb): Connection between database and API and creating queries are provided by this library.

### Query Creation
Aggregation method was used to get computed results. In this, the desired data set and calculations were determined with the `$project` key. Data is obtained by applying constraints with `$match`.


# Getting Started
Instructions for running the project locally are given below. Node.js must be properly installed to run project.

## Installation
1. Clone the repo
`git clone https://github.com/MMYurt/restful-api-mongo` 

2. Install the packages
`cd restful-api-mongo && npm install`
3. Set the DATABASE_URL local environment variable
4. Running server
`node app.js`

### Running tests
`npx jest app.test.js`

### Live URL

https://restful-api-mongo.herokuapp.com
# REST API

### Open Endpoints
There is only one open endpoint.

`POST /getData` 
#### Data constraints

    {
	    "startDate": "[valid date (YYYY-MM-DD)]",
	    "endDate": "[valid date (YYYY-MM-DD)]",
	    "minCount": "[valid number]",
	    "maxCount": "[valid number]",
     }
### Success Response

code: `0`

HTTP Status Code: `200 OK`

#### Response Content Example

    {
	    "code": "0",
	    "msg": "Success",
	    "records": [
			{
				"key": "TAKwGc6Jr4i8Z487",
				"createdAt": "2017-01-28T01:22:14.398Z",
				"totalCount": 310
			}
		]		    
    }

### Error Responses

code: `1`

HTTP Status Code: `404 Not Found`

Condition: `If you trying to access non-existent endpoint`

<hr style="border:2px solid gray"> </hr>

code: `2`

HTTP Status Code: `422 Unprocessable Entity`

Condition: `If you pass missing or invalid body field`

<hr style="border:2px solid gray"> </hr>

code: `3`

HTTP Status Code: `503 Service Unavailable`

Condition: `If an error occured through database connection`

<hr style="border:2px solid gray"> </hr>

code: `4`

HTTP Status Code: `405 Method Not Allowed`

Condition: `If you trying to reach through disallowed endpoints. Only POST is allowed.`

<hr style="border:2px solid gray"> </hr>

code: `5`

HTTP Status Code: `500 Internal Server Error`

Condition: `If an unexpected error occurs`
