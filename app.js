 var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//redireccionaiento
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var peticionesDeApi = require('./routes/apiPeticiones');
var proveedores = require('./routes/peticionesProveedor');
var clientes  = require('./routes/peticionesClientes');
var filtroCliente = require('./routes/filtrosClientes');
var sims = require('./routes/peticionesSim');
var tipopago = require('./routes/peticionesTipoPago');
var tiposervicio = require('./routes/peticionesTipoServicio');
var tipomora = require('./routes/peticionesTipoMora');
var vehiculos = require('./routes/peticionesVehiculos');
<<<<<<< HEAD
var gps = require('./routes/peticionesgps');
var historialVehiculo = require('./routes/peticioneshistorialVehiculo');
=======
//var pruebas = requerie('.test/servidor')
>>>>>>> 97cf8772a91b494bf749b0c5349c837a733ccf0a
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: '*'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuario/', peticionesDeApi);
app.use('/proveedores', proveedores);
app.use('/clientes/', clientes);
app.use('/filtrarClientes/', filtroCliente);
app.use('/sims', sims);
app.use('/tipopago', tipopago);
app.use('/tiposervicio', tiposervicio);
app.use('/tipomora', tipomora);
app.use('/vehiculos/', vehiculos);
app.use('/gps/', gps);
app.use('/historialVehiculo',historialVehiculo);
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
