import React from "react";
import TaskList from "../TaskList/TaskList"; 
import styles from "./Dashboard.module.css"

const Dashboard: React.FC = () => {
  const categories = ["Work", "Personal", "Study", "Health", "Finance"]; // Static categories

  return (
    <div className={styles.dashboard}>
      <div className={styles.categoryContainer}>
        {categories.map((category) => (
          <div key={category} className={styles.categorySection}>
            <h2>{category}</h2>
            {/* Render TaskList for each category */}
            <TaskList category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
