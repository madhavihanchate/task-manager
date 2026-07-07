import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import taskService from '../services/taskService';
import TaskItem from '../components/TaskItem';
import FilterBar from '../components/FilterBar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
      const res = await taskService.getTasks(params);
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this completed task permanently?')) return;
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>My Tasks</h2>
        <Link to="/tasks/new" className="btn">
          + New Task
        </Link>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      {loading && <div className="loading">Loading tasks...</div>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks found. Create your first task to get started!</p>
        </div>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
