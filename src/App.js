import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import TodoTask from './pages/TodoTask';
import RequireAuth from './components/RequireAuth';

function App() {
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
