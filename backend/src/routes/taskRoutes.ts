import express, { Request, Response, Router } from "express";
import Task from "../models/taskModel";

const router = Router(); 

// GET all tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Get by cattegory
router.get("/category/:category", async (req: any, res: any) => {
  try {
    const tasks = await Task.find({ category: req.params.category });

    if (!tasks.length) {
      return res.status(404).json({ message: `No tasks found for category: ${req.params.category}` });
    }

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching tasks by category" });
  }
});


// POST - Add a new task
router.post("/", async (req: Request, res: Response) => {
  try {
    const newTask = new Task(req.body); // Assuming request contains task data
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Error creating task" });
  }
});

// PUT - Update a task by ID
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
  
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Error updating task" });
    }
  });
  
  

// DELETE - Remove a task by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
  
      if (!deletedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
  
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task" });
    }
  });
  
export default router;
