import { Router } from 'express';
import { createProject, getAllProjects, editProject, deleteProject, addTodo, updateTodo, deleteTodo, editTodo } from '../controllers/projectController.js';
import { register, login } from '../controllers/authController.js';
import { exportGist } from '../controllers/gistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Project routes
router.post('/projects', authMiddleware, createProject);
router.get('/projects', authMiddleware, getAllProjects);
router.put('/projects/:projectId', authMiddleware, editProject);  // Edit project
router.delete('/projects/:projectId', authMiddleware, deleteProject);  // Delete project
router.post('/projects/:projectId/todos', authMiddleware, addTodo);
router.put('/projects/:projectId/todos/:todoId', authMiddleware, updateTodo);
router.put('/projects/:projectId/todos/:todoId', authMiddleware, updateTodo);  // Mark todo as complete/incomplete
router.delete('/projects/:projectId/todos/:todoId', authMiddleware, deleteTodo);  // Delete todo
router.patch('/projects/:projectId/todos/:todoId', authMiddleware, editTodo);  // Edit todo

// Gist export
router.post('/projects/:projectId/export', authMiddleware, exportGist);

export default router;
