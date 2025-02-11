import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
function Home() {
  
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://todo-app-api-bay-nu.vercel.app/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTodos(response.data.todos);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;

    try {
      const response = await axios.post(
        "https://todo-app-api-bay-nu.vercel.app/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError(error);
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    console.log(todo);
    try {
      const response = await axios.put(
        `https://todo-app-api-bay-nu.vercel.app/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError(error);
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`https://todo-app-api-bay-nu.vercel.app/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError(error);
    }
  };
  
  const remainingTodo = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">Todo App</h1>
      <div className="flex mb-4 mt-5">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && todoCreate()}
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={todoCreate}
          className="bg-blue-600 border rounded-r-md text-white py-2 px-4 hover:bg-blue-900 duration-300"
        >
          Add
        </button>
      </div>
      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center font-semibold text-red-500">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex item-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                />
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-800 font-semibold"
                      : "text-gray-800 font-semibold"
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                className="text-red-500 hover:text-red-800 duration-300"
                onClick={() => todoDelete(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingTodo} todos remaining
      </p>
    </div>
  );
}

export default Home;
