import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
