const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express' });
// });
// router.get('/', (req, res, next) => {
//   res.render('inicio');
// });

const fs = require('fs')
const json_casas = fs.readFileSync('./casas.json', 'utf-8')
const casas = JSON.parse(json_casas)


router.get('/', (req, res, next) => {
  res.send('landing page');
});
router.post('/', (req, res, next) => {
  res.send('datos recibidos:', JSON.stringify(req.body));
});

router.get('/casas', (req, res, next) => {
  const casas_str = JSON.stringify(casas)
  console.log(casas_str)
  res.send(casas_str);
});
router.post('/casas', (req, res, next) => {
  const newCasa = req.body
  console.log(newCasa)
  casas.push(newCasa)
  try {
    fs.writeFileSync('./casas.json', JSON.stringify(casas), 'utf-8')
    res.send('casa introducida' + JSON.stringify(casas));
  } catch (error) {
    res.send('error:', error)
  }
});

router.get('/casas/:nombre', (req, res, next) => {
  const nombre = req.params.nombre
  // console.log(typeof casas)
  res.send('casa: ' + JSON.stringify(casas[nombre]));
});
router.delete('/casas/:nombre', (req, res, next) => {
  const nombre_borrar = req.params.nombre
  casas = casas.filter((c) => c.nombre != nombre_borrar)
  try {
    fs.writeFileSync('./casas.json', JSON.stringify(casas), 'utf-8')
    res.send('borrado: ' + JSON.stringify(nombre_borrar));
  } catch (error) {
    res.send('error:', error)
  }
});

// actualizar / crear
router.patch('/casas/:nombre', (req, res, next) => {
  const nombre = req.params.nombre
  if (nombre) {
    res.send('el recurso ya existe' + JSON.stringify(casas[nombre]))
  } else {
    try {
      const newCasa = req.body
      casas.push(newCasa)
      fs.writeFileSync('./casas.json', JSON.stringify(casas), 'utf-8')
      res.send('casa introducida' + JSON.stringify(casas));
    } catch (error) {
      res.send('error:', error)
    }
  }
});
// reemplazar / crear
router.put('/casas/:nombre', (req, res, next) => {
  const nombre = req.params.nombre
  const encontrado = casas.find((c) => c.nombre == nombre)
  if (encontrado) {
    casas = casas.filter((c) => c.nombre != nombre)
    casas.push(req.body)
    try {
      fs.writeFileSync('./casas.json', JSON.stringify(casas), 'utf-8')
      res.send('sustituido' + JSON.stringify(casas))
    } catch (error) {
      res.send('error:', error)
    }
  } else {
    casas.push(req.body)
    try {
      fs.writeFileSync('./casas.json', JSON.stringify(casas), 'utf-8')
      res.send('creado' + JSON.stringify(casas))
    } catch (error) {
      res.send('error:', error)
    }
  }
});


router.use('/', (req, res, next) => {
  res.send('recurso no encontrado');
});


module.exports = router;