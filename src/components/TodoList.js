import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState(""); // State untuk input pencarian

  useEffect(() => {
    // Memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // Ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  // Buat array filteredTasks berdasarkan filter dan pencarian saat ini
  const filteredTasks = todos.filter((todo) => {
    const textMatch = todo.task
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (filter === "all") return textMatch;
    if (filter === "complete") return textMatch && todo.complete;
    if (filter === "todo") return textMatch && !todo.complete;
    return textMatch;
  });

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Mengubah state saat input berubah
        />
      </div>
      <div className="filtering">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("complete")}>Done</button>
        <button onClick={() => setFilter("todo")}>ToDo</button>
      </div>
      <ul id="todo-list">
        {filteredTasks.map((todo) => (
          <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
