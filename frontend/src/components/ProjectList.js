import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => (
  <ul className="space-y-2">
    {projects.map((project) => (
      <li key={project._id} className="p-2 border-b">
        <Link to={`/projects/${project._id}`} className="text-blue-500 hover:underline">
          {project.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default ProjectList;
