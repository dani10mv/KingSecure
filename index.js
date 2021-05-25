const express = require('express')
const app = express();
var cors = require('cors')
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "uxwhir6xmouk90qhvwsj",
  host: "bj5arilcdpjaediqsw4g-postgresql.services.clever-cloud.com",
  database: "bj5arilcdpjaediqsw4g",
  password: "412Rj0rha1ciaLWoZWZA",
  port: 5432,
});


const port =  process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Example app listening on port 8000!')
});


app.use(cors())
app.use(express.json());


//HABITACIONES//
/*************************************************************************************************************************************** */

//listar habitaciones
const listHabitacion = async (codigo) => {
  const client = await pool.connect();

  const result = await client.query({
    text: "SELECT * FROM habitacion; ",
  });

  await client.end();
  return result.rows;
};

//listar sensores
const listSensoresFromHabitacion = async (codigo) => {


  const client = await pool.connect();

  const result_apertura = await client.query(
    "Select d.codigo,d.nombre,sa.estado from sensor as s join sensores_habitacion as sh ON s.codigo = sh.sensor_codigo join dispositivo as d using (codigo) join sensor_apertura as sa using(codigo) where sh.habitacion_codigo=$1;", [codigo]
  );

  const result_movimiento = await client.query(
    "Select d.codigo,d.nombre,sm.estado from sensor as s join sensores_habitacion as sh ON s.codigo = sh.sensor_codigo join dispositivo as d using (codigo) join sensor_movimiento as sm using(codigo) where sh.habitacion_codigo=$1;", [codigo]
  );

  await client.end();

  const res = {
    sensores_apertura: result_apertura.rows,
    sensores_movimiento: result_movimiento.rows
  }

  return res;
};

//listar actuadores
const listActuadoresFromHabitacion = async (codigo) => {
  const client = await pool.connect();

  const result = await client.query(
    "Select d.codigo,d.nombre,a.estado from actuador as a join actuadores_habitacion as ah ON a.codigo = ah.actuador_codigo join dispositivo as d using (codigo) where ah.habitacion_codigo=$1;", [codigo]
  );

  await client.end();
  return result.rows;
};

//añadir habitacion
const addHabitacion = async (habitacion) => {
  const client = await pool.connect();

  const result = await client.query(
    "insert into habitacion values($1,$2);", [habitacion.codigo, habitacion.nombre]
  );

  await client.end();
  return result;
};

//borrar habitacion
const deleteHabitacion = async (codigo) => {
  const client = await pool.connect();


  const result = await client.query(
    "delete from habitacion where codigo = $1;", [codigo]
  );

  await client.end();
  return result;
};


//actualizar habitacion

const updateHabitacion = async (habitacion) => {
  const client = await pool.connect();


  const result = await client.query(
    "UPDATE habitacion SET nombre=$1 where codigo = $2;", [habitacion.nombre, habitacion.codigo]
  );

  await client.end();
  return result;
};


const allSensorsAperture= async () =>{

  const client = await pool.connect();


  const result = await client.query(
    "Select * from sensor_apertura join dispositivo using(codigo) ;"
  );

  await client.end();
  return result.rows;

}

const allSensorsMovement= async () =>{

  const client = await pool.connect();


  const result = await client.query(
    "Select * from sensor_movimiento join dispositivo using(codigo) ;"
  );

  await client.end();
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
  const client = await pool.connect();

  var result = await client.query(
    "insert into dispositivo values($1,$2);", [sensor.codigo, sensor.nombre]
  );

  await client.query(
    "insert into sensor values($1);", [sensor.codigo]
  );

  if (sensor.tipoSensor === "Movimiento") {

    await client.query(
      "insert into sensor_movimiento values($1,$2);", [sensor.codigo, 0]
    );
  } else if (sensor.tipoSensor === "Apertura") {
    await client.query(
      "insert into sensor_apertura values($1,$2);", [sensor.codigo, 0]
    );
  }

  await client.query(
    "insert into sensores_habitacion values($1,$2);", ['000', sensor.codigo]
  );


  await client.end();
  return result;
};



