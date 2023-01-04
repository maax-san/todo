import { TodoInput } from "./TodoInput";
import { Todo } from "./Todo";
import { useTodos } from "../hooks/useTodos";

type TodosProps = {
  storage: string;
};

export const Todos = ({ storage }: TodosProps) => {
  const { todos, addTodo, removeTodo, completeTodo } = useTodos(storage);

  return (
    <div>
      <TodoInput addTodo={addTodo} />
      <ul>
        {todos?.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            onRemove={removeTodo}
            onComplete={completeTodo}
          />
        ))}
      </ul>
    </div>
  );
};
