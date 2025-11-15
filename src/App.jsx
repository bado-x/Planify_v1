import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddTask from "./pages/AddTask/AddTask";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditTask from "./pages/EditTask/EditTask";
import Landing from "./pages/Landing/Landing";
import './App.css';
import { useEffect, useState } from 'react';
import Sidebar from "./components/Sidebar";
import TaskTracking from "./pages/TaskTracking";
import CalendarPage from "./pages/Calendar";
import Analytics from "./pages/Analytics/Analytics";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";
import Features from "./pages/Features/Features";
import Contact from "./pages/Contact/Contact";
import FAQ from "./pages/FAQ/FAQ";
import { taskApi } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const fetchTasks = async () => {
    if (user && user.id) {
      try {
        const data = await taskApi.fetchTasks(user.id);
        setTasks(data);
        return data;
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setTasks([]); // Set empty array on error
        return [];
      }
    }
    return [];
  };

  useEffect(() => {
    fetchTasks();
    App.fetchTasks = fetchTasks;
  }, [user]);

  // Refresh tasks when page becomes visible (user returns from another tab/page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user && user.id) {
        fetchTasks();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className={`App ${!user ? 'landing-mode' : ''}`} style={{ display: 'flex' }}>
      {user && !isMobile && <Sidebar />}
      <div className="mainContent" style={{ flex: 1, marginLeft: user && !isMobile ? 250 : 0, width: user && !isMobile ? 'calc(100% - 250px)' : '100%', maxWidth: user && !isMobile ? 'calc(100% - 250px)' : '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/add-task" element={user ? <AddTask user={user} fetchTasks={App.fetchTasks} /> : <Navigate to="/login" />} />
          <Route path="/edit-task/:id" element={user ? <EditTask user={user} fetchTasks={App.fetchTasks} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register onRegister={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/task-tracking" element={user ? <TaskTracking tasks={tasks} user={user} onLogout={handleLogout} fetchTasks={App.fetchTasks} /> : <Navigate to="/login" />} />
          <Route path="/calendar" element={user ? <CalendarPage tasks={tasks} user={user} onLogout={handleLogout} fetchTasks={App.fetchTasks} /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={user ? <Analytics tasks={tasks} user={user} fetchTasks={App.fetchTasks} /> : <Navigate to="/login" />} />
          <Route path="/projects" element={user ? <Projects tasks={tasks} user={user} fetchTasks={App.fetchTasks} /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="/old-about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {user && isMobile && (
        <nav className="mobileMenu">
          <a href="/dashboard" className="mobileMenuItem">
            <span className="mobileMenuIcon">🏠</span>
            <span>Home</span>
          </a>
          <a href="/add-task" className="mobileMenuItem">
            <span className="mobileMenuIcon">➕</span>
            <span>New</span>
          </a>
          <a href="/task-tracking" className="mobileMenuItem">
            <span className="mobileMenuIcon">📋</span>
            <span>Tasks</span>
          </a>
          <a href="/calendar" className="mobileMenuItem">
            <span className="mobileMenuIcon">📅</span>
            <span>Calendar</span>
          </a>
          <a href="/analytics" className="mobileMenuItem">
            <span className="mobileMenuIcon">📊</span>
            <span>Analytics</span>
          </a>
          <a href="/projects" className="mobileMenuItem">
            <span className="mobileMenuIcon">📁</span>
            <span>Projects</span>
          </a>
        </nav>
      )}
    </div>
  );
}

export default App;