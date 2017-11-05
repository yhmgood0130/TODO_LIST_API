const knex = require('./knex');

module.exports = {
  getAll: function() {
    return knex('list');
  },
  getById: function(listId) {
    return knex('list').select().where('id',listId);
  },
  getByType: function(type) {
    return knex('list').select().where('type',type);
  },
  addList: function(newList) {
    return knex('list').insert(newList,'*');
  },
  editList: function(id,list) {
    return knex('list').where('id',id).update(list).returning('*');
  },
  deleteList: function(id) {
    return knex('list').where('id',id).del().returning('*');
  }
}
