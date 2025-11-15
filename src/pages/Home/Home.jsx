import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spinner, Alert, Card, Button } from 'react-bootstrap';
import { taskApi } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import ExpandableTaskCard from '../../components/ExpandableTaskCard';
import styles from './Home.module.css';

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user && user.id) {
          const data = await taskApi.fetchTasks(user.id);
          setTasks(data);
          setFilteredTasks(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get('search') || '';
    setSearchTerm(term);

    if (term && term.trim()) {
      const searchLower = term.toLowerCase().trim();
      const filtered = tasks.filter(task =>
        (task.title && task.title.toLowerCase().includes(searchLower)) ||
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [location.search, tasks]);

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskApi.deleteTask(taskId);
        setTasks(tasks.filter(task => task._id !== taskId));
        setFilteredTasks(filteredTasks.filter(task => task._id !== taskId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return (
    <div className={styles.loading}>
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="m-3">
      Error: {error}
    </Alert>
  );

  return (
    <div className={styles.pageContainer}>
      <Navbar user={user} onLogout={onLogout} />

      <div className={styles.taskContainer}>
        <div className={styles.contentWrapper}>
          {/* Tasks Section */}
          <div className={styles.tasksSection}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className={styles.pageTitle}>My Tasks</h2>
              <Button
                variant="success"
                onClick={() => navigate('/add-task')}
                className={styles.addButton}
                style={{ background: 'linear-gradient(135deg, #F5F5DC, #E6E6FA)', borderColor: '#F5F5DC', color: '#2F0C33' }}
              >
                <i className="bi bi-plus-lg me-1"></i> Add New Task
              </Button>
            </div>

            {searchTerm && (
              <div className="mb-3">
                <span className="text-muted">
                  Showing results for: <strong>"{searchTerm}"</strong>
                </span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="ms-2"
                >
                  Clear search
                </Button>
              </div>
            )}

            {filteredTasks.length === 0 ? (
              <Card className="text-center p-4">
                <Card.Body>
                  <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  <h5 className="mt-3">
                    {searchTerm ? 'No tasks match your search' : 'No tasks found'}
                  </h5>
                  <p className="text-muted">
                    {searchTerm ? 'Try a different search term' : 'Create your first task to get started'}
                  </p>
                  {!searchTerm && (
                    <Button
                      variant="success"
                      onClick={() => navigate('/add-task')}
                      style={{ background: 'linear-gradient(135deg, #F5F5DC, #E6E6FA)', borderColor: '#F5F5DC', color: '#2F0C33' }}
                    >
                      Create Task
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ) : (
              <ExpandableTaskCard tasks={filteredTasks} onDelete={handleDelete} />
            )}
          </div>

          {/* Sidebar Section */}
          <div className={styles.sidebarSection}>
            {/* Stats Card */}
            <div className={styles.statsCard}>
              <h3>Task Statistics</h3>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Total Tasks</span>
                <span className={styles.statValue}>{tasks.length}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Completed</span>
                <span className={styles.statValue} style={{ color: '#90EE90' }}>
                  {tasks.filter(t => t.status === 'done').length}
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>In Progress</span>
                <span className={styles.statValue} style={{ color: '#FFD700' }}>
                  {tasks.filter(t => t.status === 'in-progress').length}
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Pending</span>
                <span className={styles.statValue} style={{ color: '#FFA07A' }}>
                  {tasks.filter(t => t.status === 'pending').length}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <h3>Quick Actions</h3>
              <button
                className={styles.actionButton}
                onClick={() => navigate('/add-task')}
              >
                <i className="bi bi-plus-circle"></i>
                Add New Task
              </button>
              <button
                className={styles.actionButton}
                onClick={() => navigate('/calendar')}
              >
                <i className="bi bi-calendar"></i>
                View Calendar
              </button>
              <button
                className={styles.actionButton}
                onClick={() => navigate('/task-tracking')}
              >
                <i className="bi bi-graph-up"></i>
                Task Tracking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;