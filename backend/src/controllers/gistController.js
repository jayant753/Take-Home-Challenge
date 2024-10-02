import axios from 'axios';
import Project from '../models/Project.js';

export const exportGist = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const completedTodos = project.todos.filter(todo => todo.status);
    const pendingTodos = project.todos.filter(todo => !todo.status);

    const gistContent = `
# ${project.title}
**Summary**: ${completedTodos.length} / ${project.todos.length} completed

## Pending Tasks
${pendingTodos.map(todo => `- [ ] ${todo.description}`).join('\n')}

## Completed Tasks
${completedTodos.map(todo => `- [x] ${todo.description}`).join('\n')}
`;

    const response = await axios.post(
      'https://api.github.com/gists',
      {
        files: { [`${project.title}.md`]: { content: gistContent } },
        description: `Project summary for ${project.title}`,
        public: false,
      },
      { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
    );

    res.json({ gistUrl: response.data.html_url });
  } catch (error) {
    console.error('Error exporting gist:', error.response ? error.response.data : error.message); // Log the error
    res.status(500).json({ message: 'Error exporting gist', error: error.response ? error.response.data : error.message });
  }
};

