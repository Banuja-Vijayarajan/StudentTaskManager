import { useState } from "react";
import { addTask } from "../services/taskService";
import { auth } from "../firebaseConfig";

function TaskForm({ onTaskAdded }) {

    const [title,setTitle]=useState("");

    const [description,setDescription]=useState("");

    async function handleAddTask(){

        if(!title){

            alert("Enter task title");

            return;

        }

        try{

            await addTask({

                title,

                description,

                completed: false,

                createdAt: new Date(),

                userId: auth.currentUser.uid

            });

            onTaskAdded();

            alert("Task Added!");

            setTitle("");

            setDescription("");

        }

        catch(error){

            alert(error.message);

        }

    }

    return(

        <div>

            <h2>Add New Task</h2>

            <input

                placeholder="Task Title"

                value={title}

                onChange={(e)=>setTitle(e.target.value)}

            />

            <br/><br/>

            <textarea

                placeholder="Task Description"

                value={description}

                onChange={(e)=>setDescription(e.target.value)}

            />

            <br/><br/>

            <button

                onClick={handleAddTask}

            >

                Add Task

            </button>

        </div>

    );

}

export default TaskForm;