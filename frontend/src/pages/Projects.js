import { useState, useEffect } from 'react';
import api from '../services/api';
import ProjectItem from '../components/ProjectItem';
import { toast } from 'react-toastify';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (error) {
        toast.error('Error fetching projects');
      }
    };
    fetchProjects();
  }, []);

  const handleUpdateProjects = (projectId, updatedTodo, action) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              todos:
                action === 'delete'
                  ? project.todos.filter((todo) => todo._id !== updatedTodo)
                  : action === 'add'
                  ? [...project.todos, updatedTodo]
                  : project.todos.map((todo) =>
                      todo._id === updatedTodo._id ? updatedTodo : todo
                    ),
            }
          : project
      )
    );
  };

  const handleAddProject = async () => {
    if (!newProjectTitle) return toast.error('Project title cannot be empty');
    try {
      const { data } = await api.post('/projects', { title: newProjectTitle });
      setProjects((prevProjects) => [...prevProjects, data]);
      setNewProjectTitle('');
      toast.success('Project created successfully');
    } catch (error) {
      toast.error('Error creating project');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl mb-6">Your Projects</h1>
      
      {/* Form to create a new project */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
          className="border p-2 rounded-md mr-2"
          placeholder="New project title"
        />
        <button onClick={handleAddProject} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Project
        </button>
      </div>

      {projects.length ? (
        projects.map((project) => (
          <ProjectItem
            key={project._id}
            project={project}
            onUpdateProjects={handleUpdateProjects}
          />
        ))
      ) : (
        <p>No projects available. Add some!</p>
      )}
    </div>
  );
};

export default ProjectsPage;





