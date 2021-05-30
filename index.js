const express = require('express')
const app = express();
var cors = require('cors')
const { Pool } = require('pg')

const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({

  connectionString: 'postgresql://uxwhir6xmouk90qhvwsj:412Rj0rha1ciaLWoZWZA@bj5arilcdpjaediqsw4g-postgresql.services.clever-cloud.com:5432/bj5arilcdpjaediqsw4g',
  ssl: { rejectUnauthorized: false }
});



const port = process.env.PORT || 8000;
app.listen(port,async () => {
  console.log('Example app listening on port 8000!')

  const xxx =  await pool.connect();
xxx.release();
});

 


app.use(cors())
app.use(express.json());


//HABITACIONES//
/*************************************************************************************************************************************** */

//listar habitaciones
const listHabitacion = async (codigo) => {
  //  

  // const result = await pool.query({
  //   text: "SELECT * FROM habitacion; ",
  // });

  const result = await pool.query({
    text: "SELECT * FROM habitacion; ",
  });
  //  
  return result.rows;
};

//listar sensores
const listSensoresFromHabitacion = async (codigo) => {


   

  const result_apertura = await pool.query(
    "Select d.codigo,d.nombre,sa.estado from sensor as s join sensores_habitacion as sh ON s.codigo = sh.sensor_codigo join dispositivo as d using (codigo) join sensor_apertura as sa using(codigo) where sh.habitacion_codigo=$1;", [codigo]
  );

  const result_movimiento = await pool.query(
    "Select d.codigo,d.nombre,sm.estado from sensor as s join sensores_habitacion as sh ON s.codigo = sh.sensor_codigo join dispositivo as d using (codigo) join sensor_movimiento as sm using(codigo) where sh.habitacion_codigo=$1;", [codigo]
  );

    

  const res = {
    sensores_apertura: result_apertura.rows,
    sensores_movimiento: result_movimiento.rows
  }

  return res;
};

//listar actuadores
const listActuadoresFromHabitacion = async (codigo) => {
   

  const result = await pool.query(
    "Select d.codigo,d.nombre,a.estado from actuador as a join actuadores_habitacion as ah ON a.codigo = ah.actuador_codigo join dispositivo as d using (codigo) where ah.habitacion_codigo=$1;", [codigo]
  );

    
  return result.rows;
};

//añadir habitacion
const addHabitacion = async (habitacion) => {
   

  const result = await pool.query(
    "insert into habitacion values($1,$2);", [habitacion.codigo, habitacion.nombre]
  );

    
  return result;
};

//borrar habitacion
const deleteHabitacion = async (codigo) => {
   


  const result = await pool.query(
    "delete from habitacion where codigo = $1;", [codigo]
  );

    
  return result;
};


//actualizar habitacion

const updateHabitacion = async (habitacion) => {
   


  const result = await pool.query(
    "UPDATE habitacion SET nombre=$1 where codigo = $2;", [habitacion.nombre, habitacion.codigo]
  );

    
  return result;
};


const allSensorsAperture = async () => {

   


  const result = await pool.query(
    "Select * from sensor_apertura join dispositivo using(codigo) ;"
  );

    
  return result.rows;

}

const allSensorsMovement = async () => {
  console.log("empieza SENSORES MOV");
  

   
console.log("DESPUES DE POLL");


  const result = await pool.query(
    "Select * from sensor_movimiento join dispositivo using(codigo) ;"
  );

console.log("DESPUES DE QUERY");


    

console.log("DESPUES DE END");

  return result.rows;

}

const allActuadores = async () => {

   


  const result = await pool.query(
    "Select * from actuador join dispositivo using(codigo) ;"
  );

    
  return result.rows;

}


//HABITACIONES RUTAS
/************************************************************************************************************** */



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/habitaciones', async (req, res) => {
  const q = await listHabitacion();
  console.log(q);
  res.send(q)
});


app.get('/sensores/apertura', async (req, res) => {
  const q = await allSensorsAperture();
  console.log(q);
  res.send(q)
});

app.get('/sensores/movimiento', async (req, res) => {
  const q = await allSensorsMovement();
  res.send(q)
});

app.get('/sensores/:codigo', async (req, res) => {
  const q = await listSensoresFromHabitacion(req.params.codigo);
  console.log(q);
  res.send(q)
});


app.get('/actuadores', async (req, res) => {
  const q = await allActuadores();
  console.log(q);
  res.send(q)
});

app.get('/actuadores/:codigo', async (req, res) => {
  const q = await listActuadoresFromHabitacion(req.params.codigo);
  console.log(q);
  res.send(q)
});







app.post('/habitacion/add', async (req, res) => {

  const q = await addHabitacion(req.body);
  console.log(q);
  res.send(q)
});

