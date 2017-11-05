const lists = require('../db/lists');

exports.seed = function(knex, Promise) {
  return knex('list').del()
    .then(function () {
      return knex('list').insert(lists);
    });
};
