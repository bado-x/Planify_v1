import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import styles from './Landing.module.css';
import Logo from '../../assets/Logo.svg';
import BackgroundPaths from '../../components/BackgroundPaths';
import { ModernNavbar } from '../../components/ModernNavbar';
import AboutSection from '../../components/AboutSection';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landingContainer}>
      {/* Modern Navbar */}
      <ModernNavbar />

      {/* Hero Section with Animated Background */}
      <BackgroundPaths
        title="TRANSFORM YOUR PRODUCTIVITY UNLEASH YOUR POTENTIAL"
        subtitle="Where Ideas Meet Action - Build, Track, Achieve Excellence"
        onGetStarted={() => navigate('/login')}
        onLearnMore={() => navigate('/about')}
      />






    </div>
  );
};

export default Landing;