const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  pool.query(`
  SELECT "character".full_name as "character_name", "message" FROM "chat_history"
  JOIN "character" ON "chat_history".user_id = "character".id
  WHERE "location_id" = $1
  ORDER BY "chat_history".id
  ASC LIMIT 20;
  `, [req.params.id])
    .then(result => res.send(result.rows))
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    });
});

router.post('/', (req, res) => {
  pool.query(`
    INSERT INTO "chat_history" ("user_id", "location_id", "message")
    VALUES ($1, $2, $3);
  `, [req.body.character_id, req.body.location_id, req.body.message])
    .then(result => res.sendStatus(201))
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});

module.exports = router;
