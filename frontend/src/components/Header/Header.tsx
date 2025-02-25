import React, { useState } from 'react'; 
import styles from './Header.module.css'; 
import Modal from "../Modal/Modal"; 

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className={styles.header}>
      <p className={styles.logo}>Task Manager</p>
      <button onClick={toggleModal} className={styles.addButton}>Add Task</button>
      {isModalOpen && <Modal closeModal={toggleModal} />}
    </header>
  );
};

export default Header;
