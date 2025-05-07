import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import EmployeeManagment from "./pages/EmployeeManagment";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>,
        index: true,
    },
    {
        path: "/app",
        element: <AppLayout />,
        children: [
            {path:"app", element: <HomePage />,},
            { path: "projects", element: <Projects /> },
            { path: "tasks", element: <Tasks /> },
            { path: "employee-management", element: <EmployeeManagment /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;