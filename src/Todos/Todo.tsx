type TodoProps = {
  id: number;
  title: string;
  completed: boolean;
  onRemove: (id: number) => void;
  onComplete: (id: number) => void;
};

export const Todo = ({
  id,
  title,
  completed,
  onRemove,
  onComplete,
}: TodoProps) => (
  <li>
    <div>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(event) => onComplete(id)}
        />
        <span>{title}</span>
      </label>
    </div>
    <button onClick={() => onRemove(id)}>Remove</button>
  </li>
);
