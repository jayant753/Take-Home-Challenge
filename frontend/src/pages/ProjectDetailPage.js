// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../services/api';
// import TodoList from '../components/TodoList';

// const ProjectDetailPage = () => {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const { data } = await api.get(`/projects/${projectId}`);
//         setProject(data);
//       } catch (error) {
//         console.error('Error fetching project', error);
//       }
//     };
//     fetchProject();
//   }, [projectId]);

//   const handleUpdateTodos = (updatedTodos) => {
//     setProject({ ...project, todos: updatedTodos });
//   };

//   const notCompletedTodos = project?.todos.filter((todo) => !todo.status) || [];
//   const completedTodos = project?.todos.filter((todo) => todo.status) || [];

//   if (!project) return <div>Loading...</div>;

//   return (
//     <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-20">
//       <div className="w-full max-w-2xl p-4 bg-white rounded-md shadow-lg">
//         <h1 className="text-3xl mb-6">{project.title}</h1>

//         <h2 className="text-xl mb-4">Pending</h2>
//         <TodoList todos={notCompletedTodos} projectId={projectId} onUpdateTodos={handleUpdateTodos} />

//         <h2 className="text-xl mt-6 mb-4">Completed</h2>
//         <TodoList todos={completedTodos} projectId={projectId} onUpdateTodos={handleUpdateTodos} />
//       </div>
//     </div>
//   );
// };

// export default ProjectDetailPage;





