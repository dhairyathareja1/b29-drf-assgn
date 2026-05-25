# Creative Studio Workflow System 

A full-stack web application designed for creative studios to efficiently manage projects, content workflows, and team collaboration. The platform supports multiple isolated studios and provides robust role-based access control to ensure seamless team management.

##  Features

- **Studio & Project Management**: Isolated environments for different studios to manage projects like posters, videos, and campaigns.
- **Role-Based Access Control (RBAC)**: Tailored roles including Studio Admin, Project Lead, Designer, Writer, Reviewer, and Client Viewer.
- **Task & Workflow Tracking**: Create tasks and move them through customizable stages (`Draft`, `Review`, `Revision`, `Approved`, `Completed`).
- **Prioritization & Deadlines**: Assign tasks to team members, set priorities (`Low`, `Medium`, `High`), and manage deadlines.
- **Collaboration**: Engage in comments and feedback threads directly on specific tasks.
- **Search & Filtering**: Quickly locate projects and tasks with advanced filtering options.
- **Notifications**: Stay updated with alerts for important actions and workflow events.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Django REST Framework (Python)
- **Database**: SQLite (Default)
- **Authentication**: JWT (JSON Web Tokens) via SimpleJWT

---

## Setup & Run Instructions

To manually run this project locally, you will need to start both the backend server and the frontend server in two separate terminal windows.

### 1. Backend (Django)
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
# For Linux/macOS
python3 -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
venv\Scripts\activate
```

Install the required dependencies:
```bash
pip install -r requirements.txt
```

Run the database migrations to set up your tables:
```bash
python manage.py migrate
```

Start the Django development server:
```bash
python manage.py runserver
```
*The backend will now be running on http://127.0.0.1:8000/*

### 2. Frontend (React/Vite)
Open a **new** terminal window and navigate to the `frontend` folder:
```bash
cd frontend
```

Install the Node.js dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```

*The frontend will now be running on http://localhost:5173/. Open this URL in your browser to view the app!*


---

## Demo

(Raw unedited video link) -> https://drive.google.com/file/d/1LmeUs1cXPuP6tZxj3MCOTA_A2QfZ13zU/view?usp=sharing
Editing in progress
