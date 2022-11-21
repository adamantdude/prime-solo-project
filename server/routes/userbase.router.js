const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    pool.query(`
    SELECT "character"."id", "character"."full_name", "character"."history", "char_stats"."level", "char_stats"."exp" 
    FROM "user"
    JOIN "character" ON "character"."id" = "user"."character_id"
    JOIN "char_stats" ON "char_stats"."id" = "character"."stats_id"
    WHERE "user"."id" = $1;
  `, [req.user.id])
    .then(dbRes => {
      // console.log(dbRes.rows);
      res.send(dbRes.rows[0])
    })
    .catch(err => {
      res.sendStatus(500);
    })
  }
});

router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    pool.query(`
      UPDATE "character" SET "history" = $1 WHERE "id" = $2;
    `, [req.body.history, req.body.char_id])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    })
  }
});

module.exports = router;