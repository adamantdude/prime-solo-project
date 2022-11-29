const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  const client = await pool.connect();

  try {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const charName = req.body.charName;

    await client.query('BEGIN');
    const charStatsCreationResult = await client.query(`
      INSERT INTO "char_stats" VALUES (DEFAULT) RETURNING "id";
    `)
    const journalCreationResult = await client.query(`
      INSERT INTO "journal" VALUES (DEFAULT) RETURNING "id";
    `)
    const characterCreationResult = await client.query(`
      INSERT INTO "character" ("full_name", "stats_id")
      VALUES ($1, $2) RETURNING "id";
    `, [charName, charStatsCreationResult.rows[0].id])

    await client.query(`
      INSERT INTO "user" ("username", "password", "character_id", "journal_id")
      VALUES ($1, $2, $3, $4);
    `, [username, password, characterCreationResult.rows[0].id, journalCreationResult.rows[0].id]);

    await client.query('COMMIT');

    console.log('NEW USER CREATED!');

    res.sendStatus(201);
  } catch (err) {
    await client.query('ROLLBACK');
    console.log('ERROR POST /api/user', err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
