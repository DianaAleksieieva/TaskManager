// src/services/taskService.ts
import axios from "axios";

const BASE_URL = "http://localhost:5001/api/tasks";
// Fetch tasks by category

export const fetchTasksByCategory = async (category: string) => {
  const response = await fetch(`${BASE_URL}/category/${category}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks for category: ${category}`);
  }
  return response.json(); // Return tasks array
};

// Delete a task
export const deleteTask = async (taskId: string) => {
  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
};

// Mark task as completed
export const markTaskAsCompleted = async (taskId: string) => {
  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Completed" }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task status");
  }
  return response.json();
};

export const updateTaskStatus = async (taskId: string, newStatus: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/${taskId}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating task status");
  }
};

export const createTask = async (task: {
  title: string;
  category: string;
  dueDate: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Error creating task");
    }

    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
