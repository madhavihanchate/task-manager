import api from './api';

const getTasks = async (params = {}) => {
  const res = await api.get('/tasks', { params });
  return res.data;
};

const getTaskById = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data.data;
};

const createTask = async (task) => {
  const res = await api.post('/tasks', task);
  return res.data.data;
};

const updateTask = async (id, task) => {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data.data;
};

const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

const taskService = { getTasks, getTaskById, createTask, updateTask, deleteTask };

export default taskService;
