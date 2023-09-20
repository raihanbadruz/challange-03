import { useState } from "react";

const TodoItem = ({ todo, setRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleTaskChange = (event) => {
    setUpdatedTask(event.target.value);
  };

  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log("Todo updated.");
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log("Todo deleted.");
      setRefresh(true);
    });
  };

  const saveTodo = () => {
    const updatedTodo = {
      ...todo,
      task: updatedTask,
    };

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then(() => {
        console.log("Todo updated.");
        setRefresh(true);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Failed to update todo:", error);
      });
  };

  return (
    <li className={`${todo.complete ? "checked" : ""} task-container`}>
      {isEditing ? (
        <div>
          <input type="text" value={updatedTask} onChange={handleTaskChange} />
          <button className="edit-button" onClick={saveTodo}>
            Save
          </button>
          <button className="edit-button" onClick={toggleEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="list-item" onClick={updateTodo}>
          {todo.task}
        </div>
      )}
      <span className="close" onClick={toggleEdit}>
        i
      </span>
      <span className="close" onClick={deleteTodo}>
        x
      </span>
    </li>
  );
};

export default TodoItem;
