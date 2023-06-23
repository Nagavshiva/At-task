import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './components/Auth/Login';
import Get from './components/task/Get';
import Update from './components/task/Update';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const userToken = localStorage.getItem('accessToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={!setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path="/side" element={<Sidebar />} />
            <Route path="/get" element={<Get />} />
            <Route path="/update/:id" element={<Update />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
