import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from '../features/user/userActions';
import { selectUser, selectUserLoading } from '../features/user/userSlice';
import { useLocation, Navigate } from 'react-router-dom';

const Login = () => {
  const loading = useSelector(selectUserLoading);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLoginWIthGoogle = () => {
    dispatch(loginWithGoogle());
  };

  // Navigate user to homepage if user is authenticate
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-screen max-w-xs rounded-xl bg-white p-4 dark:bg-zinc-800">
        <h2 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-200">
          Login
        </h2>
        <p className="mb-4 text-sm text-zinc-500">
          To Do gives you focus, from work to play.
        </p>
        <button
          disabled={loading}
          onClick={handleLoginWIthGoogle}
          className="w-full rounded-lg bg-gray-100/80 py-2 px-6 font-medium hover:bg-gray-200 disabled:cursor-not-allowed"
        >
          {loading ? 'Authenticating...' : 'Login with Google'}
        </button>
      </div>
    </div>
  );
};

export default Login;
