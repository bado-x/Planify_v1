import React, { useState, useMemo, useEffect } from 'react';
import { taskApi } from '../../services/api';
import styles from './Analytics.module.css';
import { 
  BiBarChartAlt2, 
  BiCheckCircle, 
  BiTime, 
  BiTrendingUp,
  BiLineChart,
  BiCalendar,
  BiTargetLock
} from 'react-icons/bi';
import { 
  format, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  subDays, 
  subMonths,
  isSameDay,
  differenceInDays
} from 'date-fns';

const Analytics = ({ tasks = [], user, fetchTasks }) => {
  const [timeRange, setTimeRange] = useState('month'); // week, month, year
  const [localTasks, setLocalTasks] = useState(tasks);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (user && user.id) {
      const refreshTasks = async () => {
        try {
          const updatedTasks = await taskApi.fetchTasks(user.id);
          setLocalTasks(updatedTasks);
        } catch (error) {
          console.error('Failed to refresh tasks:', error);
        }
      };
      refreshTasks();
    }
  }, [user]);

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date();
    let startDate, endDate;

    switch (timeRange) {
      case 'week':
        startDate = startOfWeek(now, { weekStartsOn: 1 });
        endDate = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case 'month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      default:
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
    }

    const filteredTasks = localTasks.filter(task => {
      if (!task.createdAt) return false;
      const taskDate = new Date(task.createdAt);
      return taskDate >= startDate && taskDate <= endDate;
    });

    const total = filteredTasks.length;
    const pending = filteredTasks.filter(t => t.status === 'pending').length;
    const inProgress = filteredTasks.filter(t => t.status === 'in-progress').length;
    const done = filteredTasks.filter(t => t.status === 'done').length;
    const completionRate = total > 0 ? ((done / total) * 100).toFixed(1) : 0;

    // Calculate average completion time (for done tasks)
    const doneTasks = filteredTasks.filter(t => t.status === 'done' && t.createdAt);
    let avgCompletionDays = 0;
    if (doneTasks.length > 0) {
      const totalDays = doneTasks.reduce((sum, task) => {
        const created = new Date(task.createdAt);
        const completed = task.updatedAt ? new Date(task.updatedAt) : new Date();
        return sum + differenceInDays(completed, created);
      }, 0);
      avgCompletionDays = Math.round(totalDays / doneTasks.length);
    }

    // Most productive day
    const dayCounts = {};
    filteredTasks.forEach(task => {
      if (task.createdAt) {
        const day = format(new Date(task.createdAt), 'EEEE');
        dayCounts[day] = (dayCounts[day] || 0) + 1;
      }
    });
    const mostProductiveDay = Object.keys(dayCounts).reduce((a, b) => 
      dayCounts[a] > dayCounts[b] ? a : b, 'Monday'
    ) || 'N/A';

    // Task distribution
    const distribution = {
      pending: ((pending / total) * 100).toFixed(1) || 0,
      inProgress: ((inProgress / total) * 100).toFixed(1) || 0,
      done: ((done / total) * 100).toFixed(1) || 0,
    };

    return {
      total,
      pending,
      inProgress,
      done,
      completionRate,
      avgCompletionDays,
      mostProductiveDay,
      distribution,
      filteredTasks
    };
  }, [localTasks, timeRange]);

  // Calculate trend data
  const trendData = useMemo(() => {
    const weeks = [];
    const now = new Date();
    
    for (let i = 3; i >= 0; i--) {
      const weekStart = startOfWeek(subDays(now, i * 7), { weekStartsOn: 1 });
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      
      const weekTasks = localTasks.filter(task => {
        if (!task.createdAt) return false;
        const taskDate = new Date(task.createdAt);
        return taskDate >= weekStart && taskDate <= weekEnd;
      });

      weeks.push({
        week: format(weekStart, 'MMM dd'),
        total: weekTasks.length,
        completed: weekTasks.filter(t => t.status === 'done').length,
      });
    }
    
    return weeks;
  }, [localTasks]);

  // Get chart data for visualization
  const getChartData = () => {
    return [
      { name: 'Pending', value: stats.pending, color: '#FFA500' },
      { name: 'In Progress', value: stats.inProgress, color: '#4A90E2' },
      { name: 'Done', value: stats.done, color: '#50C878' },
    ];
  };

  const chartData = getChartData();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Analytics & Insights</h1>
            <p className={styles.subtitle}>Track your productivity and performance metrics</p>
          </div>
          <div className={styles.timeRangeSelector}>
            <button
              className={`${styles.rangeButton} ${timeRange === 'week' ? styles.active : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button
              className={`${styles.rangeButton} ${timeRange === 'month' ? styles.active : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button
              className={`${styles.rangeButton} ${timeRange === 'year' ? styles.active : ''}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>
              <BiBarChartAlt2 />
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{stats.total}</div>
              <div className={styles.metricLabel}>Total Tasks</div>
              <div className={styles.metricChange}>This {timeRange}</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>
              <BiCheckCircle />
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{stats.completionRate}%</div>
              <div className={styles.metricLabel}>Completion Rate</div>
              <div className={styles.metricChange}>{stats.done} completed</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>
              <BiTime />
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{stats.avgCompletionDays}</div>
              <div className={styles.metricLabel}>Avg. Days to Complete</div>
              <div className={styles.metricChange}>Based on done tasks</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon}>
              <BiTrendingUp />
            </div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{stats.mostProductiveDay}</div>
              <div className={styles.metricLabel}>Most Productive Day</div>
              <div className={styles.metricChange}>Peak activity</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className={styles.chartsGrid}>
          {/* Status Distribution Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Status Distribution</h3>
              <p className={styles.chartSubtitle}>Tasks by status</p>
            </div>
            <div className={styles.chartBody}>
              <div className={styles.pieChart}>
                {chartData.map((item, index) => {
                  const percentage = stats.total > 0 ? (item.value / stats.total) * 100 : 0;
                  const circumference = 2 * Math.PI * 45;
                  const offset = circumference - (percentage / 100) * circumference;
                  
                  return (
                    <div key={index} className={styles.pieSegment}>
                      <svg width="120" height="120" className={styles.pieSvg}>
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          fill="none"
                          stroke="#e1e8ed"
                          strokeWidth="20"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          fill="none"
                          stroke={item.color}
                          strokeWidth="20"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          transform="rotate(-90 60 60)"
                          className={styles.pieSlice}
                        />
                      </svg>
                      <div className={styles.pieLabel}>
                        <div className={styles.pieValue}>{item.value}</div>
                        <div className={styles.pieName}>{item.name}</div>
                        <div className={styles.piePercentage}>{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.legend}>
                {chartData.map((item, index) => (
                  <div key={index} className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Productivity Trend */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Productivity Trend</h3>
              <p className={styles.chartSubtitle}>Last 4 weeks</p>
            </div>
            <div className={styles.chartBody}>
              <div className={styles.barChart}>
                {trendData.map((week, index) => {
                  const maxValue = Math.max(...trendData.map(w => w.total), 1);
                  const height = (week.total / maxValue) * 100;
                  const completedHeight = week.total > 0 ? (week.completed / week.total) * 100 : 0;
                  
                  return (
                    <div key={index} className={styles.barGroup}>
                      <div className={styles.barContainer}>
                        <div 
                          className={styles.barBackground}
                          style={{ height: '100%' }}
                        >
                          <div 
                            className={styles.barCompleted}
                            style={{ 
                              height: `${completedHeight}%`,
                              backgroundColor: '#50C878'
                            }}
                          ></div>
                          <div 
                            className={styles.barRemaining}
                            style={{ 
                              height: `${100 - completedHeight}%`,
                              backgroundColor: '#FFA500'
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className={styles.barLabel}>{week.week}</div>
                      <div className={styles.barValue}>{week.total}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <h3>Task Status Breakdown</h3>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Pending</span>
                <span className={styles.statNumber}>{stats.pending}</span>
                <div className={styles.statBar}>
                  <div 
                    className={styles.statBarFill}
                    style={{ 
                      width: `${stats.distribution.pending}%`,
                      backgroundColor: '#FFA500'
                    }}
                  ></div>
                </div>
                <span className={styles.statPercent}>{stats.distribution.pending}%</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>In Progress</span>
                <span className={styles.statNumber}>{stats.inProgress}</span>
                <div className={styles.statBar}>
                  <div 
                    className={styles.statBarFill}
                    style={{ 
                      width: `${stats.distribution.inProgress}%`,
                      backgroundColor: '#4A90E2'
                    }}
                  ></div>
                </div>
                <span className={styles.statPercent}>{stats.distribution.inProgress}%</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Done</span>
                <span className={styles.statNumber}>{stats.done}</span>
                <div className={styles.statBar}>
                  <div 
                    className={styles.statBarFill}
                    style={{ 
                      width: `${stats.distribution.done}%`,
                      backgroundColor: '#50C878'
                    }}
                  ></div>
                </div>
                <span className={styles.statPercent}>{stats.distribution.done}%</span>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <h3>Performance Insights</h3>
            </div>
            <div className={styles.statContent}>
              <div className={styles.insightItem}>
                <div className={styles.insightIcon}>
                  <BiLineChart />
                </div>
                <div className={styles.insightText}>
                  <strong>Completion Rate:</strong> {stats.completionRate}%
                  {stats.completionRate >= 70 ? ' Excellent!' : stats.completionRate >= 50 ? ' Good!' : ' Keep going!'}
                </div>
              </div>
              <div className={styles.insightItem}>
                <div className={styles.insightIcon}>
                  <BiTime />
                </div>
                <div className={styles.insightText}>
                  <strong>Average Time:</strong> {stats.avgCompletionDays} days per task
                </div>
              </div>
              <div className={styles.insightItem}>
                <div className={styles.insightIcon}>
                  <BiCalendar />
                </div>
                <div className={styles.insightText}>
                  <strong>Peak Day:</strong> {stats.mostProductiveDay}
                </div>
              </div>
              <div className={styles.insightItem}>
                <div className={styles.insightIcon}>
                  <BiTargetLock />
                </div>
                <div className={styles.insightText}>
                  <strong>Active Tasks:</strong> {stats.inProgress} in progress
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

