import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskApi } from '../../services/api';
import styles from './Projects.module.css';
import { format } from 'date-fns';
import { 
  BiUser, 
  BiBriefcase, 
  BiBook, 
  BiFolder, 
  BiTrash 
} from 'react-icons/bi';

const Projects = ({ tasks = [], user, fetchTasks }) => {
  const navigate = useNavigate();
  const [localTasks, setLocalTasks] = useState(tasks);
  const [projects, setProjects] = useState([]);
  const [workspaces, setWorkspaces] = useState([
    { id: 'personal', name: 'Personal', color: '#4A90E2', icon: BiUser },
    { id: 'work', name: 'Work', color: '#50C878', icon: BiBriefcase },
    { id: 'study', name: 'Study', color: '#FFA500', icon: BiBook },
  ]);
  const [selectedWorkspace, setSelectedWorkspace] = useState('all');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    workspace: 'personal',
    color: '#4A90E2',
  });

  useEffect(() => {
    setLocalTasks(tasks);
    loadProjects();
  }, [tasks]);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem(`projects_${user?.id}`);
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Create default projects from existing tasks
      const defaultProjects = createDefaultProjects();
      setProjects(defaultProjects);
      if (user?.id) {
        localStorage.setItem(`projects_${user.id}`, JSON.stringify(defaultProjects));
      }
    }
  };

  const createDefaultProjects = () => {
    const projectMap = new Map();
    
    localTasks.forEach(task => {
      const projectName = task.project || 'General';
      if (!projectMap.has(projectName)) {
        projectMap.set(projectName, {
          id: projectName.toLowerCase().replace(/\s+/g, '-'),
          name: projectName,
          description: `Tasks related to ${projectName}`,
          workspace: 'personal',
          color: getColorForProject(projectName),
          createdAt: new Date().toISOString(),
          tasks: [],
        });
      }
      projectMap.get(projectName).tasks.push(task);
    });

    return Array.from(projectMap.values());
  };

  const getColorForProject = (name) => {
    const colors = ['#4A90E2', '#50C878', '#FFA500', '#9B59B6', '#E74C3C', '#1ABC9C'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;

    const project = {
      id: Date.now().toString(),
      ...newProject,
      createdAt: new Date().toISOString(),
      tasks: [],
    };

    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    if (user?.id) {
      localStorage.setItem(`projects_${user.id}`, JSON.stringify(updatedProjects));
    }

    setNewProject({
      name: '',
      description: '',
      workspace: 'personal',
      color: '#4A90E2',
    });
    setShowCreateProject(false);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      if (user?.id) {
        localStorage.setItem(`projects_${user.id}`, JSON.stringify(updatedProjects));
      }
    }
  };

  const filteredProjects = useMemo(() => {
    if (selectedWorkspace === 'all') return projects;
    return projects.filter(p => p.workspace === selectedWorkspace);
  }, [projects, selectedWorkspace]);

  const getProjectStats = (project) => {
    const projectTasks = localTasks.filter(t => 
      t.project === project.name || project.tasks.some(pt => pt._id === t._id)
    );
    
    return {
      total: projectTasks.length,
      pending: projectTasks.filter(t => t.status === 'pending').length,
      inProgress: projectTasks.filter(t => t.status === 'in-progress').length,
      done: projectTasks.filter(t => t.status === 'done').length,
      completionRate: projectTasks.length > 0 
        ? ((projectTasks.filter(t => t.status === 'done').length / projectTasks.length) * 100).toFixed(0)
        : 0,
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'in-progress': return '#4A90E2';
      case 'done': return '#50C878';
      default: return '#9B9B9B';
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Projects & Workspaces</h1>
            <p className={styles.subtitle}>Organize your tasks into projects and workspaces</p>
          </div>
          <button
            className={styles.createButton}
            onClick={() => setShowCreateProject(!showCreateProject)}
          >
            + New Project
          </button>
        </div>

        {/* Create Project Form */}
        {showCreateProject && (
          <div className={styles.createForm}>
            <div className={styles.formHeader}>
              <h3>Create New Project</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowCreateProject(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.formBody}>
              <div className={styles.formGroup}>
                <label>Project Name *</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Enter project name"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Add project description"
                  className={styles.textarea}
                  rows={3}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Workspace</label>
                  <select
                    value={newProject.workspace}
                    onChange={(e) => setNewProject({ ...newProject, workspace: e.target.value })}
                    className={styles.select}
                  >
                    {workspaces.map(ws => (
                      <option key={ws.id} value={ws.id}>{ws.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Color</label>
                  <div className={styles.colorPicker}>
                    {['#4A90E2', '#50C878', '#FFA500', '#9B59B6', '#E74C3C', '#1ABC9C'].map(color => (
                      <button
                        key={color}
                        className={`${styles.colorOption} ${newProject.color === color ? styles.active : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewProject({ ...newProject, color })}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.formActions}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowCreateProject(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.submitBtn}
                  onClick={handleCreateProject}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Workspace Filter */}
        <div className={styles.workspaceFilter}>
          <button
            className={`${styles.workspaceButton} ${selectedWorkspace === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedWorkspace('all')}
          >
            All Workspaces
          </button>
          {workspaces.map(ws => {
            const IconComponent = ws.icon;
            return (
              <button
                key={ws.id}
                className={`${styles.workspaceButton} ${selectedWorkspace === ws.id ? styles.active : ''}`}
                onClick={() => setSelectedWorkspace(ws.id)}
                style={{ 
                  borderLeftColor: selectedWorkspace === ws.id ? ws.color : 'transparent'
                }}
              >
                <span className={styles.workspaceIcon}>
                  <IconComponent />
                </span>
                {ws.name}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <BiFolder />
            </div>
            <h3>No Projects Yet</h3>
            <p>Create your first project to organize your tasks</p>
            <button
              className={styles.emptyButton}
              onClick={() => setShowCreateProject(true)}
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {filteredProjects.map(project => {
              const stats = getProjectStats(project);
              const workspace = workspaces.find(ws => ws.id === project.workspace) || workspaces[0];
              const WorkspaceIcon = workspace.icon;
              
              return (
                <div
                  key={project.id}
                  className={styles.projectCard}
                  style={{ borderTopColor: project.color }}
                >
                  <div className={styles.projectHeader}>
                    <div className={styles.projectTitleRow}>
                      <div
                        className={styles.projectColor}
                        style={{ backgroundColor: project.color }}
                      ></div>
                      <div className={styles.projectInfo}>
                        <h3 className={styles.projectName}>{project.name}</h3>
                        <div className={styles.projectMeta}>
                          <span className={styles.workspaceBadge} style={{ color: workspace.color }}>
                            <WorkspaceIcon style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                            {workspace.name}
                          </span>
                          {project.createdAt && (
                            <span className={styles.projectDate}>
                              {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteProject(project.id)}
                      title="Delete project"
                    >
                      <BiTrash />
                    </button>
                  </div>

                  {project.description && (
                    <p className={styles.projectDescription}>{project.description}</p>
                  )}

                  <div className={styles.projectStats}>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{stats.total}</div>
                      <div className={styles.statLabel}>Total</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue} style={{ color: '#FFA500' }}>
                        {stats.pending}
                      </div>
                      <div className={styles.statLabel}>Pending</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue} style={{ color: '#4A90E2' }}>
                        {stats.inProgress}
                      </div>
                      <div className={styles.statLabel}>In Progress</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue} style={{ color: '#50C878' }}>
                        {stats.done}
                      </div>
                      <div className={styles.statLabel}>Done</div>
                    </div>
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${stats.completionRate}%`,
                        backgroundColor: project.color,
                      }}
                    ></div>
                  </div>
                  <div className={styles.progressLabel}>
                    {stats.completionRate}% Complete
                  </div>

                  <div className={styles.projectTasks}>
                    <h4>Recent Tasks</h4>
                    <div className={styles.tasksList}>
                      {localTasks
                        .filter(t => 
                          t.project === project.name || 
                          project.tasks.some(pt => pt._id === t._id)
                        )
                        .slice(0, 3)
                        .map(task => (
                          <div
                            key={task._id}
                            className={styles.taskItem}
                            onClick={() => navigate(`/edit-task/${task._id}`)}
                          >
                            <div
                              className={styles.taskStatus}
                              style={{ backgroundColor: getStatusColor(task.status) }}
                            ></div>
                            <span className={styles.taskTitle}>{task.title}</span>
                          </div>
                        ))}
                      {stats.total === 0 && (
                        <div className={styles.noTasks}>No tasks in this project</div>
                      )}
                    </div>
                  </div>

                  <button
                    className={styles.viewButton}
                    onClick={() => {
                      // Filter tasks by project and navigate
                      navigate('/task-tracking', { 
                        state: { projectFilter: project.name } 
                      });
                    }}
                  >
                    View All Tasks →
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Workspace Summary */}
        <div className={styles.workspaceSummary}>
          <h2 className={styles.summaryTitle}>Workspace Overview</h2>
          <div className={styles.summaryGrid}>
            {workspaces.map(ws => {
              const wsProjects = projects.filter(p => p.workspace === ws.id);
              const wsTasks = localTasks.filter(t => {
                const taskProject = projects.find(p => 
                  p.name === t.project || p.tasks.some(pt => pt._id === t._id)
                );
                return taskProject?.workspace === ws.id;
              });
              const WorkspaceIcon = ws.icon;
              
              return (
                <div
                  key={ws.id}
                  className={styles.summaryCard}
                  style={{ borderLeftColor: ws.color }}
                >
                  <div className={styles.summaryHeader}>
                    <span className={styles.summaryIcon}>
                      <WorkspaceIcon />
                    </span>
                    <h3>{ws.name}</h3>
                  </div>
                  <div className={styles.summaryStats}>
                    <div className={styles.summaryStat}>
                      <span className={styles.summaryValue}>{wsProjects.length}</span>
                      <span className={styles.summaryLabel}>Projects</span>
                    </div>
                    <div className={styles.summaryStat}>
                      <span className={styles.summaryValue}>{wsTasks.length}</span>
                      <span className={styles.summaryLabel}>Tasks</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

