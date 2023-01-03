var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 세션에 관한 export
const session = require("express-session");
const fileStore = require("session-file-store")(session);  // 메모리에 저장할거면 빼도됨

const cookieSession = require("cookie-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // post 데이터 파싱할때 필요한것
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 정적파일

//쿠키
/* app.use(
  cookieSession({
  name : session,
  keys : "key",
  maxAge: 24*60*60*1000,
  })
); */

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
    store : new fileStore(),
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
