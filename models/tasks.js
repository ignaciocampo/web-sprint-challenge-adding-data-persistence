const db = require('../data/config');


module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
  };
  
  function get() {
    return db('tasks');
  }
  
  function getById(id) {
    return db('tasks')
      .where({ id })
      .first();
  }
  

  function insert(post) {
    return db('tasks')
      .insert(post)
      .then(ids => {
        return getById(ids[0]);
      });
  }


  
  function update(id, changes) {
    return db('tasks')
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db('tasks')
      .where('id', id)
      .del();
  }
  