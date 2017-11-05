module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/todo'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
