<h1> Chat Web Application </h1>
This is a messaging application based on NodeJS/ExpressJS/MongoDB and Sockets applications. This application enables clients to send private conversation requests (to be rejected/accepted) to other clients to establish a one to one conversation. However, a client must be logged in to access the chat features. This feature is implemented through JWT authentication in the Api calls. Once a client is logged in, the client will receive an unique socket instance that establishes a bidirectional connection with the server, so the client can receive data(new messages, new requests, deleted converstaions) emitted from the server side. Every posted message will be stored in the database until the conversation room which the message is related to is deleted. Therefore, once a client log in, he can retrieve all messages that are sent to him when he was offline.

<h2> Instructions To Run </h2>
<ol> 
  <li>Clone this project: https://github.com/chy101010/SimpleChat</li>
  <li>Download MongoDB, execute mongod from its bin in the termination</li>
  <li>Install all dependencies using <ol> <li> npm install </li> <li> npm install nodemon </li> </ol> </li>  
  <li>npm run launch</li>
</ol>

<h5> When the server is ready </h5>
<ol>
  <li>Go to your browswer and search up http://localhost:3000/</li>
  <li>Register an account</li>
  <li>Login with the account created</li>
</ol>

<h2> ScreenShots </h2>
<h3> Login page </h3>
<img src = "readme/login.png" width = 400>
<h3> Register page </h3>
<img src = "readme/register.png" width = 400>
<h3> Chat page </h3>
<img src = "readme/chat.png" width = 400>

<h2>Upcomings</h2>
<ol>
  <li>Some Bug fixings</li>
  <li>Black listing user</li>
  <li>Messages Pagination</li>
</ol>
