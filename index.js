const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const UserRouter = require("./controllers/User") //import User Routes
const TodoRouter = require("./controllers/Todo") // import Todo Routes
const EventsRouter = require("./controllers/Events"); // import Events Routes
const EventActivityRouter = require("./controllers/EventActivity"); // import EventActivity Routes
const cors = require("cors") // import cors
const cookieParser = require('cookie-parser');


//Connect mongoDB database
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database=mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () =>{
    console.log('Database connected');
})

//Setting up the server
const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.all(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use(cookieParser());


app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing
app.use("/todos", TodoRouter) // send all "/todos" request to TodoROuter
app.use("/events", EventsRouter)
app.use("/eventactivity", EventActivityRouter)

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})