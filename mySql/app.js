var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');

// 세션에 관한 export
const session = require("express-session");
const fileStore = require("session-file-store")(session); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// json 형식 폼 요청 들어오면 자동파싱
// req.body 가 스트링이 아닌 객체로저장됨
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

//app.use(cookieParser());

//세션
app.use(
  session({
    secret : "secret key",
    resave: false,
    saveUninitialized:true,
    cookie:{
      httpOnly:true,
      //secure : true, : http일때 있어야하는것이므로 localhost에선 없어야함(주석처리)
      maxAge : 60000, // 밀리초 : 1분이 경과되면 세션이 없어짐(세션 유지기간)
    },
    store : new fileStore(),
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter);

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
