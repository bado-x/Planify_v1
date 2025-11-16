import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import styles from "./navbar-menu.module.css";

export const Menu = ({ setActive, children }) => {
  const [hoverTimeout, setHoverTimeout] = React.useState(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu when clicking outside
      if (!event.target.closest(`.${styles.navbarMenuContainer}`)) {
        setActive(null);
      }
    };

    const handleEscapeKey = (event) => {
      // Close menu when pressing Escape
      if (event.key === 'Escape') {
        setActive(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setActive]);

  const handleMouseLeave = () => {
    // Add a small delay before closing to prevent flickering
    const timeout = setTimeout(() => {
      setActive(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleMouseEnter = () => {
    // Clear the timeout if mouse re-enters
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  return (
    <nav
      className={styles.navbarMenuContainer}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </nav>
  );
};

export const MenuItem = ({ setActive, active, item, children, href }) => {
  const navigate = useNavigate();
  const isActive = active === item;

  const handleClick = () => {
    if (href) {
      navigate(href);
      setActive(null);
    }
  };

  const handleMouseEnter = () => {
    console.log('Mouse entered:', item);
    setActive(item);
  };

  return (
    <div
      className={styles.navbarMenuItem}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        transition={{ duration: 0.3 }}
        className={styles.navbarMenuText}
        onClick={handleClick}
        style={{ cursor: href ? 'pointer' : 'default' }}
      >
        <span>{item}</span>
        {children && (
          <BiChevronDown
            className={styles.chevronIcon}
            style={{
              transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          />
        )}
      </motion.div>
      {isActive && children && (
        <div className={styles.navbarDropdown}>
          <div className={styles.navbarDropdownBg} />
          <div className={styles.navbarDropdownContent}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <a href={href} className={styles.navbarProductItem}>
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className={styles.navbarProductImage}
      />
      <div>
        <h4 className={styles.navbarProductTitle}>{title}</h4>
        <p className={styles.navbarProductDescription}>{description}</p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, href, setActive, ...rest }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (setActive) {
      setActive(null);
    }
    navigate(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      {...rest}
      className={styles.navbarHoveredLink}
    >
      {children}
    </a>
  );
};