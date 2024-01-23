import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addstudent } from '../state/CourseSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

  const handleLogin = () => {
    navigate('/dashboard');
    dispatch(addstudent(id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="id">
            Enter ID:
          </label>
          <input
            type="text"
            id="id"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Enter Password:
          </label>
          <input type="password" id="password" className="w-full border border-gray-300 p-2 rounded" />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
