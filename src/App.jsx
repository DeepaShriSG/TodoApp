import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, toggle } from "./redux/TodoSlice.js";

function App() {
  const [task, setTask] = useState("");
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("Today");

  const tasks = useSelector((state) => state.todoApp);
  const dispatch = useDispatch();

  const toggleModal = () => setShow((prev) => !prev);

  const createTask = () => {
    if (task.trim()) {
      dispatch(add({ title: task, dueDate: new Date().toISOString().split('T')[0] })); // Add today's date
      setTask("");
      toggleModal();
    }
  };

  const toggleTaskStatus = (id) => {
    dispatch(toggle(id));
  };

  const filterTasks = (filter) => {
    const today = new Date().toISOString().split("T")[0];
    switch (filter) {
      case "Pending":
        return tasks.filter((task) => !task.status);
      case "Overdue":
        return tasks.filter((task) => new Date(task.dueDate) < new Date() && !task.status);
      default:
        return tasks;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="header-banner">
        <h1>Todo App</h1>
      </div>

      {/* Main Container */}
      <div className="container mt-5">
        <div className="d-flex justify-content-center gap-3 align-items-center mb-3">
          {/* Task Filter Buttons */}
          <div className="btn-group" role="group" aria-label="Task Filters">
            <button className={`btn ${filter === "Today" ? "btn-success" : "btn-outline-success"}`} onClick={() => setFilter("Today")}>
              Today
            </button>
            <button className={`btn ${filter === "Pending" ? "btn-success" : "btn-outline-success"}`} onClick={() => setFilter("Pending")}>
              Pending
            </button>
            <button className={`btn ${filter === "Overdue" ? "btn-success" : "btn-outline-success"}`} onClick={() => setFilter("Overdue")}>
              Overdue
            </button>
          </div>

          <button className="btn add-task-btn" onClick={toggleModal}>
            <i className="bi bi-plus"></i> Add Task
          </button>
        </div>

        {/* Add Task Modal */}
        {show && (
          <div className="modal fade show" role="dialog" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create TODO</h5>
                  <button className="btn-close" onClick={toggleModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <input type="text" className="form-control" placeholder="Enter your Todo" value={task} onChange={(e) => setTask(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={toggleModal}>
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={createTask}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task List Section */}
        <div>
          <h3>Tasks</h3>
          <div className="card">
            <div className="card-body">
              {filterTasks(filter).length > 0 ? (
                filterTasks(filter).map(({ id, title, status }) => (
                  <div key={id} className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      style={{
                        textDecoration: status ? "line-through" : "none",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleTaskStatus(id)}>
                      {title}
                    </span>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => toggleTaskStatus(id)}>
                      Toggle
                    </button>
                  </div>
                ))
              ) : (
                <p>No tasks available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default App;
