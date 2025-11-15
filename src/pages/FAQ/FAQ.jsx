import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernNavbar } from '../../components/ModernNavbar';
import styles from './FAQ.module.css';

// Icons
const ChevronDownIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const HelpCircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
    </svg>
);

const FAQ = () => {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    const faqData = [
        {
            question: "What is Planify?",
            answer: "Planify is a modern task management and productivity platform designed to help individuals and teams organize their work, collaborate effectively, and achieve their goals faster. We combine powerful features with an intuitive interface to make productivity enjoyable."
        },
        {
            question: "How do I get started with Planify?",
            answer: "Getting started is simple! Click the 'Get Started' button, create your free account, and you'll be guided through a quick setup process. You can start creating tasks, organizing projects, and inviting team members right away."
        },
        {
            question: "Is Planify free to use?",
            answer: "Yes! Planify offers a generous free plan that includes core task management features, basic collaboration tools, and up to 5 team members. We also offer premium plans with advanced features for growing teams and organizations."
        },
        {
            question: "Can I use Planify with my team?",
            answer: "Absolutely! Planify is built for both individual productivity and team collaboration. You can create shared projects, assign tasks to team members, track progress together, and communicate seamlessly within the platform."
        },
        {
            question: "What devices and platforms does Planify support?",
            answer: "Planify works on all modern web browsers and is fully responsive for mobile devices. We're also working on dedicated mobile apps for iOS and Android, which will be available soon."
        },
        {
            question: "How secure is my data with Planify?",
            answer: "Security is our top priority. We use industry-standard encryption, secure data centers, and regular security audits to protect your information. Your data is backed up regularly and we never share it with third parties."
        },
        {
            question: "Can I integrate Planify with other tools?",
            answer: "Yes! Planify integrates with popular tools like Google Calendar, Slack, Trello, and many others. We're constantly adding new integrations based on user feedback and requests."
        },
        {
            question: "What if I need help or have questions?",
            answer: "We're here to help! You can reach out through our contact page, check our help documentation, or use the in-app support chat. Our team typically responds within 24 hours."
        },
        {
            question: "Can I export my data from Planify?",
            answer: "Yes, you own your data! You can export your tasks, projects, and other data at any time in various formats including CSV, JSON, and PDF. We believe in data portability and transparency."
        },
        {
            question: "How often do you update Planify?",
            answer: "We release updates regularly, typically every 2-3 weeks. These include new features, improvements, and bug fixes based on user feedback. Major feature releases happen monthly."
        }
    ];

    return (
        <div className={styles.faqContainer}>
            <ModernNavbar />

            {/* Hero Section */}
            <motion.section
                className={styles.faqHero}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <motion.div
                                className={styles.heroIcon}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                            >
                                <HelpCircleIcon className={styles.heroIconSvg} />
                            </motion.div>
                            <motion.h1
                                className={styles.heroTitle}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Frequently Asked Questions
                            </motion.h1>
                            <motion.p
                                className={styles.heroSubtitle}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Find answers to common questions about Planify and how to get the most out of our platform
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section
                className={styles.faqSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className={styles.faqList}>
                                {faqData.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className={styles.faqItem}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                    >
                                        <motion.button
                                            className={`${styles.faqQuestion} ${openItems.has(index) ? styles.active : ''}`}
                                            onClick={() => toggleItem(index)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span>{item.question}</span>
                                            <motion.div
                                                animate={{ rotate: openItems.has(index) ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDownIcon className={styles.chevronIcon} />
                                            </motion.div>
                                        </motion.button>

                                        <AnimatePresence>
                                            {openItems.has(index) && (
                                                <motion.div
                                                    className={styles.faqAnswer}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className={styles.faqAnswerContent}>
                                                        {item.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
                className={styles.contactSection}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-6">
                            <h3 className={styles.contactTitle}>Still have questions?</h3>
                            <p className={styles.contactText}>
                                Can't find the answer you're looking for? Our support team is here to help.
                            </p>
                            <motion.button
                                className={styles.contactButton}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = '/contact'}
                            >
                                Contact Support
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default FAQ;