app.delete('/habitacion/delete/:codigo', async (req, res) => {

  const q = await deleteHabitacion(req.params.codigo);
  console.log(q);
  res.send(q)
});


app.put('/habitacion/update', async (req, res) => {

  const q = await updateHabitacion(req.body);
  console.log(q);
  res.send(q)
});


//DISPOSITIOS

//añadir sensor
const addSensor = async (sensor) => {
   

  var result = await pool.query(
    "insert into dispositivo values($1,$2);", [sensor.codigo, sensor.nombre]
  );

  await pool.query(
    "insert into sensor values($1);", [sensor.codigo]
  );

  if (sensor.tipoSensor.toUpperCase() === "MOVIMIENTO") {

    await pool.query(
      "insert into sensor_movimiento values($1,$2);", [sensor.codigo, 0]
    );
  } else if (sensor.tipoSensor.toUpperCase() === "APERTURA") {
    await pool.query(
      "insert into sensor_apertura values($1,$2);", [sensor.codigo, 0]
    );
  }

  await pool.query(
    "insert into sensores_habitacion values($1,$2);", ['000', sensor.codigo]
  );


    
  return result;
};



//añadir sensor
const deleteSensor = async (sensor) => {
   


  var result = await pool.query(
    "delete from sensores_habitacion where sensor_codigo=$1;", [sensor]
  );


  result = await pool.query(
    "delete from sensor_movimiento where codigo=$1;", [sensor]
  );

  result = await pool.query(
    "delete from  sensor_apertura where codigo=$1;", [sensor]
  );


  result = await pool.query(
    "delete from sensor where codigo=$1;", [sensor]
  );
  result = await pool.query(
    "delete from  dispositivo  where codigo=$1;", [sensor]
  );



    
  return result;
};



//añadir actuador
const addActuador = async (actuador) => {
   

  var result = await pool.query(
    "insert into dispositivo values($1,$2);", [actuador.codigo, actuador.nombre]
  );

  result = await pool.query(
    "insert into actuador values($1,$2);", [0, actuador.codigo]
  );

  //habitacion por defecto que representra ninguna habitacion asignada 000
  await pool.query(
    "insert into actuadores_habitacion values($1,$2);", ['000', actuador.codigo]
  );


    
  return result;
};

//eliminar actuador
const deleteActuador = async (actuador) => {
   

  var result = await pool.query(
    "delete from actuadores_habitacion where actuador_codigo=$1;", [actuador]
  );


  result = await pool.query(
    "delete from actuador where codigo=$1;", [actuador]
  );

  result = await pool.query(
    "delete from dispositivo where codigo=$1;", [actuador]
  );

    
  return result;
};


//añadir senso
const addSensorToHabitacion = async (habitacion, sensor) => {
   


  //se quita de la antigua o de la 000
  await pool.query(
    "delete from sensores_habitacion where sensor_codigo = $1;", [sensor]
  );


  // se inserta en la habitacion 
  var result = await pool.query(
    "insert into sensores_habitacion values($1,$2);", [habitacion, sensor]
  );


  //el estado es activo sin activado
  await pool.query(
    "update sensor_apertura set estado = 1 where codigo = $1;", [actuador]
  );
  await pool.query(
    "update sensor_movimiento set estado = 1 where codigo = $1;", [actuador]
  );

    
  return result;
};



const addActuadorToHabitacion = async (habitacion, actuador) => {
   

  await pool.query(
    "delete from actuadores_habitacion where actuador_codigo = $1;", [actuador]
  );

  var result = await pool.query(
    "insert into actuadores_habitacion values($1,$2);", [habitacion, actuador]
  );

  await pool.query(
    "update actuador set estado = 1 where codigo = $1;", [actuador]
  );

    
  return result;
};


const deleteActuadorFromHabitacion = async (actuador) => {

   

  var result = await pool.query(
    "update actuadores_habitacion set habitacion_codigo = '000' where actuador_codigo = $1;", [actuador]
  );

  await pool.query(
    "update actuador set estado = 0 where codigo = $1;", [actuador]
  );

    
  return result;
}


const deleteSensorFromHabitacion = async (sensor) => {

   

  var result = await pool.query(
    "update sensores_habitacion set habitacion_codigo = '000' where sensor_codigo = $1;", [sensor]
  );

  await pool.query(
    "update sensor_movimiento set estado = 0 where codigo = $1;", [sensor]
  );

  await pool.query(
    "update sensor_apertura set estado = 0 where codigo = $1;", [sensor]
  );

    
  return result;
}


