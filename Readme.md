FIRST APPROACH

Start the Server
Run your server:

node server.js

http://localhost:8100

 Perform Task Operations Using Postman or cURL
Use Postman or cURL to perform CRUD operations and observe real-time updates in the browser.

Create a Task

curl -X POST http://localhost:8100/tasks -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_AUTH_TOKEN" -d '{"description": "New Task"}'

Update a Task

curl -X PATCH http://localhost:8100/tasks/TASK_ID -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_AUTH_TOKEN" -d '{"description": "Updated Task"}'

Delete a Task

curl -X DELETE http://localhost:8100/tasks/TASK_ID -H "Authorization: Bearer YOUR_AUTH_TOKEN"

Register a User

curl -X POST http://localhost:8100/users/register -H "Content-Type: application/json" -d '{"name": "New User", "email": "newuser@example.com", "password": "password123"}'

Login a User

curl -X POST http://localhost:8100/users/login -H "Content-Type: application/json" -d '{"email": "newuser@example.com", "password": "password123"}'