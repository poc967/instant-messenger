# Basic Chat Application!

## Overview

I wanted to build a simple slack clone / chat application without tutorial to practice spinning up Express backends and React frontends. The main goal here was to implement Socket.io for real time chat updates. I architected the application in it's entirety and worked out all aspects of the implementation based on my current knowledge and what seemed practical based on the scope laid out in the Socket.io documentation. The plan was to embark on this project without any preconvieved ideas from other tutorials.

### Backend

- Express.js - simple backend server library
- MongoDB - created a database to handle storage of users, conversations, and messages
- Mongoose - JS ORM for interacting with MongoDB
- Passport - user authentication using the Passport local auth scheme. This sets a cookie used for auth
- Socket.io (server) - websocket for pushing new messages to client

### Frontend

- React
- Redux - state managment (only state related to authentication)
- Redux Persist
- Styled Components - i am a huge fan of CSS in JS style solutions
- Material UI - used a few components mostly related to forms
- Socket.io (client)

### Installation

```
git clone
npm install
npm run full_app:dev
```
