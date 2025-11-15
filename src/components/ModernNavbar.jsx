import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import styles from "./ModernNavbar.module.css";

export function ModernNavbar() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setActive(null); // Close any open dropdowns when hiding
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Fixed Header with Logo and CTA */}
      <div className={styles.fixedHeader}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src={Logo} alt="Planify Logo" className={styles.logoIcon} />
          <span className={styles.logoText}>Planify</span>
        </div>

        {/* CTA Button */}
        <Button
          className={styles.ctaButton}
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
      </div>

      {/* Smart Navbar Menu */}
      <div className={`${styles.scrollingNavbar} ${isVisible ? styles.visible : styles.hidden}`}>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Home">
            <div className={styles.navbarLinksColumn}>
              <HoveredLink href="/" setActive={setActive}>Home Page</HoveredLink>
              <HoveredLink href="/login" setActive={setActive}>Get Started</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="About">
            <div className={styles.navbarLinksColumn}>
              <HoveredLink href="/about" setActive={setActive}>Discover Us</HoveredLink>
              <HoveredLink href="/faq" setActive={setActive}>FAQ</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Features">
            <div className={styles.navbarLinksColumn}>
              <HoveredLink href="/features" setActive={setActive}>All Features</HoveredLink>
              <HoveredLink href="/features#task-management" setActive={setActive}>Task Management</HoveredLink>
              <HoveredLink href="/features#calendar" setActive={setActive}>Calendar Integration</HoveredLink>
              <HoveredLink href="/features#tracking" setActive={setActive}>Progress Tracking</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Contact">
            <div className={styles.navbarLinksColumn}>
              <HoveredLink href="/contact" setActive={setActive}>Contact Us</HoveredLink>
              <HoveredLink href="/contact#support" setActive={setActive}>Support</HoveredLink>
              <HoveredLink href="/contact#feedback" setActive={setActive}>Send Feedback</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}