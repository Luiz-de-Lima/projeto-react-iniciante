import React, { useState } from "react";

import "./styles.css";
import Navbar from "./components/NavBar/navbar";
import TaskList from "./components/TaskList/tasklist";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };
  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskupdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Em Processo"
          onAddTask={addTask}
          taskState="Em Processo"
          tasks={tasks.filter((t) => t.state === "Em Processo")}
          onTaskupdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Concluída"
          onAddTask={addTask}
          taskState="Concluída"
          tasks={tasks.filter((t) => t.state === "Concluída")}
          onTaskupdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
