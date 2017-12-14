'use strict';

// REQUIRE MODULES
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Project configuration modules 
const response = require('./config/response');
const configurePassport = require('./config/passport');

//Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const tips = require('./routes/tips');
const cityApi = require('./routes/cityapi');
const user = require('./routes/user');
const chat = require('./routes/chat');


//App
const app = express();

// -- Connect to database

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/travelgrid', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// -- APP Setup
// -- cors
// app.use(cors({
//   credentials: true,
//   origin: ['http://localhost:4200']
// }));
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == 'OPTIONS') {
    res.status(204).send();
  }
  else {
    next();
  }
});






// -- session

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'travelgrid-secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// -- passport

const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());


// -- middlewares

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));



// -- routes use

app.use('/', index);
app.use('/auth', auth);
app.use('/user', user);
app.use('/tips', tips);
app.use('/chat', chat);
app.use('/cityapi', cityApi);




// catch 404 and forward to error handler
app.use(function (req, res) {
  response.notFound(req, res);
});

// error handler
app.use(function (err, req, res, next) {
  console.error('error', req.method, req.path, err);

  // return the error pages
  if (!res.headersSent) {
    response.error(req, res);
  }
});

module.exports = app;
