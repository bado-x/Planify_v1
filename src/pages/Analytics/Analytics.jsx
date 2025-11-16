import React, { useState, useMemo } from 'react';
import styles from './Analytics.module.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    BiTrendingUp, BiTrendingDown, BiTask, BiCheckCircle,
    BiTime, BiUser, BiCalendar, BiFilter
} from 'react-icons/bi';

const Analytics = ({ tasks = [] }) => {
    const [timeRange, setTimeRange] = useState('week');

    // Calculate analytics data from real tasks
    const analyticsData = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Helper function to get date range
        const getDateRange = (days) => {
            const dates = [];
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                dates.push(date);
            }
            return dates;
        };

        // Get tasks by status
        const completedTasks = tasks.filter(t => t.status === 'done');
        const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
        const pendingTasks = tasks.filter(t => t.status === 'pending');

        // Calculate weekly performance
        const weekDates = getDateRange(7);
        const performanceData = weekDates.map((date) => {
            const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
            const dayTasks = tasks.filter(t => {
                const taskDate = new Date(t.createdAt);
                return taskDate.toDateString() === date.toDateString();
            });

            return {
                date: dayName,
                completed: dayTasks.filter(t => t.status === 'done').length,
                pending: dayTasks.filter(t => t.status === 'pending').length,
                overdue: dayTasks.filter(t => t.status === 'in-progress').length,
            };
        });

        // Calculate monthly productivity (last 6 months)
        const productivityData = [];
        for (let i = 5; i >= 0; i--) {
            const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = monthDate.toLocaleString('en', { month: 'short' });

            const monthTasks = tasks.filter(t => {
                const taskDate = new Date(t.createdAt);
                return taskDate.getMonth() === monthDate.getMonth() &&
                    taskDate.getFullYear() === monthDate.getFullYear();
            });

            const completed = monthTasks.filter(t => t.status === 'done').length;
            const total = monthTasks.length;
            const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;

            productivityData.push({
                month: monthName,
                productivity
            });
        }

        // Calculate category distribution (based on task titles/keywords)
        const categoryData = [
            {
                name: 'Development',
                value: tasks.filter(t =>
                    t.title.toLowerCase().includes('dev') ||
                    t.title.toLowerCase().includes('code') ||
                    t.title.toLowerCase().includes('bug') ||
                    t.title.toLowerCase().includes('feature')
                ).length,
                color: '#8B5CF6'
            },
            {
                name: 'Design',
                value: tasks.filter(t =>
                    t.title.toLowerCase().includes('design') ||
                    t.title.toLowerCase().includes('ui') ||
                    t.title.toLowerCase().includes('ux')
                ).length,
                color: '#D4A574'
            },
            {
                name: 'Documentation',
                value: tasks.filter(t =>
                    t.title.toLowerCase().includes('doc') ||
                    t.title.toLowerCase().includes('write') ||
                    t.title.toLowerCase().includes('readme')
                ).length,
                color: '#A78BFA'
            },
            {
                name: 'Meeting',
                value: tasks.filter(t =>
                    t.title.toLowerCase().includes('meet') ||
                    t.title.toLowerCase().includes('call') ||
                    t.title.toLowerCase().includes('discuss')
                ).length,
                color: '#E8D5C4'
            },
            {
                name: 'Other',
                value: tasks.filter(t => {
                    const title = t.title.toLowerCase();
                    return !title.includes('dev') && !title.includes('code') &&
                        !title.includes('design') && !title.includes('ui') &&
                        !title.includes('doc') && !title.includes('meet');
                }).length,
                color: '#C4B5FD'
            },
        ].filter(cat => cat.value > 0);

        // Priority distribution (based on status)
        const priorityData = [
            { name: 'In Progress', value: inProgressTasks.length, color: '#DC2626' },
            { name: 'Pending', value: pendingTasks.length, color: '#F59E0B' },
            { name: 'Completed', value: completedTasks.length, color: '#10B981' },
        ].filter(p => p.value > 0);

        // Calculate previous period stats for comparison
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(lastWeekStart.getDate() - 14);
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);

        const lastWeekTasks = tasks.filter(t => {
            const taskDate = new Date(t.createdAt);
            return taskDate >= lastWeekStart && taskDate < lastWeekEnd;
        });

        const thisWeekTasks = tasks.filter(t => {
            const taskDate = new Date(t.createdAt);
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return taskDate >= weekAgo;
        });

        const calculateChange = (current, previous) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return Math.round(((current - previous) / previous) * 100);
        };

        const completionRate = tasks.length > 0
            ? Math.round((completedTasks.length / tasks.length) * 100)
            : 0;

        const lastWeekCompletionRate = lastWeekTasks.length > 0
            ? Math.round((lastWeekTasks.filter(t => t.status === 'done').length / lastWeekTasks.length) * 100)
            : 0;

        return {
            performanceData,
            productivityData,
            categoryData,
            priorityData,
            stats: {
                totalTasks: tasks.length,
                totalTasksChange: calculateChange(thisWeekTasks.length, lastWeekTasks.length),
                completedTasks: completedTasks.length,
                completedTasksChange: calculateChange(
                    thisWeekTasks.filter(t => t.status === 'done').length,
                    lastWeekTasks.filter(t => t.status === 'done').length
                ),
                inProgressTasks: inProgressTasks.length,
                inProgressTasksChange: calculateChange(
                    thisWeekTasks.filter(t => t.status === 'in-progress').length,
                    lastWeekTasks.filter(t => t.status === 'in-progress').length
                ),
                completionRate,
                completionRateChange: completionRate - lastWeekCompletionRate,
            }
        };
    }, [tasks, timeRange]);

    const { performanceData, productivityData, categoryData, priorityData, stats } = analyticsData;

    // Stats cards data
    const statsCards = [
        {
            title: 'Total Tasks',
            value: stats.totalTasks.toString(),
            change: `${stats.totalTasksChange >= 0 ? '+' : ''}${stats.totalTasksChange}%`,
            trend: stats.totalTasksChange >= 0 ? 'up' : 'down',
            icon: BiTask,
            color: '#8B5CF6'
        },
        {
            title: 'Completed',
            value: stats.completedTasks.toString(),
            change: `${stats.completedTasksChange >= 0 ? '+' : ''}${stats.completedTasksChange}%`,
            trend: stats.completedTasksChange >= 0 ? 'up' : 'down',
            icon: BiCheckCircle,
            color: '#10B981'
        },
        {
            title: 'In Progress',
            value: stats.inProgressTasks.toString(),
            change: `${stats.inProgressTasksChange >= 0 ? '+' : ''}${stats.inProgressTasksChange}%`,
            trend: stats.inProgressTasksChange >= 0 ? 'up' : 'down',
            icon: BiTime,
            color: '#F59E0B'
        },
        {
            title: 'Completion Rate',
            value: `${stats.completionRate}%`,
            change: `${stats.completionRateChange >= 0 ? '+' : ''}${stats.completionRateChange}%`,
            trend: stats.completionRateChange >= 0 ? 'up' : 'down',
            icon: BiTrendingUp,
            color: '#D4A574'
        },
    ];

    return (
        <div className={styles.analyticsContainer}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Analytics Dashboard</h1>
                    <p className={styles.subtitle}>Track your productivity and performance metrics</p>
                </div>
                <div className={styles.filters}>
                    <button
                        className={`${styles.filterBtn} ${timeRange === 'week' ? styles.active : ''}`}
                        onClick={() => setTimeRange('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`${styles.filterBtn} ${timeRange === 'month' ? styles.active : ''}`}
                        onClick={() => setTimeRange('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`${styles.filterBtn} ${timeRange === 'year' ? styles.active : ''}`}
                        onClick={() => setTimeRange('year')}
                    >
                        Year
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                {statsCards.map((stat, index) => (
                    <Card key={index} className={styles.statCard}>
                        <CardContent className={styles.statContent}>
                            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}15` }}>
                                <stat.icon style={{ color: stat.color }} size={24} />
                            </div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>{stat.title}</p>
                                <div className={styles.statValueRow}>
                                    <h3 className={styles.statValue}>{stat.value}</h3>
                                    <span className={`${styles.statChange} ${stat.trend === 'up' ? styles.positive : styles.negative}`}>
                                        {stat.trend === 'up' ? <BiTrendingUp /> : <BiTrendingDown />}
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {tasks.length === 0 ? (
                <Card className={styles.emptyState}>
                    <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
                        <BiTask size={64} style={{ color: '#D4A574', marginBottom: '1rem' }} />
                        <h3 style={{ color: '#8B5CF6', marginBottom: '0.5rem' }}>No Tasks Yet</h3>
                        <p style={{ color: '#6B7280' }}>Start adding tasks to see your analytics and insights</p>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {/* Charts Row 1 */}
                    <div className={styles.chartsRow}>
                        {/* Performance Over Time */}
                        <Card className={styles.chartCard}>
                            <CardHeader>
                                <CardTitle style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2f0c33' }}>Task Performance</CardTitle>
                                <p className={styles.chartSubtitle}>Weekly task completion trends</p>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={performanceData}>
                                        <defs>
                                            <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#D4A574" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#D4A574" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                        <XAxis dataKey="date" stroke="#6B7280" />
                                        <YAxis stroke="#6B7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="completed"
                                            stroke="#8B5CF6"
                                            fill="url(#completedGradient)"
                                            strokeWidth={2}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="pending"
                                            stroke="#D4A574"
                                            fill="url(#pendingGradient)"
                                            strokeWidth={2}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="overdue"
                                            stroke="#DC2626"
                                            fill="none"
                                            strokeWidth={2}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Productivity Trend */}
                        <Card className={styles.chartCard}>
                            <CardHeader>
                                <CardTitle style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2f0c33' }}>Productivity Trend</CardTitle>
                                <p className={styles.chartSubtitle}>Monthly productivity percentage</p>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={productivityData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                        <XAxis dataKey="month" stroke="#6B7280" />
                                        <YAxis stroke="#6B7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="productivity"
                                            stroke="#8B5CF6"
                                            strokeWidth={3}
                                            dot={{ fill: '#8B5CF6', r: 6 }}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Row 2 */}
                    {(categoryData.length > 0 || priorityData.length > 0) && (
                        <div className={styles.chartsRow}>
                            {/* Category Distribution */}
                            {categoryData.length > 0 && (
                                <Card className={styles.chartCard}>
                                    <CardHeader>
                                        <CardTitle style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2f0c33' }}>Tasks by Category</CardTitle>
                                        <p className={styles.chartSubtitle}>Distribution across different categories</p>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={categoryData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {categoryData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Priority Distribution */}
                            {priorityData.length > 0 && (
                                <Card className={styles.chartCard}>
                                    <CardHeader>
                                        <CardTitle style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2f0c33' }}>Status Distribution</CardTitle>
                                        <p className={styles.chartSubtitle}>Tasks breakdown by status</p>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={priorityData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {priorityData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Analytics;
