var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var cors = require('cors');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');

var app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost/postly', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the database!");
});

// Allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(cors());

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.get('*', (req, res) => {  // Add this line
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send('Sorry, we cannot find that!');
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;