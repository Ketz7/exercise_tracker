# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

This is a Node.js (with Express.js) little application which is part of the FCC Back End Certification. It is an exercise tracker which allows you to add users, add their exercises and view logs of the same.

## Language and Framework
![Javascript](https://img.shields.io/badge/Language-Javascript-brightgreen) ![Expres](https://img.shields.io/badge/Framework-Express-brightgreen)

___
## Database
![MongoDb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

___
## User Stories
- [x] You can POST to /api/users with form data username to create a new user.

- [x] The returned response from POST /api/users with form data username will be an object with username and _id properties.

- [x] You can make a GET request to /api/users to get a list of all users.

- [x] The GET request to /api/users returns an array.

- [x] Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.

- [x] You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.

- [x] The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.

- [x] You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.

- [x] A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.

- [x] A GET request to /api/users/:id/logs will return the user object with a log array of all the exercises added.

- [x] Each item in the log array that is returned from GET /api/users/:id/logs is an object that should have a description, duration, and date properties.

- [x] The description property of any object in the log array that is returned from GET /api/users/:id/logs should be a string.

- [x] The duration property of any object in the log array that is returned from GET /api/users/:id/logs should be a number.

- [x] The date property of any object in the log array that is returned from GET /api/users/:id/logs should be a string.. Use the dateString format of the Date API.

- [x] You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.


___

Example 
```
Post /api/users => {"username":"test","_id":"61da2800c0ff82daa1311915","__v":0}
____________________________________________________________________________________

Post /api/users/:id/exercises => {"username":"test","description":"Test","date":"Sun Jan 09 2022","_id":"61da2800c0ff82daa1311915","duration":25}
____________________________________________________________________________________ 

Get /api/users/:id/logs => {
  "username": "test",
  "count": 1,
  "_id": "61da2800c0ff82daa1311915",
  "log": [
    {
      "description": "Test",
      "duration": 25,
      "date": "Sun Jan 09 2022"
    }
  ]
}
____________________________________________________________________________________

GET user's exercise log: GET /api/users/:_id/logs?[from][&to][&limit] => 
{
  "username": "test",
  "count": 1,
  "_id": "61da2800c0ff82daa1311915",
  "log": [
    {
      "description": "Test",
      "duration": 25,
      "date": "Sun Jan 09 2022"
    }
  ]
}

Where limit = 1 || not given
```
