import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import taskService from '../services/taskService';

const TaskCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    await taskService.createTask(form);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="task-details-card">
        <h2>Create Task</h2>
        <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
      </div>
    </div>
  );
};

export default TaskCreate;
