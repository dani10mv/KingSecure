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

app.use(cors())
app.use(express.json());


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
    "Select d.codigo,d.nombre,sa.estado from sensor as s join sensores_habitacion as sh ON s.codigo = sh.sensor_codigo join dispositivo as d using (codigo) join sensor_apertura as sa using(codigo) where sh.habitacion_codigo=$1;",[codigo]
  );

  const result_movimiento = await client.query(
    "Select d.codigo,d.nombre,sm.estado from sensor as s join sensores_habitacion as sh ON s.codigo = sh.sensor_codigo join dispositivo as d using (codigo) join sensor_movimiento as sm using(codigo) where sh.habitacion_codigo=$1;",[codigo]
  );

  await client.end();

  const res={
    sensores_apertura: result_apertura.rows,
    sensores_movimiento: result_movimiento.rows
  }

  return res;
};

//listar actuadores
const listActuadoresFromHabitacion = async (codigo) => {
  const client = await pool.connect();

  const result = await client.query(
    "Select d.codigo,d.nombre,a.estado from actuador as a join actuadores_habitacion as ah ON a.codigo = ah.actuador_codigo join dispositivo as d using (codigo) where ah.habitacion_codigo=$1;",[codigo]
  );

  await client.end();
  return result.rows;
};

//añadir habitacion
const addHabitacion = async (habitacion) => {
  const client = await pool.connect();

  const result = await client.query(
    "insert into habitacion values($1,$2);",[habitacion.codigo,habitacion.nombre]
  );

  await client.end();
  return result;
};

//borrar habitacion
const deleteHabitacion = async (codigo) => {
  const client = await pool.connect();


  const result = await client.query(
    "delete from habitacion where codigo = $1;",[codigo]
  );

  await client.end();
  return result;
};


//actualizar habitacion

const updateHabitacion = async (habitacion) => {
  const client = await pool.connect();


  const result = await client.query(
    "UPDATE habitacion SET nombre=$1 where codigo = $2;",[habitacion.nombre,habitacion.codigo]
  );

  await client.end();
  return result;
};

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/habitaciones', async (req, res) => {
  const q = await listHabitacion();
  console.log(q);
  res.send(q)
});

app.get('/dispositivos/:codigo', async (req, res) => {
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


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});