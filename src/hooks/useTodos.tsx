import { useEffect, useReducer, useRef } from "react";

type todo = {
  id: number;
  title: string;
  completed: boolean;
};

const enum ACTION {
  Add = "ADD",
  Remove = "REMOVE",
  Complete = "COMPLETE",
}

//@todo useContext FILTER
const FILTER_MAP = {
  All: () => true,
  Active: (todo: todo) => !todo.completed,
  Completed: (todo: todo) => todo.completed,
};

type Actions =
  | { type: ACTION.Add; todo: todo }
  | { type: ACTION.Remove; id: number }
  | { type: ACTION.Complete; id: number };

export const todoHandler = (todos: todo[], action: Actions) => {
  switch (action.type) {
    case ACTION.Add:
      return [action.todo, ...todos];
    case ACTION.Remove:
      return todos.filter((todo) => todo.id !== action.id);
    case ACTION.Complete:
      return todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });
    default:
      throw new Error("Unexpected Action");
  }
};

const getInitialValue = (key: string, defaultValue: any) => {
  const localStorageValue = window.localStorage.getItem(key);
  return localStorageValue !== null
    ? JSON.parse(localStorageValue)
    : defaultValue;
};

export const useTodos = (key: string, defaultValue = []) => {
  const currentIdKey = `${key}-current-id`;
  const id = useRef(getInitialValue(currentIdKey, 0));

  const [todos, dispatch] = useReducer(todoHandler, [], () =>
    getInitialValue(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
    localStorage.setItem(currentIdKey, id.current.toString());
  }, [todos, key]);

  const addTodo = (title: string) => {
    id.current = id.current + 1;
    dispatch({
      type: ACTION.Add,
      todo: {
        id: id.current,
        title: title,
        completed: false,
      },
    });
  };

  const removeTodo = (id: number) => {
    dispatch({
      type: ACTION.Remove,
      id: id,
    });
  };

  const completeTodo = (id: number) => {
    dispatch({
      type: ACTION.Complete,
      id: id,
    });
  };

  return { todos, addTodo, removeTodo, completeTodo };
};
