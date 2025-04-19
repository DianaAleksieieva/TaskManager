📋 Task Manager App
This is a full-stack Task Manager application built with React (TypeScript) for the frontend and Node.js with MongoDB for the backend.

The app allows users to manage their tasks with features like authentication, task creation, editing, filtering, and completion tracking. It's designed for personal productivity and can be extended into a collaborative team tool.

🔧 Tech Stack
Frontend: React, TypeScript, Tailwind CSS (optional)

Backend: Node.js, Express

Database: MongoDB (with Mongoose ODM)

Authentication: JWT-based Auth (optional if included)

API Communication: RESTful endpoints (Axios or Fetch)


![Home page](https://github.com/user-attachments/assets/fa92d87d-756a-494f-afd8-5f09168a2485)

🚀 How to Run the Project
📦 Prerequisites
Make sure you have the following installed:

Node.js (v18 or higher recommended)

MongoDB (local or Atlas)

🔧 Setup & Run
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/task-manager.git
cd task-manager
Install dependencies for both the frontend and the backend

bash
Copy
Edit
npm install
Set up environment variables
Create a .env file in the root directory and add:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the project (frontend + backend)

bash
Copy
Edit
npm start
The frontend will run at http://localhost:3000, and the backend API will be proxied automatically.
