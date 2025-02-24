// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem"; 
import styles from "./TaskList.module.css";
import {deleteTask, updateTaskStatus } from "../../services/taskService";

interface TaskList {
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
  const [tasks, setTasks] = useState<TaskList[]>([]);
  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (taskId: string, currentStatus: string) => {
    try {
      // Ensure the UI reflects the correct status before toggling
      const task = tasks.find((t) => t._id === taskId);
      if (!task) return;
  
      if (task.status !== currentStatus) {
        console.warn("Mismatch between UI and backend status, refreshing tasks...");
        // Optionally, trigger a re-fetch from the backend here
        return;
      }
  
      const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
      await updateTaskStatus(taskId, newStatus); // Call backend
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      ); // Update UI
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };
  

  useEffect(() => {
    const fetchTasksByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/tasks/category/${category}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks for category: ${category}`);
        }
        const tasksData = await response.json();
        setTasks(tasksData); // Set the fetched tasks in state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasksByCategory();
  }, [category]); // The effect runs every time the category changes

  return (
    <div className={styles.taskWrap}>
      {tasks.length === 0 ? (
        <p>No tasks available in this category.</p>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} onToggleComplete={handleToggleComplete} onDelete={handleDelete}/>
          ))}
        </ul>
      )}
    </div>
    
  );
};

export default TaskList;
