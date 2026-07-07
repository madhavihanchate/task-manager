import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateStr) => {
  if (!dateStr) return 'No due date';
  return new Date(dateStr).toLocaleDateString();
};

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className={`task-card priority-${task.priority}`}>
      <div className="task-card-main">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className={`badge status-${task.status.replace(' ', '-')}`}>{task.status}</span>
          <span>Priority: {task.priority}</span>
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
      </div>
      <div className="task-card-actions">
        <Link to={`/tasks/${task._id}`} className="btn btn-secondary">
          View
        </Link>
        <Link to={`/tasks/${task._id}/edit`} className="btn">
          Edit
        </Link>
        {task.status === 'Completed' && (
          <button className="btn btn-danger" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
