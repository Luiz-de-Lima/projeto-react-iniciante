import React, { useState } from "react";
import "./task-item.css";
import PropTypes from "prop-types";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskupdate, 
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const ontitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTaskupdate(id, newTitle, taskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };
  const onTaskStateChange = (event) => {
    onTaskupdate(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <div className="task-item">
      <input
        type="text"
        value={editableTitle}
        onChange={ontitleChange}
        onKeyPress={onKeyPress}
      />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
        <select onChange={onTaskStateChange} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Em Processo">Em Processo</option>
          <option value="Concluida">Concluída</option>
        </select>
      </div>
    );
  }
}

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired
};
