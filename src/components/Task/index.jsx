import React, { useState } from "react";
import styles from "./task.module.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function formatTimeTo12Hour(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = ((hours + 11) % 12) + 1;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function Task({ task, onDelete, onComplete, onEdit, highlight }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDueDate, setNewDueDate] = useState(new Date(task.dueDate));
  const [newDueTime, setNewDueTime] = useState(task.dueTime);
  const [error, setError] = useState("");

  const handleEdit = () => {
    if (newTitle.trim() === "") {
      setError("Task name cannot be blank");
      return;
    }
    onEdit(
      task.id,
      newTitle,
      newDueDate.toISOString().split("T")[0],
      newDueTime
    );
    setIsEditing(false);
    setError("");
  };

  return (
    <div className={`${styles.task} ${highlight ? styles.taskDue : ""}`}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task.id)}
      >
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <div className={styles.taskDetails}>
        {isEditing ? (
          <div className={styles.editForm}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task name"
              className={styles.customInput}
            />
            <DatePicker
              selected={newDueDate}
              onChange={(date) => setNewDueDate(date)}
              dateFormat="dd-MM-yyyy"
              className={`${styles.datePicker} ${styles.customInput}`}
              popperClassName={styles.customPopper}
            />
            <input
              type="time"
              value={newDueTime}
              onChange={(e) => setNewDueTime(e.target.value)}
              className={styles.customInput}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.saveButton} onClick={handleEdit}>
              Save
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p
              className={`${task.isCompleted ? styles.textCompleted : ""} ${
                highlight ? styles.missed : ""
              }`}
            >
              {task.title}
              {highlight && <span className={styles.missedLabel}> Missed</span>}
            </p>
            <div className={styles.dueDetails}>
              <span>{task.dueDate}</span>
              <span>{formatTimeTo12Hour(task.dueTime)}</span>
            </div>
            <div className="edit_task">
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                <BsPencilSquare />
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(task.id)}
              >
                <TbTrash size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
