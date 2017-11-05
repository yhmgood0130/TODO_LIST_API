
exports.up = function(knex, Promise) {
  return knex.schema.createTable('list', (table) => {
    table.increments('id').primary();
    table.string('task').notNull();
    table.text('type').nullable();
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('list');
};
