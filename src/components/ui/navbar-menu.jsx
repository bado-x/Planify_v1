import React, { useState } from "react";
import { motion } from "framer-motion";
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
    }, 200);
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

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div 
      className={styles.navbarMenuItem} 
      onMouseEnter={() => setActive(item)}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className={styles.navbarMenuText}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            mass: 0.5,
            damping: 11.5,
            stiffness: 100,
            restDelta: 0.001,
            restSpeed: 0.001,
          }}
        >
          {active === item && (
            <div 
              className={styles.navbarDropdown}
              onMouseLeave={() => setActive(null)}
            >
              <motion.div
                transition={{ duration: 0.2 }}
                layoutId="active"
                className={styles.navbarDropdownBg}
              />
              <motion.div className={styles.navbarDropdownContent}>
                {children}
              </motion.div>
            </div>
          )}
        </motion.div>
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

export const HoveredLink = ({ children, href, ...rest }) => {
  return (
    <a
      href={href}
      {...rest}
      className={styles.navbarHoveredLink}
    >
      {children}
    </a>
  );
};