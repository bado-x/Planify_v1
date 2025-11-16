import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { startOfDay, endOfDay, isSameDay, isSameWeek, isSameMonth, addDays, subDays, startOfMonth } from 'date-fns';
import { FiCalendar, FiClock, FiGrid, FiCheckCircle } from 'react-icons/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Calendar.module.css';
import { taskApi } from '../services/api';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

function mapTasksToEvents(tasks) {
  return tasks.map((task) => {
    const start = task.createdAt ? new Date(task.createdAt) : new Date();
    const end = start;
    return {
      id: task._id,
      title: task.title,
      start,
      end,
      desc: task.description,
      status: task.status,
      createdAt: task.createdAt,
    };
  });
}

const eventStyleGetter = (event) => {
  let bgColor = '#F5F5DC';
  let borderColor = '#2F0C33';

  if (event.status === 'done') {
    bgColor = '#50C878';
    borderColor = '#3A9B5E';
  } else if (event.status === 'in-progress') {
    bgColor = '#4A90E2';
    borderColor = '#357ABD';
  } else if (event.status === 'pending') {
    bgColor = '#FFA500';
    borderColor = '#E69400';
  }

  return {
    style: {
      backgroundColor: bgColor,
      borderRadius: '8px',
      color: '#ffffff',
      border: `2px solid ${borderColor}`,
      fontWeight: 600,
      fontSize: 14,
      boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
      padding: '4px 8px',
    },
  };
};

const CustomEventWrapper = ({ event, children }) => {
  const time = event.createdAt ? format(new Date(event.createdAt), 'HH:mm') : '';
  return (
    <div title={`${event.title}${time ? ` - Added: ${time}` : ''}${event.desc ? `\n${event.desc}` : ''}`}>
      {children}
    </div>
  );
};

const CalendarPage = ({ tasks = [], user, onLogout, fetchTasks }) => {
  const navigate = useNavigate();
  const [localTasks, setLocalTasks] = useState(tasks);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sync with parent tasks prop
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // Refresh tasks periodically and on focus
  useEffect(() => {
    if (!user || !user.id) return;

    const refreshTasks = async () => {
      try {
        const updatedTasks = await taskApi.fetchTasks(user.id);
        setLocalTasks(updatedTasks);
      } catch (error) {
        console.error('Failed to refresh tasks:', error);
      }
    };

    // Refresh on mount
    refreshTasks();

    // Refresh when window gains focus (user returns from adding task)
    const handleFocus = () => {
      refreshTasks();
    };

    // Refresh when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshTasks();
      }
    };

    // Set up interval to check for updates every 3 seconds
    const intervalId = setInterval(refreshTasks, 3000);

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const events = useMemo(() => mapTasksToEvents(localTasks), [localTasks]);

  const filteredEvents = useMemo(() => {
    if (statusFilter === 'all') return events;
    return events.filter(event => event.status === statusFilter);
  }, [events, statusFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const today = startOfDay(new Date());
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const monthStart = startOfMonth(new Date());

    return {
      today: events.filter(e => isSameDay(new Date(e.start), today)).length,
      thisWeek: events.filter(e => {
        const eventDate = new Date(e.start);
        return eventDate >= weekStart && eventDate <= today;
      }).length,
      thisMonth: events.filter(e => {
        const eventDate = new Date(e.start);
        return eventDate >= monthStart && eventDate <= today;
      }).length,
      total: events.length,
      pending: events.filter(e => e.status === 'pending').length,
      inProgress: events.filter(e => e.status === 'in-progress').length,
      done: events.filter(e => e.status === 'done').length,
    };
  }, [events]);

  const handleSelectEvent = (event) => {
    // Navigate to edit task or show details
    navigate(`/edit-task/${event.id}`);
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
    setSelectedDate(date);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const goToPrevious = () => {
    if (view === 'month') {
      setCurrentDate(addDays(currentDate, -30));
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  const goToNext = () => {
    if (view === 'month') {
      setCurrentDate(addDays(currentDate, 30));
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundPattern}></div>

      <div className={styles.contentWrapper}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Task Calendar</h1>
            <p className={styles.subtitle}>View and manage your tasks on the calendar</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiCalendar size={28} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.today}</div>
              <div className={styles.statLabel}>Today</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiClock size={28} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.thisWeek}</div>
              <div className={styles.statLabel}>This Week</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiGrid size={28} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.thisMonth}</div>
              <div className={styles.statLabel}>This Month</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiCheckCircle size={28} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.total}</div>
              <div className={styles.statLabel}>Total Tasks</div>
            </div>
          </div>
        </div>

        {/* Status Filter and Controls */}
        <div className={styles.controlsBar}>
          <div className={styles.viewControls}>
            <button
              className={`${styles.viewButton} ${view === 'month' ? styles.active : ''}`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button
              className={`${styles.viewButton} ${view === 'week' ? styles.active : ''}`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button
              className={`${styles.viewButton} ${view === 'day' ? styles.active : ''}`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>

          <div className={styles.navigationControls}>
            <button className={styles.navButton} onClick={goToPrevious}>‹</button>
            <button className={styles.todayButton} onClick={goToToday}>Today</button>
            <button className={styles.navButton} onClick={goToNext}>›</button>
          </div>

          <div className={styles.filterControls}>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* Calendar */}
        <div className={styles.calendarWrapper}>
          <BigCalendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            date={currentDate}
            onNavigate={handleNavigate}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            components={{
              event: ({ event }) => (
                <div className={styles.eventContent}>
                  <div className={styles.eventTitle}>{event.title}</div>
                  {event.desc && (
                    <div className={styles.eventDesc}>{event.desc.substring(0, 30)}{event.desc.length > 30 ? '...' : ''}</div>
                  )}
                </div>
              ),
              eventWrapper: CustomEventWrapper,
            }}
            className={styles.calendar}
          />
        </div>

        {/* Status Legend */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: '#FFA500' }}></div>
            <span>Pending</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: '#4A90E2' }}></div>
            <span>In Progress</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: '#50C878' }}></div>
            <span>Done</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
