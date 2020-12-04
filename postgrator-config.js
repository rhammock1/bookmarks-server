require('dotenv');


module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "database": (process.env.NODE_ENV === 'test')
    ? 'bookmarks-test'
    : 'bookmarks',
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DB_URL
    : process.env.DB_URL,
};