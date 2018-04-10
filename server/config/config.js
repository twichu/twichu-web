module.exports = {
  development: {
    db: 'mongodb://localhost/demo',
  },
  production: {
    db: process.env.PRODCTION_DB_LINK,
  },
};
