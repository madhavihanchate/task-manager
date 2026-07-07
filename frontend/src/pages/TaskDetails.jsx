import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import taskService from '../services/taskService';

const formatDate = (dateStr) => {
  if (!dateStr) return 'No due date';
  return new Date(dateStr).toLocaleDateString();
};

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    taskService
      .getTaskById(id)
      .then(setTask)
      .catch((err) => setError(err.response?.data?.message || 'Failed to load task'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this completed task permanently?')) return;
    try {
      await taskService.deleteTask(id);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="container error-text">{error}</div>;
  if (!task) return null;

  return (
    <div className="container">
      <div className="task-details-card">
        <h2>{task.title}</h2>
        <div className="task-meta" style={{ marginBottom: 16 }}>
          <span className={`badge status-${task.status.replace(' ', '-')}`}>{task.status}</span>
          <span>Priority: {task.priority}</span>
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
        <p>{task.description || 'No description provided.'}</p>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
          <Link to={`/tasks/${task._id}/edit`} className="btn">
            Edit
          </Link>
          {task.status === 'Completed' && (
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
