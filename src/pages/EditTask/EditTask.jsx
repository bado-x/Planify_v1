import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskApi } from '../../services/api';
import styles from './EditTask.module.css';

const EditTask = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    userId: user.id
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await taskApi.fetchTasks(user.id);
        const taskToEdit = tasks.find(t => t._id === id);
        if (taskToEdit) {
          setTask(taskToEdit);
        } else {
          throw new Error('Task not found');
        }
      } catch (err) {
        setErrors({ submit: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, user.id]);

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
      await taskApi.updateTask(id, task);
      navigate('/');
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to update task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskApi.deleteTask(id);
        navigate('/');
      } catch (err) {
        setErrors({ submit: err.message || 'Failed to delete task. Please try again.' });
      }
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading task...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundPattern}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>Edit Task</h1>
              <p className={styles.subtitle}>Update your task details</p>
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
                onClick={handleDelete}
                className={styles.deleteButton}
                disabled={isSubmitting}
              >
                <i className="bi bi-trash"></i>
                Delete Task
              </button>
              <div className={styles.rightButtons}>
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
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
