function encaminar (pedido,respuesta,camino){
	//switch para decidir que hacer con la peticion recibida
	switch(camino)	{
		case 'public/hacerConsulta':{
			//llamamos a la funcion correspondiente
			ejecutarReporte(pedido,respuesta);
			break;
		} //fin caso 1

		default : {
			fs.exists(camino,function(existe){
				if (existe) {
					fs.readFile(camino,function(error,contenido){
						if (error) {
							respuesta.writeHead(500, {'Content-Type': 'text/plain'});
							respuesta.write('Error interno');
							respuesta.end();					
						} else {
							var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuesta.writeHead(200, {'Content-Type': mimearchivo});
							respuesta.write(contenido);
							respuesta.end();
						}
					});
				} else {
					respuesta.writeHead(404, {'Content-Type': 'text/html'});
					respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
					respuesta.end();
				}
			});	
			
		} //fin del caso default
	}//fin del switch
}//fin de la funcion encaminar

//evento1: cuando piden la funcion ejecutarReporte
function ejecutarReporte(pedido,respuesta){
	//configuracion para la conexion
	
	var configuracion ={
		userName: 'conexion',
		password: 'conexion1',
		server: '127.0.0.1',
		database: 'ComputerDB',
	};
	var conexion = new Conexion(configuracion);
	conexion.on('connect', function(err){
		if(err){
			console.log(err);
		}else{
			console.log('CONEXION EXITOSA');
			//llamamos la funcion que contine el resto de la consulta
			ejecutar(conexion,respuesta);
		}
	});

} //FIN DE LA FUNCION EJECUTARREPORTE


function ejecutar(conexion,respuesta){
	var pagina ='<!doctype html><html><head></head><body>'+
		'<table class="egt">'+
  			'<tr>'+
    			'<th>ID_CLIENTE  </th>'+
   				' <th>NOMBRE_CLIENTE   </th>'+
   				 '<th>FRECUENCIA</th>'+
  			'</tr>'+
  			'<tr>';

  	var consulta2 ="select c.idCliente, c.nombreCliente "+
	",isnull((round((cast((DATEDIFF(day,MIN(s.fecha),max(s.fecha)))as float)/"+
	"(count(distinct fecha))),2,0)),0)as frecuencia_en_dias "+
	"from Clientes c "+
	"left join Salida s on s.idCliente = c.idCliente "+
	"left join SalidaDetalle sa on sa.idSalida = s.idSalida "+
	"group by c.idCliente, c.nombreCliente "+
	"order by frecuencia_en_dias asc";
	//hacemos la consulta, 
  	request = new Request(consulta2, function(err){
  		if(err){
  			console.log(consulta2);
  			console.log(err);
  		}
  		conexion.close();
  		respuesta.writeHead(200, {'Content-Type': 'text/html'});
  		respuesta.end(pagina);
  	});

  	var resultado = "";
  	request.on('row', function(columns){
  		columns.forEach(function(column){
  			if(column.value === null){
  				console.log('null');
  			}else{
  				pagina += '<td>' + column.value + '</td>';
  				resultado += column.value + " ";
  			}
  		});
  		pagina += '</tr>';
  		console.log(resultado);
  		resultado="";
  	});
  	conexion.execSql(request);
  	console.log('se termino');
} //fin de la funcion ejecutar