//añadir sensor
const deleteSensor = async (sensor) => {
  const client = await pool.connect();


  var result = await client.query(
    "delete from sensores_habitacion where sensor_codigo=$1;", [sensor]
  );


  result = await client.query(
    "delete from sensor_movimiento where codigo=$1;", [sensor]
  );

  result = await client.query(
    "delete from  sensor_apertura where codigo=$1;", [sensor]
  );


  result = await client.query(
    "delete from sensor where codigo=$1;", [sensor]
  );
  result = await client.query(
    "delete from  dispositivo  where codigo=$1;", [sensor]
  );



  await client.end();
  return result;
};



//añadir actuador
const addActuador = async (actuador) => {
  const client = await pool.connect();

  var result = await client.query(
    "insert into dispositivo values($1,$2);", [actuador.codigo, actuador.nombre]
  );

  result = await client.query(
    "insert into actuador values($1,$2);", [0, actuador.codigo]
  );

  //habitacion por defecto que representra ninguna habitacion asignada 000
  await client.query(
    "insert into actuadores_habitacion values($1,$2);", ['000', actuador.codigo]
  );


  await client.end();
  return result;
};

//eliminar actuador
const deleteActuador = async (actuador) => {
  const client = await pool.connect();

  var result = await client.query(
    "delete from actuadores_habitacion where actuador_codigo=$1;", [actuador]
  );


  result = await client.query(
    "delete from actuador where codigo=$1;", [actuador]
  );

  result = await client.query(
    "delete from dispositivo where codigo=$1;", [actuador]
  );

  await client.end();
  return result;
};


//añadir senso
const addSensorToHabitacion = async (habitacion, sensor) => {
  const client = await pool.connect();


  //se quita de la antigua o de la 000
  await client.query(
    "delete from sensores_habitacion where sensor_codigo = $1;", [sensor]
  );


  // se inserta en la habitacion 
  var result = await client.query(
    "insert into sensores_habitacion values($1,$2);", [habitacion, sensor]
  );


  //el estado es activo sin activado
  await client.query(
    "update sensor_apertura set estado 1 where codigo = $1;", [actuador]
  );
  await client.query(
    "update sensor_movimiento set estado 1 where codigo = $1;", [actuador]
  );

  await client.end();
  return result;
};



const addActuadorToHabitacion = async (habitacion, actuador) => {
  const client = await pool.connect();

  await client.query(
    "delete from actuadores_habitacion where actuador_codigo = $1;", [actuador]
  );

  var result = await client.query(
    "insert into actuadores_habitacion values($1,$2);", [habitacion, actuador]
  );

  await client.query(
    "update actuador set estado 1 where codigo = $1;", [actuador]
  );

  await client.end();
  return result;
};


const deleteActuadorFromHabitacion = async (actuador) => {

  const client = await pool.connect();

  var result = await client.query(
    "update actuadores_habitacion set habitacion_codigo = '000' where actuador_codigo = $1;", [actuador]
  );

  await client.query(
    "update actuador set estado = 0 where codigo = $1;", [actuador]
  );

  await client.end();
  return result;
}


const deleteSensorFromHabitacion = async (sensor) => {

  const client = await pool.connect();

  var result = await client.query(
    "update sensores_habitacion set habitacion_codigo = '000' where sensor_codigo = $1;", [sensor]
  );

  await client.query(
    "update sensor_movimiento set estado = 0 where codigo = $1;", [sensor]
  );

  await client.query(
    "update sensor_apertura set estado = 0 where codigo = $1;", [sensor]
  );

  await client.end();
  return result;
}


const updateSensor = async (sensor) => {

  const client = await pool.connect();

  var result = await client.query(
    "update sensor_apertura set estado = $1 where codigo = $2;", [sensor.estado, sensor.codigo]
  );

  await client.query(
    "update sensor_movimiento set estado = $1 where codigo = $2;", [sensor.estado, sensor.codigo]
  );

  var actuadoreAActivar = [];
//si se activa el sensor se mandan lso actuadores que se activaran
  if(sensor.estado==2){

    actuadoreAActivar = await client.query(
      "select actuador_codigo from sensores_habitacion join actuadores_habitacion using(habitacion_codigo) where sensor_codigo=$1;",[sensor.codigo] 
    );

  }

  await client.end();


  //para devolver solo la string y no el objeto
  const list  = actuadoreAActivar.rows.map(obj=>obj.actuador_codigo);

  return list;

}


const updateActuador = async (actuador) => {

  const client = await pool.connect();

  var result = await client.query(
    "update actuador set estado = $1 where codigo = $2;", [actuador.estado, actuador.codigo]
  );

  await client.end();

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

