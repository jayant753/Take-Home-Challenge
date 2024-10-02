import { useState } from 'react';
import api from '../services/api';
import TodoItem from './TodoItem';
import { toast } from 'react-toastify';

const ProjectItem = ({ project, onUpdateProjects }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [editedTitle, setEditedTitle] = useState(project.title);

  const handleEditProject = async () => {
    try {
      const { data } = await api.put(`/projects/${project._id}`, { title: editedTitle });
      onUpdateProjects(project._id, data);
      setIsEditing(false);
      toast.success('Project updated successfully');
    } catch (error) {
      toast.error('Error updating project');
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${project._id}`);
        onUpdateProjects(project._id, null, 'delete');
        toast.success('Project deleted successfully');
        window.location.reload();
      } catch (error) {
        toast.error('Error deleting project');
      }
    }
  };

  const handleAddTodo = async () => {
    if (!newTodoDescription) return toast.error('Todo description cannot be empty');
    try {
      const { data } = await api.post(`/projects/${project._id}/todos`, { description: newTodoDescription });
      onUpdateProjects(project._id, data, 'add');
      setNewTodoDescription('');
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error('Error adding todo');
    }
  };

  const handleExportGist = async () => {
    try {
      const { data } = await api.post(`/projects/${project._id}/export`);
      toast.success('Gist exported successfully! You can view it here: ' + data.gistUrl);
    } catch (error) {
      toast.error('Error exporting gist');
    }
  };

  return (
    <div className="border p-4 rounded-md mb-4">
      {isEditing ? (
        <div className="mb-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border p-2 rounded-md mr-2"
          />
          <button onClick={handleEditProject} className="bg-blue-500 text-white px-2 py-1 rounded-md">
            Save
          </button>
        </div>
      ) : (
        <h2 className="text-xl">{project.title}</h2>
      )}

      <div className="flex justify-between mb-2">
        <button onClick={() => setIsEditing((prev) => !prev)} className="text-blue-500">
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button onClick={handleDeleteProject} className="text-red-500">
          Delete
        </button>
        <button onClick={handleExportGist} className="text-green-500">
          Export Gist
        </button>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          className="border p-2 rounded-md mr-2"
          placeholder="New todo description"
        />
        <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Todo
        </button>
      </div>

      <h3 className="font-bold">Pending Tasks:</h3>
      {project.todos.filter(todo => !todo.status).length ? (
        project.todos.filter(todo => !todo.status).map((todo) => (
          <TodoItem key={todo._id} todo={todo} projectId={project._id} onUpdateProjects={onUpdateProjects} />
        ))
      ) : (
        <p>No pending todos available. Add some!</p>
      )}

      <h3 className="font-bold mt-4">Completed Tasks:</h3>
      {project.todos.filter(todo => todo.status).length ? (
        project.todos.filter(todo => todo.status).map((todo) => (
          <TodoItem key={todo._id} todo={todo} projectId={project._id} onUpdateProjects={onUpdateProjects} />
        ))
      ) : (
        <p>No completed todos available.</p>
      )}
    </div>
  );
};

export default ProjectItem;





