const express = require('express');
const router = express.Router();


const fs = require('fs')
const json_users = fs.readFileSync('./users.json', 'utf-8')
const users = JSON.parse(json_users)

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
router.post('/', (req, res, next) => {
  res.send('datos recibidos:', JSON.stringify(req.body));
});
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  res.send('user: ' + JSON.stringify(users[id]));
});

module.exports = router;
