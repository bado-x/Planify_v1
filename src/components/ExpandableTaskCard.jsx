import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import styles from './ExpandableTaskCard.module.css';

const CloseIcon = () => {
    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.closeIcon}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};

const ExpandableTaskCard = ({ tasks, onDelete }) => {
    const [active, setActive] = useState(null);
    const ref = useRef(null);
    const id = useId();
    const navigate = useNavigate();

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === 'Escape') {
                setActive(null);
            }
        }

        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setActive(null);
            }
        }

        if (active) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [active]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'done':
                return '#90EE90'; // Light green
            case 'in-progress':
                return '#FFD700'; // Gold
            case 'pending':
                return '#FFA07A'; // Light salmon
            default:
                return '#F5F5DC';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'done':
                return 'Done';
            case 'in-progress':
                return 'In Progress';
            case 'pending':
                return 'Pending';
            default:
                return status;
        }
    };

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.overlay}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active ? (
                    <div className={styles.modalContainer}>
                        <motion.button
                            key={`button-${active._id}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className={styles.closeButton}
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>

                        <motion.div
                            layoutId={`card-${active._id}-${id}`}
                            ref={ref}
                            className={styles.expandedCard}
                        >
                            <div className={styles.expandedContent}>
                                <div className={styles.expandedHeader}>
                                    <div>
                                        <motion.h3
                                            layoutId={`title-${active._id}-${id}`}
                                            className={styles.expandedTitle}
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.div
                                            layoutId={`status-${active._id}-${id}`}
                                            className={styles.expandedStatus}
                                        >
                                            <Badge
                                                style={{
                                                    backgroundColor: getStatusColor(active.status),
                                                    color: '#2F0C33',
                                                }}
                                            >
                                                {getStatusLabel(active.status)}
                                            </Badge>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className={styles.expandedBody}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={styles.expandedDescription}
                                    >
                                        <h4>Description:</h4>
                                        <p>{active.description || 'No description provided.'}</p>

                                        <h4>Created:</h4>
                                        <p>{active.createdAt ? new Date(active.createdAt).toLocaleDateString() : 'N/A'}</p>

                                        <div className={styles.expandedActions}>
                                            <Button
                                                variant="outline-light"
                                                onClick={() => {
                                                    setActive(null);
                                                    navigate(`/edit-task/${active._id}`);
                                                }}
                                                className={styles.actionButton}
                                            >
                                                <i className="bi bi-pencil me-2"></i>
                                                Edit Task
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this task?')) {
                                                        onDelete(active._id);
                                                        setActive(null);
                                                    }
                                                }}
                                                className={styles.actionButton}
                                            >
                                                <i className="bi bi-trash me-2"></i>
                                                Delete Task
                                            </Button>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>

            <ul className={styles.cardList}>
                {tasks.map((task) => (
                    <motion.div
                        layoutId={`card-${task._id}-${id}`}
                        key={`card-${task._id}-${id}`}
                        onClick={() => setActive(task)}
                        className={styles.card}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.cardContent}>
                            <div>
                                <motion.h3
                                    layoutId={`title-${task._id}-${id}`}
                                    className={styles.cardTitle}
                                >
                                    {task.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${task._id}-${id}`}
                                    className={styles.cardDescription}
                                >
                                    {task.description
                                        ? task.description.length > 60
                                            ? task.description.substring(0, 60) + '...'
                                            : task.description
                                        : 'No description'}
                                </motion.p>
                            </div>
                        </div>
                        <motion.div
                            layoutId={`status-${task._id}-${id}`}
                            className={styles.cardStatus}
                        >
                            <Badge
                                style={{
                                    backgroundColor: getStatusColor(task.status),
                                    color: '#2F0C33',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.85rem',
                                }}
                            >
                                {getStatusLabel(task.status)}
                            </Badge>
                        </motion.div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
};

export default ExpandableTaskCard;
