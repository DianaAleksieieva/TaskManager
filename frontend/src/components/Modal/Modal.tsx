import React, { useState } from "react";
import { createTask } from "../../services/taskService";
import styles from "./Modal.module.css";

enum Category {
  Work = "Work",
  Personal = "Personal",
  Study = "Study",
  Health = "Health",
  Finance = "Finance",
}

interface ModalProps {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const [task, setTask] = useState({
    title: "",
    category: "",
    dueDate: "",
    status: "in-progress", // Status field set to 'in-progress' by default
    createdAt: new Date().toISOString(), // Automatically set current timestamp
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createTask(task); // Send the task data to the backend
      closeModal(); // Close modal after successful task creation
    } catch (error) {
      console.error("Error creating task:", error);
      // Optionally, handle the error (e.g., show a message to the user)
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add New Task</h2>
        <div className={styles.inputWrap}>
          <input
            className={styles.modalInput}
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleInputChange}
          />
          <select
            className={styles.selectButton}
            name="category"
            value={task.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {Object.values(Category).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
          className={styles.modalInput}
            type="datetime-local"
            name="dueDate"
            value={task.dueDate}
            onChange={handleInputChange}
          />
          <div className={styles.buttons}>
            <button onClick={handleSubmit} className={styles.createButton}>
              Create Task
            </button>
            <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
