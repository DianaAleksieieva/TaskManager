// src/components/TaskItem.tsx
import React from "react";
import styles from "./TaskList.module.css";

interface Task {
  _id: string;
  title: string;
  category: string;
  status: string;
  dueDate?: string; // Mark optional in case it's missing
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onDelete?: (id: string) => void;
  onToggleComplete: (id: string, currentStatus: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete }) => {
  const isCompleted = task.status.toLowerCase() === "completed";

  return (
    <li className={styles.categoryItem}>
      <h3 className={styles.taskTitle}>{task.title}</h3>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <div className={styles.taskActions}>
        {onDelete && (
          <button className={styles.deleteButton} onClick={() => onDelete(task._id)}>
            Delete
          </button>
        )}
        <button
          className={`${styles.completeButton} ${task.status === "Completed" ? styles.completed : ""}`}
          onClick={() => onToggleComplete(task._id, task.status)}
        >
          {isCompleted ? "✓ Completed" : "✓ Mark as Done"}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
