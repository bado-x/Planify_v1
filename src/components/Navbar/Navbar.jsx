import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { BiUserCircle, BiPlusCircle, BiLogOut } from 'react-icons/bi';
import { format } from 'date-fns';

const CustomNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const currentDate = format(new Date(), 'EEEE, d MMMM');

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className={styles.navbarCustom}>
      <div className={styles.leftSection}>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img
            src="Logo.svg"
            alt="Logo"
            className={styles.logo} />
        </div>
        <span
          className={styles.logoText}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Planify
        </span>
      </div>

      <div className={styles.rightSectionCustom}>
        <span className={styles.dateTextCustom}>{currentDate}</span>
        {user ? (
          <div className={styles.profileDropdown} ref={profileRef}>
            <span className={styles.profileName} onClick={() => setProfileOpen((v) => !v)}>{user.name}</span>
            <BiUserCircle size={24} className={styles.profileIcon} onClick={() => setProfileOpen((v) => !v)} />
            <div className={`${styles.profileMenu} ${profileOpen ? styles.show : ''}`}>
              <button onClick={() => { setProfileOpen(false); navigate('/add-task'); }} className={styles.profileMenuItem}>
                <BiPlusCircle className="me-2" /> Add Task
              </button>
              <button onClick={() => { setProfileOpen(false); handleLogout(); }} className={styles.profileMenuItemLogout}>
                <BiLogOut className="me-2" /> Logout
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <button
              className={styles.authButtonOutline}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <button
              className={styles.authButton}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNavbar;