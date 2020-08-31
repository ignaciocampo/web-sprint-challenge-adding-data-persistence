const express = require('express');

const Tasks = require('../models/tasks');
// const { task } = require('gulp');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.get()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.getById(id)
  .then(task => {
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Could not find task with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});



router.post('/', (req, res) => {
  const tasksData = req.body;

  Tasks.insert(tasksData)
  .then(task => {
    res.status(201).json(task);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task' });
  });
});



router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Tasks.getById(id)
  .then(task => {
    if (task) {
      Tasks.update(id, changes )
      .then(updatedTask => {
        res.json(updatedTask);
      });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update task' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete task' });
  });
});

module.exports = router;