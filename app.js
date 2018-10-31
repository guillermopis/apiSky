var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var Moment = require('moment');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


//para logs
/*
var mkdirp = require('mkdirp');
var express = require('express');
var routes = require('./routes/routes');
//utilizar el archivo logger
var logger = require('./logger');
var app = express();


//prueba de logs
var createFolder = function(foldername) {
    //mandamos el nombre del archivo y el error 
    mkdirp(foldername, function (err) {
        err = true;
        if (err) {
            logger.error(err);
        }
        else {
            logger.info("informacion: " + foldername + " prueba");
        }
    });
};

// LOGS 
var uuid = require('node-uuid');
var createNamespace = require('continuation-local-storage').createNamespace;
var myRequest = createNamespace('my request');

// initialize log folder
//creamos una carpeta llamada logs
createFolder("./logs");
*/



//var morgan = require('morgan');
//var accessLogStream = fs.createWriteStream(
  //    path.join(__dirname, 'access.log'), {flags: 'a'}
// );
// setup the logger 
//app.use(morgan('combined', {stream: accessLogStream}));
////////////////////////  Configuración para Morgan y creación del stream node.log
//loggerHTTP = require('morgan');
//var fs = require('fs'); var util = require('util');
//var log_file = fs.createWriteStream(__dirname + '/node.log', {flags : 'a'});


//var fs = require('fs'); var util = require('util');
//var log_file = fs.createWriteStream(__dirname + '/node.log', {flags : 'w'});
//var log_stdout = process.stdout;


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
var lotes = require('./routes/peticionesLotes');


var gps = require('./routes/peticionesgps');
var historialVehiculo = require('./routes/peticioneshistorialVehiculo');

var gps = require('./routes/peticionesgps');
var historialVehiculo = require('./routes/peticioneshistorialVehiculo');


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
app.use('/lotes', lotes);
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


// Ejecute el contexto para cada solicitud asignar un identificador único a cada solicitud
/*
app.use(function(req, res, next) {
    myRequest.run(function() {
        //asignamos un identificador unico 
        //el metodo set nos permite escribir o leer en el mismo
        myRequest.set('reqId', uuid.v1());
        next();
    });
});

//para logs
routes.assignRoutes(app);
*/

module.exports = app;
