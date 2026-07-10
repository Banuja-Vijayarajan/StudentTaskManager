import { toggleTask } from "../services/taskService";
import { deleteTask } from "../services/taskService";

function TaskCard({ task, onTaskUpdated }) {

    async function handleToggle() {

        await toggleTask(task.id, task.completed);

        onTaskUpdated();

    }

    return (

        <div
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "10px"
            }}
        >

            <h3
                style={{
                    textDecoration: task.completed ? "line-through" : "none"
                }}
            >
                {task.title}
            </h3>

            <p>{task.description}</p>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button onClick={handleToggle}>
                    {task.completed ? "Completed ✅" : "Mark Complete"}
                </button>

                <button onClick={handleDelete}>
                    Delete
                </button>
            </div>

        </div>

    );

}

async function handleDelete(){

    const confirmDelete=window.confirm(

        "Delete this task?"

    );

    if(!confirmDelete)return;

    await deleteTask(task.id);

    onTaskUpdated();

}

export default TaskCard;