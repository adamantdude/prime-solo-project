const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  pool.query(`
    SELECT * FROM "location" ORDER BY "id" ASC
  `)
    .then(result => res.send(result.rows))
    .catch(err => res.sendStatus(500));
});

router.post('/', (req, res) => {
  
});

module.exports = router;
