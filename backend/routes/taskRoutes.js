const express = require('express');
const { body } = require('express-validator');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

const taskValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Invalid status'),
];

router
  .route('/')
  .get(getTasks)
  .post(
    [body('title').trim().notEmpty().withMessage('Title is required'), ...taskValidation],
    createTask
  );

router.route('/:id').get(getTaskById).put(taskValidation, updateTask).delete(deleteTask);

module.exports = router;
