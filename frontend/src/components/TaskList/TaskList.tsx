// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem"; 
import styles from "./TaskList.module.css";
import { deleteTask, updateTaskStatus, fetchTasksByCategory } from "../../services/taskService";

interface Task {
  _id: string;
  title: string;
  category: string;
  status: string;
  dueDate: string;
  createdAt: string;
}

interface ListProps {
  category: string; 
}

const TaskList: React.FC<ListProps> = ({ category }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from the service
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await fetchTasksByCategory(category);
        setTasks(tasksData); // Set the fetched tasks in state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (category) {
      loadTasks(); // Fetch tasks when category changes
    }
  }, [category]);

  // Handle task deletion
  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId); // Delete task from the backend
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle task status toggle
  const handleToggleComplete = async (taskId: string, currentStatus: string) => {
    try {
      // Directly toggle status without additional checks
      const task = tasks.find((t) => t._id === taskId);
      if (!task) return;

      const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
      await updateTaskStatus(taskId, newStatus); // Update backend status

      // Update the status in the UI after successful backend call
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  return (
    <div className={styles.taskWrap}>
      {tasks.length === 0 ? (
        <p>No tasks available in this category.</p>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onToggleComplete={handleToggleComplete} 
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
