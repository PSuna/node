var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require("express-session");

var mainRouter = require('./routes/main');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var membersRouter = require('./routes/members');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');  
var reviewsRouter = require('./routes/reviews');  
var booksRouter = require('./routes/books');  

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//세션
app.use(
  session({
    secret : "secret key",
    resave: false,
    saveUninitialized:true, //빈값이어도 하나의 쿠키가 생성됨
    cookie:{
      httpOnly:true, // 로컬에서 접근못하게 막아놓음
      //secure : true, : localhost에선 없어야함(주석처리), http프로토콜에서만 사용가능
      maxAge : 60000, // 밀리초 : 1분이 경과되면 세션이 없어짐(세션 유지기간)
    },
    //store : new fileStore(), // 필요없으면 주석처리(없으면 기본적으로 메모리에 저장됨)
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter); 
app.use('/main',mainRouter);
app.use('/members', membersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);  
app.use('/reviews', reviewsRouter);
app.use('/books', booksRouter);

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