const updateSensor = async (sensor) => {

   

  var result = await pool.query(
    "update sensor_apertura set estado = $1 where codigo = $2;", [sensor.estado, sensor.codigo]
  );


  await pool.query(
    "update sensor_movimiento set estado = $1 where codigo = $2;", [sensor.estado, sensor.codigo]
  );

  await pool.query(
    "update dispositivo set nombre = $1 where codigo = $2;", [sensor.nombre, sensor.codigo]
  );


  var actuadoreAActivar =[];
  //si se activa el sensor se mandan lso actuadores que se activaran
  if (sensor.estado == 2) {

    actuadoreAActivar = await pool.query(
      "select actuador_codigo from sensores_habitacion join actuadores_habitacion using(habitacion_codigo) where sensor_codigo=$1 ;", [sensor.codigo]
    );

  }

    


  if(actuadoreAActivar.rows){
    
    //para devolver solo la string y no el objeto
    const list = actuadoreAActivar.rows.map(obj => obj.actuador_codigo);

    return list;
  }

  return [];
}


const updateActuador = async (actuador) => {

   

  var result = await pool.query(
    "update actuador set estado = $1 where codigo = $2;", [actuador.estado, actuador.codigo]
  );

  await pool.query(
    "update dispositivo set nombre = $1 where codigo = $2;", [actuador.nombre, actuador.codigo]
  );

    

  return result;

}



//*******************************DIRECCIONAMOENTO DE DISPOSITIVOS************************************************ */

app.post('/sensor/add', async (req, res) => {

  const q = await addSensor(req.body);
  console.log(q);
  res.send(q)

});

app.post('/actuador/add', async (req, res) => {

  const q = await addActuador(req.body);
  console.log(q);
  res.send(q)
});

app.delete('/sensor/delete/:codigo', async (req, res) => {

  const q = await deleteSensor(req.params.codigo);
  console.log(q);
  res.send(q)
});

app.delete('/actuador/delete/:codigo', async (req, res) => {

  const q = await deleteActuador(req.params.codigo);
  console.log(q);
  res.send(q)
});


//snesor to habitacion 
app.post('/habitacion/addSensor/:codigoHabitacion/:codigoSensor', async (req, res) => {

  const q = await addSensorToHabitacion(req.params.codigoHabitacion, req.params.codigoSensor);
  console.log(q);
  res.send(q)
});



//sensor to habitacion
app.post('/habitacion/addActuador/:codigoHabitacion/:codigoActuador', async (req, res) => {

  const q = await addActuadorToHabitacion(req.params.codigoHabitacion, req.params.codigoActuador);
  console.log(q);
  res.send(q)
});

app.delete('/sensor/deleteFromHabitacion/:codigo', async (req, res) => {

  const q = await deleteSensorFromHabitacion(req.params.codigo);
  console.log(q);
  res.send(q)
});

app.delete('/actuador/deleteFromHabitacion/:codigo', async (req, res) => {

  const q = await deleteActuadorFromHabitacion(req.params.codigo);
  console.log(q);
  res.send(q)
});


app.put('/actuador/update', async (req, res) => {

  const q = await updateActuador(req.body);
  console.log(q);
  res.send(q)
});


app.put('/sensor/update', async (req, res) => {

  const q = await updateSensor(req.body);
  console.log(q);
  res.send(q)
});


//metodo de listado unico de habitaciones u sus sensores

const getCasa = async () => {



   

  const habitaciones = await pool.query(
    "Select * from habitacion;"
  );

  console.log(habitaciones)
  var casa = []
  
  for (let i = 0; i < habitaciones.rowCount; i++) {
    const habitacion = habitaciones.rows[i];

    
    console.log("habitacion   = ",habitacion)

  

    const result_apertura = await pool.query(
      "Select d.codigo,d.nombre,sa.estado from sensor as s join sensores_habitacion as sh ON s.codigo = sh.sensor_codigo join dispositivo as d using (codigo) join sensor_apertura as sa using(codigo) where sh.habitacion_codigo=$1;", [habitacion.codigo]
    );
    console.log("cosas")

    const result_movimiento = await pool.query(
      "Select d.codigo,d.nombre,sm.estado from sensor as s join sensores_habitacion as sh ON s.codigo = sh.sensor_codigo join dispositivo as d using (codigo) join sensor_movimiento as sm using(codigo) where sh.habitacion_codigo=$1;", [habitacion.codigo]
    );


    const result_actuadores = await pool.query(
      "Select d.codigo,d.nombre,a.estado from actuador as a join actuadores_habitacion as ah ON a.codigo = ah.actuador_codigo join dispositivo as d using (codigo)  where ah.habitacion_codigo=$1;", [habitacion.codigo]
    );

    const newObj =  {
      habitacion: habitacion,
      sensores_movimiento: result_movimiento.rows,
      sensores_apertura: result_apertura.rows,
      actuadores: result_actuadores.rows

    }

    console.log(newObj)

    casa.push(newObj);

    
  }

    
  console.log("termina")

  return casa;

}

app.get('/casa', async (req, res) => {

  const q = await getCasa();
  console.log(q);
  res.send(q)
});
