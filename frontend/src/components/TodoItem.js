import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const TodoItem = ({ todo, projectId, onUpdateProjects }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleUpdateTodo = async () => {
    try {
      const { data } = await api.put(`/projects/${projectId}/todos/${todo._id}`, { status: !todo.status });
      onUpdateProjects(projectId, data);
      toast.success('Todo status updated successfully');
    } catch (error) {
      toast.error('Error updating todo status');
    }
  };

  const handleEditTodo = async () => {
    try {
      const { data } = await api.patch(`/projects/${projectId}/todos/${todo._id}`, { description: editedDescription });
      onUpdateProjects(projectId, data);
      setIsEditing(false);
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Error updating todo');
    }
  };

  const handleDeleteTodo = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await api.delete(`/projects/${projectId}/todos/${todo._id}`);
        onUpdateProjects(projectId, todo._id, 'delete');
        toast.success('Todo deleted successfully');
        window.location.reload();
      } catch (error) {
        toast.error('Error deleting todo');
      }
    }
  };

  return (
    <div className="flex items-center justify-between mb-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border p-2 rounded-md mr-2"
          />
          <button onClick={handleEditTodo} className="bg-blue-500 text-white px-2 py-1 rounded-md">
            Save
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.status}
            onChange={handleUpdateTodo}
            className="mr-2"
          />
          <span className={todo.status ? 'line-through' : ''}>{todo.description}</span>
          <button onClick={() => setIsEditing((prev) => !prev)} className="text-blue-500 ml-2">
            Edit
          </button>
          <button onClick={handleDeleteTodo} className="text-red-500 ml-2">
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;








  