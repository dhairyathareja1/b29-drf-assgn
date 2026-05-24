import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Projects from "./pages/projects";
import TaskBoard from "./pages/taskboard";
import TaskDetail from "./pages/taskdetail";
import Notifications from "./pages/notifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<TaskBoard />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
