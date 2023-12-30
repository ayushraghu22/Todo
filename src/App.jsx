import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewToDoForm";
import TodoList from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
          };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => {
        return todo.id !== id;
      });
    });
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

/*
1. while updating states you need to create new state(object, array etc), you cannot 
  mutate the old one. (states are immutable i.e. needs to create new one).
  
2.  a) <button onClick={deleteTodo(todo.id)} ="btn btn-danger" >    -> it is actually calling the 
      function during rendering and storing the return value from that function.
    b) <button onClick={() => deleteTodo(todo.id)} ="btn btn-danger" >  --> it is actually calling only
      when the onClick event occurs.

3. Hooks cannot be rendered conditionally.(they should be used at the top inside function);
    can't put them inside if() or in loops() or as a return statement.
*/
