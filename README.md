# Basic Chat Application!

## Overview

I wanted to build a simple slack clone / chat application without tutorial to practice spinning up Express backends and React frontends. The main goal here was to implement Socket.io for real time chat updates. I architected the application in it's entirety and worked out all aspects of the implementation based on my current knowledge and what seemed practical based on the scope layed out in the Socket.io documentation. The plan was to embark on this project without any preconvieved ideas from other tutorials.

### Backend

Express - simple backend architecture
MongoDB - created a database to handle storage of users, conversations, and messages
Passport - user authentication using the Passport local auth scheme. This sets a cookie used for auth
Socket.io (server) - websocket for pushing new messages to client

### Frontend

React

### Installation

```
git clone
npm install
npm run full_app:dev
```
