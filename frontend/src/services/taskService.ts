// src/services/taskService.ts
import axios from "axios";


const BASE_URL = "http://localhost:5001/api/tasks"; 
// Fetch tasks by category

export const fetchTasks = async (category: string) => {
  try {
    // Correct URL format for category
    const response = await fetch(`${BASE_URL}/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks for category: ${category}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
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
    const response = await axios.put(`${BASE_URL}/${taskId}`, { status: newStatus });
    return response.data;
  } catch (error) {
    throw new Error("Error updating task status");
  }
};