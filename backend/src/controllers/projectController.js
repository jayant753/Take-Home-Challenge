import Project from '../models/Project.js';

// Create new project
export const createProject = async (req, res) => {
  try {
    const { title } = req.body;
    const project = new Project({ title });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    await Project.findByIdAndDelete(projectId);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};

// Edit project
export const editProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.title = title;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error editing project', error });
  }
};

// Add todo to project
export const addTodo = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { description } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.todos.push({ description });
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error adding todo', error });
  }
};

// Mark todo as complete
export const updateTodo = async (req, res) => {
  try {
    const { projectId, todoId } = req.params;
    const { status } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const todo = project.todos.id(todoId);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.status = status;
    todo.updatedAt = new Date();
    await project.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
};

// Delete todo from project
export const deleteTodo = async (req, res) => {
  try {
    const { projectId, todoId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.todos.id(todoId).remove();
    await project.save();
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};

// Edit todo
export const editTodo = async (req, res) => {
  try {
    const { projectId, todoId } = req.params;
    const { description } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const todo = project.todos.id(todoId);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.description = description;
    todo.updatedAt = new Date();
    await project.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error editing todo', error });
  }
};
