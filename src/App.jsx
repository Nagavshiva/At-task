import { BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Auth/Login";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/side" element={<PrivateRoute ><Sidebar /></PrivateRoute>} />
        <Route path="/get" element={<PrivateRoute ><Sidebar /></PrivateRoute>} />
        <Route path="/update/:id" element={<PrivateRoute ><Sidebar /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
