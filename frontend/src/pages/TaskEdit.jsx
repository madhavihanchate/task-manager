import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import taskService from '../services/taskService';

const TaskEdit = () => {
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

  const handleSubmit = async (form) => {
    await taskService.updateTask(id, form);
    navigate(`/tasks/${id}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="container error-text">{error}</div>;
  if (!task) return null;

  return (
    <div className="container">
      <div className="task-details-card">
        <h2>Edit Task</h2>
        <TaskForm initialData={task} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
};

export default TaskEdit;
