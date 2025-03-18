import { createBrowserRouter } from "react-router-dom"; // תיקון ייבוא Outlet
import AppLayout from "../components/AppLayout";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import EmployeeManagment from "./pages/EmployeeManagment";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { element: <HomePage />, index: true },
            { path: "Projects", element: <Projects /> },
            { path: "Tasks", element: <Tasks /> },
            { path: "EmployeeManagment", element: <EmployeeManagment /> },
            // { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;