import React from 'react';
import { motion } from 'framer-motion';
import { ModernNavbar } from '../../components/ModernNavbar';
import styles from './Features.module.css';

// SVG Icons Components
const CheckIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

const ClipboardIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
);

const CalendarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
    </svg>
);

const TrendingUpIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
        <polyline points="16,7 22,7 22,13" />
    </svg>
);

const BellIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

const UsersIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const SmartphoneIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
    </svg>
);

const ShieldIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
);

const ZapIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
);

const PaletteIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
);

const Features = () => {
    return (
        <div className={styles.featuresContainer}>
            {/* Modern Navbar */}
            <ModernNavbar />

            {/* Features Hero Section */}
            <motion.section
                className={styles.featuresHero}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Floating Background Elements - Only in Hero */}
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
                        <ClipboardIcon className={styles.floatIcon} />
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
                        <BellIcon className={styles.floatIcon} />
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
                        <CalendarIcon className={styles.floatIcon} />
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
                        <ZapIcon className={styles.floatIcon} />
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
                        <UsersIcon className={styles.floatIcon} />
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
                        <TrendingUpIcon className={styles.floatIcon} />
                    </motion.div>
                </div>

                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                                className={styles.heroIconContainer}
                            >
                                <ZapIcon className={styles.heroIcon} />
                            </motion.div>
                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Powerful Features
                            </motion.h1>
                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Everything you need to manage tasks, boost productivity, and achieve your goals
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Task Management Section */}
            <motion.section
                className={styles.featureSection}
                id="task-management"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <motion.div
                            className="col-lg-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className={styles.sectionTitle}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Smart Task Management
                            </motion.h2>
                            <motion.p
                                className={styles.sectionText}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Organize your tasks with our intuitive interface. Create, assign, and track tasks
                                with ease. Set priorities, deadlines, and get notifications to stay on top of everything.
                            </motion.p>
                            <motion.ul
                                className={styles.featureList}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                {[
                                    "Create and organize tasks effortlessly",
                                    "Set priorities and deadlines",
                                    "Assign tasks to team members",
                                    "Track progress in real-time"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <CheckIcon className={styles.checkIcon} /> {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                        <motion.div
                            className="col-lg-6"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.featureImage}>
                                <motion.div
                                    className={styles.imagePlaceholder}
                                    whileHover={{ scale: 1.05, rotateY: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    >
                                        <ClipboardIcon className={styles.placeholderIcon} />
                                    </motion.div>
                                    <p>Task Management</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Calendar Integration Section */}
            <motion.section
                className={styles.featureSection}
                id="calendar"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <motion.div
                            className="col-lg-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.featureImage}>
                                <motion.div
                                    className={styles.imagePlaceholder}
                                    whileHover={{ scale: 1.05, rotateY: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <CalendarIcon className={styles.placeholderIcon} />
                                    </motion.div>
                                    <p>Calendar Integration</p>
                                </motion.div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="col-lg-6"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className={styles.sectionTitle}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Calendar Integration
                            </motion.h2>
                            <motion.p
                                className={styles.sectionText}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                Never miss a deadline with our built-in calendar. View all your tasks and deadlines
                                in one place, sync with external calendars, and get reminders when you need them.
                            </motion.p>
                            <motion.ul
                                className={styles.featureList}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                {[
                                    "Visual calendar view of all tasks",
                                    "Sync with Google Calendar & Outlook",
                                    "Smart reminders and notifications",
                                    "Drag and drop scheduling"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <CheckIcon className={styles.checkIcon} /> {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Progress Tracking Section */}
            <motion.section
                className={styles.featureSection}
                id="tracking"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <motion.div
                            className="col-lg-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className={styles.sectionTitle}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Progress Tracking
                            </motion.h2>
                            <motion.p
                                className={styles.sectionText}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                Monitor your productivity with detailed analytics and reports. See how you're
                                performing, identify bottlenecks, and optimize your workflow for better results.
                            </motion.p>
                            <motion.ul
                                className={styles.featureList}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                {[
                                    "Detailed productivity analytics",
                                    "Progress reports and insights",
                                    "Time tracking capabilities",
                                    "Performance optimization tips"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <CheckIcon className={styles.checkIcon} /> {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                        <motion.div
                            className="col-lg-6"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.featureImage}>
                                <motion.div
                                    className={styles.imagePlaceholder}
                                    whileHover={{ scale: 1.05, rotateY: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        animate={{
                                            y: [-5, 5, -5],
                                            rotate: [0, 2, -2, 0]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <TrendingUpIcon className={styles.placeholderIcon} />
                                    </motion.div>
                                    <p>Progress Tracking</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* All Features Grid */}
            <motion.section
                className={styles.allFeaturesSection}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="container">
                    <motion.div
                        className="row text-center mb-5"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="col">
                            <h2 className={styles.sectionTitle}>All Features</h2>
                            <p className={styles.sectionSubtitle}>
                                Discover everything Planify has to offer
                            </p>
                        </div>
                    </motion.div>
                    <div className="row">
                        {[
                            { icon: BellIcon, title: "Smart Notifications", desc: "Get notified about important deadlines and updates" },
                            { icon: UsersIcon, title: "Team Collaboration", desc: "Work together seamlessly with your team members" },
                            { icon: SmartphoneIcon, title: "Mobile Responsive", desc: "Access your tasks anywhere, on any device" },
                            { icon: ShieldIcon, title: "Secure & Private", desc: "Your data is protected with enterprise-grade security" },
                            { icon: ZapIcon, title: "Lightning Fast", desc: "Optimized for speed and performance" },
                            { icon: PaletteIcon, title: "Customizable", desc: "Personalize your workspace to match your style" }
                        ].map((feature, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <motion.div
                                    className={styles.featureCard}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.4 + index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -10,
                                        rotateY: 5,
                                        transition: { duration: 0.3 }
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        whileHover={{
                                            rotate: [0, -10, 10, 0],
                                            scale: 1.2
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <feature.icon className={styles.featureIcon} />
                                    </motion.div>
                                    <h4>{feature.title}</h4>
                                    <p>{feature.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Features;