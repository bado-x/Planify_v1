import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Logo from '../assets/Logo.svg';
import styles from './SimpleNavbar.module.css';

export function SimpleNavbar() {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const menuItems = [
        {
            title: 'Home',
            mainLink: '/',
            subItems: [
                { label: 'Home Page', link: '/' },
                { label: 'Get Started', link: '/login' }
            ]
        },
        {
            title: 'About',
            mainLink: '/about',
            subItems: [
                { label: 'About Us', link: '/about' },
                { label: 'FAQ', link: '/faq' }
            ]
        },
        {
            title: 'Features',
            mainLink: '/features',
            subItems: [
                { label: 'All Features', link: '/features' },
                { label: 'Task Management', link: '/features' },
                { label: 'Calendar', link: '/features' }
            ]
        },
        {
            title: 'Contact',
            mainLink: '/contact',
            subItems: [
                { label: 'Contact Us', link: '/contact' },
                { label: 'Support', link: '/contact' }
            ]
        }
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                {/* Logo */}
                <div className={styles.logo} onClick={() => navigate('/')}>
                    <img src={Logo} alt="Planify" className={styles.logoIcon} />
                    <span className={styles.logoText}>Planify</span>
                </div>

                {/* Menu Items */}
                <div className={styles.menuItems}>
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className={styles.menuItem}
                            onMouseEnter={() => setActiveDropdown(item.title)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <span
                                className={styles.menuTitle}
                                onClick={() => navigate(item.mainLink)}
                            >
                                {item.title}
                            </span>

                            {/* Dropdown */}
                            {activeDropdown === item.title && (
                                <div className={styles.dropdown}>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <div
                                            key={subIndex}
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                navigate(subItem.link);
                                                setActiveDropdown(null);
                                            }}
                                        >
                                            {subItem.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Login Button */}
                <Button
                    className={styles.loginButton}
                    onClick={() => navigate('/login')}
                >
                    Log In
                </Button>
            </div>
        </nav>
    );
}
