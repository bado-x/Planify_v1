import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskApi } from '../../services/api';
import styles from './AddTask.module.css';

const AddTask = ({ user, fetchTasks }) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    userId: user.id
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    if (name === 'title') {
      if (!value || value.trim() === '') {
        newErrors.title = 'Please fill out this field.';
      } else {
        delete newErrors.title;
      }
    }
    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ title: true, description: true, status: true });
    
    // Validate all fields
    const newErrors = {};
    if (!task.title || task.title.trim() === '') {
      newErrors.title = 'Please fill out this field.';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await taskApi.createTask(task);
      if (fetchTasks) await fetchTasks();
      navigate('/');
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to create task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'in-progress':
        return '#4A90E2';
      case 'done':
        return '#50C878';
      default:
        return '#9B9B9B';
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Add New Task</h1>
              <p className={styles.subtitle}>Create and organize your tasks efficiently</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {errors.submit && (
              <div className={styles.errorAlert}>
                <span className={styles.errorIcon}>⚠️</span>
                <span>{errors.submit}</span>
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Task Title <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                placeholder="Enter task title"
                autoComplete="off"
              />
              {errors.title && touched.title && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorTooltip}>{errors.title}</span>
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.textarea}
                rows={3}
                placeholder="Add a detailed description for your task..."
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status" className={styles.label}>
                Status
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="status"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                  className={styles.select}
                  style={{ '--status-color': getStatusColor(task.status) }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <div 
                  className={styles.statusIndicator}
                  style={{ backgroundColor: getStatusColor(task.status) }}
                ></div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={() => navigate('/')}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Saving...
                  </>
                ) : (
                  'Save Task'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;