
const express = require('express');
const TaskModel = require('../Model/task.model');
const { auth } = require('../Middleware/auth.middleware');

const taskRouter = express.Router();

// Get all tasks
taskRouter.get('/',auth, async (req, res) => {
  console.log("user DEDO ID",req.body.userID)
  try {
    
    const tasks = await TaskModel.findAll({where :{userID:req.body.userID}});
    
    res.json({tasks});
  } catch (error) {
  console.log(error)
    res.status(500).json({ message: 'Server error' });
  }

});


// Get a single task by ID
taskRouter.get('/:id',auth, async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await TaskModel.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    
    res.status(500).json({ message: 'Server error' });
  }
});


// Create a new task
taskRouter.post('/',auth, async (req, res) => {
  const { title, description,userID } = req.body;
  try {
    const newTask = await TaskModel.create({ title, description,userID });
    res.status(201).json(newTask);
  } catch (error) {
  console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Update an existing task
taskRouter.put('/:id', auth,async (req, res) => {
  const taskId = req.params.id;
  console.log("<<<<<<",taskId)
  const { title, description } = req.body;
  try {
    const task = await TaskModel.findByPk(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    await task.save();
    res.json(task);
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
});



// Delete a task
taskRouter.delete('/:id',auth, async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await TaskModel.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
  
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {
    taskRouter,
};
