type TodoInputProps = {
  addTodo: (id: string) => void;
};

export const TodoInput = ({ addTodo }: TodoInputProps) => (
  <label>
    <span>Add todo</span>
    <span>add</span>
    <input
      placeholder="Add Todo"
      type="text"
      name="add_todo"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          const value = event.currentTarget.value?.trim();
          if (value === "") return;
          addTodo(value);
          event.currentTarget.value = "";
        }
      }}
    />
  </label>
);
