import TodoItem from './TodoItem';

const TodoList = ({ todos, projectId, onUpdateTodos }) => {
  return (
    <div>
      {todos.length ? (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            projectId={projectId}
            onUpdateTodos={onUpdateTodos}
          />
        ))
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
};

export default TodoList;






