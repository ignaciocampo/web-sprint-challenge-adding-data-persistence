const db = require('../data/config');


module.exports = {
    get,
    getById,
    insert,
    findTasks,
    update,
    remove,
  };
  
  function get() {
    return db('projects');
  }
  
  function getById(id) {
    return db('projects')
      .where({ id })
      .first();
  }
  
  function findTasks(id) {
    return db("tasks")
    .join("projects", "projects.id", "tasks.project_id")
    .where("tasks.project_id", id)
    .select("tasks.id", "projects.name","projects.description", "tasks.description", "tasks.notes")
}



  function insert(post) {
    return db('projects')
      .insert(post)
      .then(ids => {
        return getById(ids[0]);
      });
  }


  
  function update(id, changes) {
    return db('projects')
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db('projects')
      .where('id', id)
      .del();
  }
  