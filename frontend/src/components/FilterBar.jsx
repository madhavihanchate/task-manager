import React from 'react';

const FilterBar = ({ filters, onChange }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="search"
        placeholder="Search by title..."
        value={filters.search || ''}
        onChange={handleChange}
      />

      <select name="status" value={filters.status || ''} onChange={handleChange}>
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select name="priority" value={filters.priority || ''} onChange={handleChange}>
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select name="sortBy" value={filters.sortBy || 'createdAt'} onChange={handleChange}>
        <option value="createdAt">Sort by Created</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
        <option value="status">Sort by Status</option>
      </select>

      <select name="order" value={filters.order || 'desc'} onChange={handleChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};

export default FilterBar;
