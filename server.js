/**
informacion
https://solidgeargroup.com/identificador-unico-logger-peticion-express-nodejs?lang=es
 * Created by dvicente@solidgear.es on 10/11/2017
 */
'use strict'

var mkdirp = require('mkdirp');
var express = require('express');
var routes = require('./routes/routes');
var logger = require('./logger');

var app = express();

var createFolder = function(foldername) {
    //mandamos el nombre del archivo y el error 
    mkdirp(foldername, function (err) {
        //err = true;
        if (err) {
            logger.error(err);
        }
        else {
            logger.info("de informacion: " + foldername + " de informacion creado");
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


// Ejecute el contexto para cada solicitud asignar un identificador único a cada solicitud
app.use(function(req, res, next) {
    myRequest.run(function() {
        //asignamos un identificador unico 
        //el metodo set nos permite escribir o leer en el mismo
        myRequest.set('reqId', uuid.v1());
        next();
    });
});


routes.assignRoutes(app);

// run server
app.listen(4444);


