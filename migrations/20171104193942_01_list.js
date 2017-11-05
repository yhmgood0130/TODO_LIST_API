
exports.up = function(knex, Promise) {
  return knex.schema.createTable('list', (table) => {
    table.increments('id').primary();
    table.string('task').notNull();
    table.text('type').nullable();
    table.dateTime('schedule').nullable();
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('list');
};
