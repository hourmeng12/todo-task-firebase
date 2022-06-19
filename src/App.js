import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loading, login, logout } from './features/user/userSlice';

import Layout from './components/Layout';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import TodoTask from './pages/TodoTask';
import { auth } from './services/firebase';
import RequireAuth from './components/RequireAuth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(loading());
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<TodoList />}>
            <Route path=":listId" element={<TodoTask />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
