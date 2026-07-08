import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {

    return (

        <>

            <Navbar />

            <div style={{padding:"40px"}}>

                <TaskForm />

                <hr />

                <h2>My Tasks</h2>

                <TaskCard />

                <TaskCard />

                <TaskCard />

            </div>

        </>

    );

}

export default Dashboard;