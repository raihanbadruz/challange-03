import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [task, settask] = useState("");

  // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
  const addTodo = () => {
    const newTodo = { task, complete: false };

    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string
      settask("");
    });
  };

  console.log(settask);
  return (
    <>
      <Container className="mt-2">
        <Row className="header">
          <Col>
            <div id="todo-header">
              <h2>Add Task</h2>
              <input
                className="search-list"
                type="text"
                value={task}
                onChange={(e) => settask(e.target.value)}
                placeholder="Add Todo..."
              />
            </div>
          </Col>
        </Row>

        <Row className="header-bottom">
          <Col>
            <span className="add-button" onClick={addTodo}>
              Add
            </span>
          </Col>
          <Col>
            <Link to="/">
              <span className="add-back">Back</span>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
