import './App.css'
import IndexPage from './pages/IndexPage'
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from "axios";
import { UserContextProvider } from './userContext';

axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/Register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
