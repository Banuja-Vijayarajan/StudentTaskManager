import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import { auth } from "../firebaseConfig";
import { getTasks } from "../services/taskService";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    async function loadTasks() {

        if (!auth.currentUser) return;

        const data = await getTasks(auth.currentUser.uid);

        setTasks(data);
    }

    useEffect(() => {

        loadTasks();

    }, []);

    return (

        <>

            <Navbar />

            <div style={{ padding: "40px" }}>

                <TaskForm onTaskAdded={loadTasks}/>

                <hr />

                <h2>My Tasks</h2>

                {tasks.map(task => (

                    <TaskCard
                        key={task.id}
                        task={task}
                        onTaskUpdated={loadTasks}
                    />

                ))}

            </div>

        </>

    );

}

export default Dashboard;