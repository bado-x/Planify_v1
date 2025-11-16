import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import Logo from "../assets/Logo.svg";
import styles from "./ModernNavbar.module.css";

export function ModernNavbar() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const menuItems = [
    {
      title: 'Home', link: '/', subItems: [
        { label: 'Home Page', link: '/' },
        { label: 'Get Started', link: '/login' }
      ]
    },
    {
      title: 'About', link: '/about', subItems: [
        { label: 'Discover Us', link: '/about' },
        { label: 'FAQ', link: '/faq' }
      ]
    },
    {
      title: 'Features', link: '/features', subItems: [
        { label: 'All Features', link: '/features' },
        { label: 'Task Management', link: '/features' },
        { label: 'Calendar Integration', link: '/features' },
        { label: 'Progress Tracking', link: '/features' }
      ]
    },
    {
      title: 'Contact', link: '/contact', subItems: [
        { label: 'Contact Us', link: '/contact' },
        { label: 'Support', link: '/contact' },
        { label: 'Send Feedback', link: '/contact' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
        </button>

        <div className={styles.mobileLogo} onClick={() => navigate('/')}>
          <img src={Logo} alt="Planify" className={styles.logoIcon} />
          <span className={styles.logoText}>Planify</span>
        </div>

        <Button
          className={styles.mobileLoginBtn}
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`${styles.mobileSidebar} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.sidebarSection}>
              <div
                className={styles.sidebarTitle}
                onClick={() => {
                  navigate(item.link);
                  setMobileMenuOpen(false);
                }}
              >
                {item.title}
              </div>
              <div className={styles.sidebarSubItems}>
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className={styles.sidebarSubItem}
                    onClick={() => {
                      navigate(subItem.link);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Fixed Header with Logo and CTA */}
      <div className={styles.fixedHeader}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => navigate('/')}>
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
          <MenuItem setActive={setActive} active={active} item="Home" href="/">
            <div className={styles.navbarLinksColumn}>
              <HoveredLink href="/" setActive={setActive}>Home Page</HoveredLink>
              <HoveredLink href="/login" setActive={setActive}>Get Started</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="About" href="/about">
            <div className={styles.navbarLinksColumn}>
              <HoveredLink href="/about" setActive={setActive}>Discover Us</HoveredLink>
              <HoveredLink href="/faq" setActive={setActive}>FAQ</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Features" href="/features">
            <div className={styles.navbarLinksColumn}>
              <HoveredLink href="/features" setActive={setActive}>All Features</HoveredLink>
              <HoveredLink href="/features#task-management" setActive={setActive}>Task Management</HoveredLink>
              <HoveredLink href="/features#calendar" setActive={setActive}>Calendar Integration</HoveredLink>
              <HoveredLink href="/features#tracking" setActive={setActive}>Progress Tracking</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Contact" href="/contact">
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