import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();
  const username = localStorage.getItem('username');

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between">
        <Link to="/projects" className="text-xl">TodoApp</Link>
        <div>
          {username ? (
            <>
              <span className="mr-4">Hello, {username}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
