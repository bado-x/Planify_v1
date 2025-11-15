import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ModernNavbar } from '../../components/ModernNavbar';
import styles from './Contact.module.css';

// SVG Icons Components
const MailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const MessageCircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

const PhoneIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const LightbulbIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21h6" />
        <path d="M12 17v4" />
        <path d="M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8H8c0-2.5-2-5-2-8a6 6 0 0 1 6-6z" />
    </svg>
);

const BugIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 2h8" />
        <path d="M9 2v1.343M15 2v1.343" />
        <path d="M9 9v8a3 3 0 0 0 6 0V9" />
        <path d="M8 9h8" />
        <path d="M2 13h4" />
        <path d="M18 13h4" />
        <path d="M2 17h4" />
        <path d="M18 17h4" />
        <path d="M8 21a2 2 0 0 1-2-2" />
        <path d="M16 21a2 2 0 0 0 2-2" />
    </svg>
);

const StarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
    </svg>
);

const HandshakeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
        <path d="M3 22v-7c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v7" />
        <path d="M21 22v-7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v7" />
    </svg>
);

const MessageSquareIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            });

            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 2000);
    };

    return (
        <div className={styles.contactContainer}>
            {/* Modern Navbar */}
            <ModernNavbar />

            {/* Contact Hero & Form Section */}
            <motion.section
                className={styles.contactHero}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="container">
                    <motion.div
                        className="row justify-content-center text-center mb-5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="col-lg-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                                className={styles.heroIconContainer}
                            >
                                <MessageSquareIcon className={styles.heroIcon} />
                            </motion.div>
                            <h1 className={styles.heroTitle}>Get in Touch</h1>
                        </div>
                    </motion.div>
                    <motion.div
                        className="row justify-content-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="col-lg-8">
                            <motion.div
                                className={styles.contactForm}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h2 className={styles.formTitle}>Send us a Message</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <motion.div
                                            className="col-md-6 mb-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.7 }}
                                        >
                                            <label className={styles.formLabel}>First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`${styles.formInput} ${errors.firstName ? styles.inputError : ''}`}
                                                placeholder="Your first name"
                                            />
                                            {errors.firstName && (
                                                <motion.div
                                                    className={styles.errorMessage}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {errors.firstName}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                        <motion.div
                                            className="col-md-6 mb-3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.8 }}
                                        >
                                            <label className={styles.formLabel}>Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`${styles.formInput} ${errors.lastName ? styles.inputError : ''}`}
                                                placeholder="Your last name"
                                            />
                                            {errors.lastName && (
                                                <motion.div
                                                    className={styles.errorMessage}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {errors.lastName}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        className="mb-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.9 }}
                                    >
                                        <label className={styles.formLabel}>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && (
                                            <motion.div
                                                className={styles.errorMessage}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {errors.email}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                    <motion.div
                                        className="mb-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 1.0 }}
                                    >
                                        <label className={styles.formLabel}>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className={`${styles.formInput} ${errors.subject ? styles.inputError : ''}`}
                                            placeholder="What's this about?"
                                        />
                                        {errors.subject && (
                                            <motion.div
                                                className={styles.errorMessage}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {errors.subject}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                    <motion.div
                                        className="mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 1.1 }}
                                    >
                                        <label className={styles.formLabel}>Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`}
                                            rows="5"
                                            placeholder="Tell us more about your question or feedback..."
                                        ></textarea>
                                        {errors.message && (
                                            <motion.div
                                                className={styles.errorMessage}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {errors.message}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                    <motion.button
                                        type="submit"
                                        className={styles.submitButton}
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 1.2 }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    className={styles.spinner}
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </motion.button>

                                    {submitStatus === 'success' && (
                                        <motion.div
                                            className={styles.successMessage}
                                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                        >
                                            ✅ Message sent successfully! We'll get back to you soon.
                                        </motion.div>
                                    )}
                                </form>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Contact Info Section */}
            <motion.section
                className={styles.contactInfoSection}
                id="support"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col">
                            <h2 className={styles.sectionTitle}>Other Ways to Reach Us</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className={styles.contactCard}>
                                <div className={styles.contactIcon}>
                                    <MailIcon className={styles.contactIconSvg} />
                                </div>
                                <h4>Email Support</h4>
                                <p>support@planify.com</p>
                                <p className={styles.contactDescription}>
                                    Get help with technical issues or account questions
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className={styles.contactCard}>
                                <div className={styles.contactIcon}>
                                    <MessageCircleIcon className={styles.contactIconSvg} />
                                </div>
                                <h4>Live Chat</h4>
                                <p>Available 24/7</p>
                                <p className={styles.contactDescription}>
                                    Chat with our support team for instant help
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className={styles.contactCard}>
                                <div className={styles.contactIcon}>
                                    <PhoneIcon className={styles.contactIconSvg} />
                                </div>
                                <h4>Phone Support</h4>
                                <p>+1 (555) 123-4567</p>
                                <p className={styles.contactDescription}>
                                    Call us Monday-Friday, 9AM-6PM EST
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Feedback Section */}
            <section className={styles.feedbackSection} id="feedback">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h2 className={styles.sectionTitle}>We Value Your Feedback</h2>
                            <p className={styles.sectionText}>
                                Your feedback helps us improve Planify for everyone. Whether it's a feature request,
                                bug report, or just a suggestion, we want to hear from you.
                            </p>
                            <ul className={styles.feedbackList}>
                                <li><LightbulbIcon className={styles.listIcon} /> Feature requests and suggestions</li>
                                <li><BugIcon className={styles.listIcon} /> Bug reports and technical issues</li>
                                <li><StarIcon className={styles.listIcon} /> General feedback and reviews</li>
                                <li><HandshakeIcon className={styles.listIcon} /> Partnership opportunities</li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.feedbackImage}>
                                <div className={styles.imagePlaceholder}>
                                    <MessageSquareIcon className={styles.placeholderIcon} />
                                    <p>Your Feedback Matters</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col">
                            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className={styles.faqItem}>
                                <h4>How do I get started with Planify?</h4>
                                <p>Simply sign up for a free account and you can start creating tasks immediately. No setup required!</p>
                            </div>
                            <div className={styles.faqItem}>
                                <h4>Is there a mobile app available?</h4>
                                <p>Yes! Planify is fully responsive and works great on all devices. We also have native mobile apps coming soon.</p>
                            </div>
                            <div className={styles.faqItem}>
                                <h4>Can I collaborate with my team?</h4>
                                <p>Absolutely! You can invite team members, assign tasks, and collaborate in real-time.</p>
                            </div>
                            <div className={styles.faqItem}>
                                <h4>What if I need help getting started?</h4>
                                <p>We offer comprehensive documentation, video tutorials, and our support team is always ready to help!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;