import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ModernNavbar } from '../../components/ModernNavbar';
import styles from './About.module.css';

// Icons Components
const ChartIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
    </svg>
);

const TargetIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

const EyeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const RocketIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const HandshakeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
        <path d="m21 3 1 11h-2" />
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
        <path d="M3 4h8" />
    </svg>
);

const LightbulbIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 12 2c-3.3 0-6 2.7-6 6 0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
    </svg>
);

const FocusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6" />
        <path d="m21 12-6 0m-6 0-6 0" />
    </svg>
);

const About = () => {
    const navigate = useNavigate();
    const [typingText, setTypingText] = useState('');
    const [activePopup, setActivePopup] = useState(null);
    const fullText = "Building the future of productivity, one feature at a time.";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setTypingText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 30);

        return () => clearInterval(timer);
    }, []);

    const popupContent = {
        journey: {
            title: "Our Journey",
            icon: <ChartIcon className={styles.popupIcon} />,
            content: (
                <div>
                    <p>Planify was born from a simple observation: most productivity tools are either too complex or too simple. We wanted to create something that grows with you - intuitive for beginners, powerful for experts.</p>
                    <p>Founded in 2024, our mission is to help people and teams transform their productivity by providing tools that actually make work more enjoyable, not more complicated.</p>
                    <div className={styles.popupStats}>
                        <div className={styles.popupStat}>
                            <span className={styles.popupStatNumber}>10K+</span>
                            <span className={styles.popupStatLabel}>Users</span>
                        </div>
                        <div className={styles.popupStat}>
                            <span className={styles.popupStatNumber}>50+</span>
                            <span className={styles.popupStatLabel}>Countries</span>
                        </div>
                        <div className={styles.popupStat}>
                            <span className={styles.popupStatNumber}>99%</span>
                            <span className={styles.popupStatLabel}>Satisfaction</span>
                        </div>
                    </div>
                </div>
            )
        },
        mission: {
            title: "Mission & Vision",
            icon: <TargetIcon className={styles.popupIcon} />,
            content: (
                <div>
                    <div className={styles.popupSection}>
                        <h4>Our Mission</h4>
                        <p>To democratize productivity by creating tools that are powerful enough for professionals yet simple enough for anyone to use effectively. We believe that when people have the right tools, they can achieve extraordinary things.</p>
                    </div>
                    <div className={styles.popupSection}>
                        <h4>Our Vision</h4>
                        <p>To become the world's most intuitive and powerful productivity platform, enabling millions of people to achieve their goals and unlock their full potential.</p>
                    </div>
                </div>
            )
        },
        values: {
            title: "Our Values",
            icon: <LightbulbIcon className={styles.popupIcon} />,
            content: (
                <div className={styles.popupValues}>
                    <div className={styles.popupValue}>
                        <RocketIcon className={styles.popupValueIcon} />
                        <div>
                            <h5>Innovation</h5>
                            <p>Always pushing boundaries to create better solutions for modern teams</p>
                        </div>
                    </div>
                    <div className={styles.popupValue}>
                        <HandshakeIcon className={styles.popupValueIcon} />
                        <div>
                            <h5>Collaboration</h5>
                            <p>Building tools that bring people together and enhance teamwork</p>
                        </div>
                    </div>
                    <div className={styles.popupValue}>
                        <LightbulbIcon className={styles.popupValueIcon} />
                        <div>
                            <h5>Simplicity</h5>
                            <p>Making complex workflows beautifully simple and intuitive</p>
                        </div>
                    </div>
                    <div className={styles.popupValue}>
                        <FocusIcon className={styles.popupValueIcon} />
                        <div>
                            <h5>Focus</h5>
                            <p>Helping users stay focused on what matters most to them</p>
                        </div>
                    </div>
                </div>
            )
        }
    };

    return (
        <div className={styles.aboutContainer}>
            {/* Global Floating Elements */}
            <div className={styles.floatingElements}>
                <motion.div
                    className={styles.floatingIcon}
                    animate={{
                        y: [-10, 10, -10],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ top: "15%", left: "8%" }}
                >
                    <RocketIcon className={styles.floatIcon} />
                </motion.div>

                <motion.div
                    className={styles.floatingIcon}
                    animate={{
                        y: [10, -10, 10],
                        rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    style={{ top: "25%", right: "12%" }}
                >
                    <LightbulbIcon className={styles.floatIcon} />
                </motion.div>

                <motion.div
                    className={styles.floatingIcon}
                    animate={{
                        y: [-5, 15, -5],
                        rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    style={{ top: "45%", left: "15%" }}
                >
                    <TargetIcon className={styles.floatIcon} />
                </motion.div>

                <motion.div
                    className={styles.floatingIcon}
                    animate={{
                        y: [8, -8, 8],
                        rotate: [0, -3, 3, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    style={{ top: "60%", right: "20%" }}
                >
                    <HandshakeIcon className={styles.floatIcon} />
                </motion.div>

                <motion.div
                    className={styles.floatingIcon}
                    animate={{
                        y: [-12, 12, -12],
                        rotate: [0, 4, -4, 0],
                    }}
                    transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5
                    }}
                    style={{ top: "75%", left: "25%" }}
                >
                    <FocusIcon className={styles.floatIcon} />
                </motion.div>

                <motion.div
                    className={styles.floatingIcon}
                    animate={{
                        y: [6, -6, 6],
                        rotate: [0, -2, 2, 0],
                    }}
                    transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.8
                    }}
                    style={{ top: "35%", left: "85%" }}
                >
                    <ChartIcon className={styles.floatIcon} />
                </motion.div>

                <motion.div
                    className={styles.floatingIcon}
                    animate={{
                        y: [-8, 8, -8],
                        rotate: [0, 6, -6, 0],
                    }}
                    transition={{
                        duration: 4.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2.5
                    }}
                    style={{ top: "80%", right: "8%" }}
                >
                    <EyeIcon className={styles.floatIcon} />
                </motion.div>
            </div>

            {/* Modern Navbar */}
            <ModernNavbar />

            {/* Animated Hero Section */}
            <section className={styles.animatedHero}>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-10">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <h1 className={styles.animatedTitle}>
                                    {["DISCOVER", "PLANIFY"].map((word, wordIndex) => (
                                        <span key={wordIndex} className={styles.titleWord}>
                                            {word.split("").map((letter, letterIndex) => (
                                                <motion.span
                                                    key={`${wordIndex}-${letterIndex}`}
                                                    initial={{ y: 100, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{
                                                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                                                        type: "spring",
                                                        stiffness: 150,
                                                        damping: 25,
                                                    }}
                                                    className={styles.titleLetter}
                                                >
                                                    {letter}
                                                </motion.span>
                                            ))}
                                        </span>
                                    ))}
                                </h1>



                                {/* About Navigation */}
                                <motion.div
                                    className={styles.aboutNavigation}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
                                >
                                    <motion.div
                                        className={styles.navItem}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        onClick={() => setActivePopup('journey')}
                                    >
                                        <div className={styles.navIcon}>
                                            <ChartIcon className={styles.navIconSvg} />
                                        </div>
                                        <span>Our Journey</span>
                                    </motion.div>

                                    <motion.div
                                        className={styles.navItem}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        onClick={() => setActivePopup('mission')}
                                    >
                                        <div className={styles.navIcon}>
                                            <TargetIcon className={styles.navIconSvg} />
                                        </div>
                                        <span>Mission & Vision</span>
                                    </motion.div>

                                    <motion.div
                                        className={styles.navItem}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        onClick={() => setActivePopup('values')}
                                    >
                                        <div className={styles.navIcon}>
                                            <LightbulbIcon className={styles.navIconSvg} />
                                        </div>
                                        <span>Our Values</span>
                                    </motion.div>
                                </motion.div>

                                {/* Typing Quote */}
                                <motion.div
                                    className={styles.typingContainer}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 2.2 }}
                                >
                                    <p className={styles.typingText}>
                                        "{typingText}"
                                        <span className={styles.cursor}>|</span>
                                    </p>
                                    <p className={styles.quoteAuthor}>- The Planify Team</p>
                                </motion.div>

                                {/* Scroll Indicator */}
                                <motion.div
                                    className={styles.scrollIndicator}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 2.8 }}
                                >
                                    <motion.div
                                        className={styles.scrollArrow}
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        ↑
                                    </motion.div>
                                    <span>Click above to explore our story</span>
                                </motion.div>




                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popup Modal */}
            <AnimatePresence>
                {activePopup && (
                    <motion.div
                        className={styles.popupOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActivePopup(null)}
                    >
                        <motion.div
                            className={styles.popupContent}
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.popupClose}
                                onClick={() => setActivePopup(null)}
                            >
                                ×
                            </button>
                            <div className={styles.popupHeader}>
                                {popupContent[activePopup]?.icon}
                                <h3>{popupContent[activePopup]?.title}</h3>
                            </div>
                            <div className={styles.popupBody}>
                                {popupContent[activePopup]?.content}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default About;