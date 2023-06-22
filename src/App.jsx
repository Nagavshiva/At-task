import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Auth/Login';
import Get from "./components/task/Get";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/side" element={<Sidebar />} />
        <Route path="/get" element={<Get />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


