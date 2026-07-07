const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, dueDate, priority, status } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      priority,
      status,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks for logged in user (with filtering, sorting, pagination)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, sortBy, order, search, page = 1, limit = 20 } = req.query;

    const query = { user: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const sortField = ['dueDate', 'priority', 'status', 'createdAt', 'title'].includes(sortBy)
      ? sortBy
      : 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort({ [sortField]: sortOrder })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Task.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: tasks.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const allowedFields = ['title', 'description', 'dueDate', 'priority', 'status'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task (only allowed for completed tasks, per spec)
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.status !== 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Only completed tasks can be deleted. Mark it as Completed first.',
      });
    }

    await task.deleteOne();

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
