import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiCheckCircle, FiTarget, FiAward, FiZap, FiTrendingUp } from 'react-icons/fi';
import TaskStats from '../components/TaskStats';
import Navbar from '../components/Navbar/Navbar';
import styles from './TaskTracking.module.css';

const statusLabels = {
  done: 'Done',
  'in-progress': 'In Progress',
  pending: 'Left This Month',
};

const statusColors = {
  done: '#90EE90',
  'in-progress': '#FFD700',
  pending: '#FFA07A',
};

const TaskTracking = ({ tasks, user, onLogout }) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');

  const filteredTasks = selectedStatus
    ? tasks.filter((t) => t.status === selectedStatus)
    : [];

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Calculate productivity stats
  const today = new Date();
  const thisWeekTasks = tasks.filter(t => {
    const taskDate = new Date(t.createdAt);
    const diffTime = Math.abs(today - taskDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  const completedThisWeek = thisWeekTasks.filter(t => t.status === 'done').length;

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className={styles.container}>
        <TaskStats tasks={tasks} user={user} onCardClick={setSelectedStatus} />

        {/* Insights Row */}
        <div className={styles.insightsRow}>
          <div className={styles.insightCard}>
            <div className={styles.insightIconWrapper}>
              <FiCalendar size={24} />
            </div>
            <div className={styles.insightContent}>
              <div className={styles.insightLabel}>Tasks This Week</div>
              <div className={styles.insightValue}>{thisWeekTasks.length}</div>
            </div>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIconWrapper}>
              <FiCheckCircle size={24} />
            </div>
            <div className={styles.insightContent}>
              <div className={styles.insightLabel}>Completed This Week</div>
              <div className={styles.insightValue}>{completedThisWeek}</div>
            </div>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIconWrapper}>
              <FiTarget size={24} />
            </div>
            <div className={styles.insightContent}>
              <div className={styles.insightLabel}>Productivity Rate</div>
              <div className={styles.insightValue}>
                {thisWeekTasks.length > 0
                  ? Math.round((completedThisWeek / thisWeekTasks.length) * 100)
                  : 0}%
              </div>
            </div>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIconWrapper}>
              <FiTrendingUp size={24} />
            </div>
            <div className={styles.insightContent}>
              <div className={styles.insightLabel}>Total Tasks</div>
              <div className={styles.insightValue}>{tasks.length}</div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className={styles.progressCard}>
          <h3 className={styles.progressTitle}>Progress Overview</h3>

          {/* Completion Rate */}
          <div className={styles.progressItem}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Completion Rate</span>
              <span className={styles.progressValue}>
                {tasks.length > 0
                  ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100)
                  : 0}%
              </span>
            </div>
            <div className={styles.progressBarContainer}>
              <div className={`${styles.progressBar} ${styles.progressBarGreen}`} style={{
                width: `${tasks.length > 0
                  ? (tasks.filter(t => t.status === 'done').length / tasks.length) * 100
                  : 0}%`
              }}></div>
            </div>
          </div>

          {/* Active Tasks */}
          <div className={styles.progressItem}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Active Tasks</span>
              <span className={styles.progressValue}>
                {tasks.length > 0
                  ? Math.round((tasks.filter(t => t.status === 'in-progress').length / tasks.length) * 100)
                  : 0}%
              </span>
            </div>
            <div className={styles.progressBarContainer}>
              <div className={`${styles.progressBar} ${styles.progressBarYellow}`} style={{
                width: `${tasks.length > 0
                  ? (tasks.filter(t => t.status === 'in-progress').length / tasks.length) * 100
                  : 0}%`
              }}></div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className={styles.progressItem}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Pending Tasks</span>
              <span className={styles.progressValue}>
                {tasks.length > 0
                  ? Math.round((tasks.filter(t => t.status === 'pending').length / tasks.length) * 100)
                  : 0}%
              </span>
            </div>
            <div className={styles.progressBarContainer}>
              <div className={`${styles.progressBar} ${styles.progressBarRed}`} style={{
                width: `${tasks.length > 0
                  ? (tasks.filter(t => t.status === 'pending').length / tasks.length) * 100
                  : 0}%`
              }}></div>
            </div>
          </div>

          {/* Motivation Text */}
          <div className={styles.motivationBox}>
            {tasks.filter(t => t.status === 'done').length === tasks.length && tasks.length > 0
              ? <><FiAward size={24} /> All tasks completed! Great job!</>
              : tasks.filter(t => t.status === 'done').length > 0
                ? <><FiZap size={24} /> Keep going! You're making progress!</>
                : <><FiTrendingUp size={24} /> Start completing tasks to see your progress!</>}
          </div>
        </div>

        {/* Filtered Tasks Section */}
        {selectedStatus && (
          <div className={styles.filterSection}>
            <div className={styles.filterHeader}>
              <h3>Showing {statusLabels[selectedStatus]} Tasks</h3>
              <div className={styles.filterControls}>
                <select
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                </select>
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <i className="bi bi-grid-3x3-gap"></i>
                  </button>
                  <button
                    className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                </div>
                <button
                  className={styles.clearButton}
                  onClick={() => setSelectedStatus(null)}
                >
                  Clear Filter
                </button>
              </div>
            </div>
            {sortedTasks.length === 0 ? (
              <p className={styles.noTasks}>No tasks found for this status.</p>
            ) : (
              <div className={viewMode === 'grid' ? styles.taskGrid : styles.taskList}>
                {sortedTasks.map((task) => (
                  <div key={task._id} className={styles.taskCard}>
                    <div className={styles.taskTitle}>{task.title}</div>
                    {task.description && (
                      <div className={styles.taskDescription}>{task.description}</div>
                    )}
                    <div className={styles.taskFooter}>
                      <span
                        className={styles.taskBadge}
                        style={{
                          background: statusColors[selectedStatus] + '22',
                          color: statusColors[selectedStatus],
                        }}
                      >
                        {statusLabels[selectedStatus]}
                      </span>
                      <span className={styles.taskDate}>
                        {task.createdAt ? `Created: ${new Date(task.createdAt).toLocaleDateString()}` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskTracking;
