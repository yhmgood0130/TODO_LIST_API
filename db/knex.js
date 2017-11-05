const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const environmntConfig = config[environment];
const knex = require('knex');
const connection = knex(environmntConfig);

module.exports = connection;
