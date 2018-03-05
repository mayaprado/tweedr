const db = require('../db/config');

const Tweed = {};

Tweed.findAll = () => {
  return db.query(
    `SELECT * FROM tweeds ORDER BY id ASC`
  );
};

Tweed.findById = (id) => {
  return db.oneOrNone(
    `
    SELECT * FROM tweeds
    WHERE id = $1`, 
    [id]
  );
};

Tweed.create = (tweed) => {
  return db.one(
    `
    INSERT INTO tweeds (tweed, tweed_time)
    VALUES ($1, $2)
    RETURNING *`,
    [tweed.tweed, tweed.time]
  );
};

Tweed.update = (tweed, id) => {
  return db.one(
    `
      UPDATE tweeds SET
      tweed = $1
      WHERE id = $2
      RETURNING *
    `, [tweed.tweed, id]
  );
};

Tweed.destroy = id => {
  return db.none(
    `
      DELETE FROM tweeds
      WHERE id = $1
    `, [id]
  );
};

module.exports = Tweed;