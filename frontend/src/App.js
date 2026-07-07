import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import TaskCreate from './pages/TaskCreate';
import TaskEdit from './pages/TaskEdit';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <PrivateRoute>
              <TaskCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id/edit"
          element={
            <PrivateRoute>
              <TaskEdit />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
