const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.raw({ type: '*/*' }));

app.use('/autodiscover', require('./routes/autodiscover'));

app.locals.layout = null;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
