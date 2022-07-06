const pg = require('pg')

const localDbName = 'scavenger_hunt'
const localDbPassword = process.env.DB_PASSWORD

let db;
if (process.env.NODE_ENV === 'production') {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  if (process.env.UBUNTU_ENV) {
    db = new pg.Pool({
      database: localDbName,
      password: localDbPassword
    })
  } else {
    db = new pg.Pool({
      database: localDbName
    })
  }
}

module.exports = db