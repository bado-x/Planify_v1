import React from 'react';
import styles from './Sidebar.module.css';
import { BiHomeAlt, BiFolder, BiTask, BiCalendar, BiMessageSquareDetail, BiCog, BiChat, BiBarChartAlt2, BiFolderOpen } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}></div>
        <span className={styles.logoText}>Planify</span>
      </div>
      <nav className={styles.menu}>
        <ul>
          <li className={location.pathname === '/dashboard' ? styles.active : ''}>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <BiHomeAlt className={styles.icon}/> Home
            </Link>
          </li>
          <li className={location.pathname === '/task-tracking' ? styles.active : ''}>
            <Link to="/task-tracking" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <BiTask className={styles.icon}/> Task Tracking
            </Link>
          </li>
          <li className={location.pathname === '/calendar' ? styles.active : ''}>
            <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <BiCalendar className={styles.icon}/> Calender
            </Link>
          </li>
          <li className={location.pathname === '/analytics' ? styles.active : ''}>
            <Link to="/analytics" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <BiBarChartAlt2 className={styles.icon}/> Analytics
            </Link>
          </li>
          <li className={location.pathname === '/projects' ? styles.active : ''}>
            <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <BiFolderOpen className={styles.icon}/> Projects
            </Link>
          </li>
        </ul>
        <div className={styles.menuLabel}>Another Options</div>
        <ul>
          <li><BiCog className={styles.icon}/> Services</li>
          <li><BiChat className={styles.icon}/> Chat</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 