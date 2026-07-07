import React, { useState } from 'react';

const toInputDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().slice(0, 10);
};

const TaskForm = ({ initialData = {}, onSubmit, submitLabel = 'Save Task' }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    dueDate: toInputDate(initialData.dueDate),
    priority: initialData.priority || 'Medium',
    status: initialData.status || 'Pending',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" rows="4" value={form.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="btn" disabled={submitting}>
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
