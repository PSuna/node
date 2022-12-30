var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//추가할 부분 =======================================================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');
var booksRouter = require('./routes/books');
//==================================================================

// 세션에 관한 export
const session = require("express-session");
const fileStore = require("session-file-store")(session); 

var app = express(); //createServer() 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// json 형식 폼 요청 들어오면 자동파싱
// express.urlencoded()을 통해 req.body가 스트링이 아닌 객체로저장됨
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

//라우터 추가할부분=================================================
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter);
app.use('/books',booksRouter);
//=================================================================

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
