var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Conectar a MongoDB (configurado en docker-compose.yml)
mongoose.connect('mongodb://admin:password@db:27017/fotosdb?authSource=admin')
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// configuracion del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// Asegurar que extended esté configurado para manejar formularios correctamente
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// capturar 404 y reenviar al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// manejador de errores
app.use(function(err, req, res, next) {
  // establecer variables locales, solo proporcionar error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderizar la pagina de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
