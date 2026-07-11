import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Analytics from "../components/Analytics";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import { auth } from "../firebaseConfig";
import { subscribeToTasks } from "../services/taskService";

import {
  Box,
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Card,
  CardContent,
  InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {

    if (!auth.currentUser) return;

    const unsubscribe = subscribeToTasks(

      auth.currentUser.uid,

      (data) => {

        setTasks(data);

      }

    );

    return () => unsubscribe();

  }, []);

  const completedTasks = tasks.filter(

    task => task.completed

  ).length;

  const pendingTasks =

    tasks.length - completedTasks;

  const filteredTasks = tasks.filter(task => {

    const matchesSearch =

      task.title

        .toLowerCase()

        .includes(search.toLowerCase())

      ||

      task.description

        .toLowerCase()

        .includes(search.toLowerCase());

    const matchesCategory =

      categoryFilter === "All"

      ||

      task.category === categoryFilter;

    return matchesSearch && matchesCategory;

  });

  return (

    <>

      <Navbar />

      <Box

        sx={{

          maxWidth: 1300,

          mx: "auto",

          p: 4

        }}

      >

        <Analytics tasks={tasks} />

        <Grid

          container

          spacing={3}

          sx={{ mt: 4, mb: 4 }}

        >

          <Grid size={{ xs:12, md:4 }}>

            <Card>

              <CardContent>

                <Typography

                  variant="h6"

                >

                  📋 Total Tasks

                </Typography>

                <Typography

                  variant="h3"

                  fontWeight="bold"

                >

                  {tasks.length}

                </Typography>

              </CardContent>

            </Card>

          </Grid>

          <Grid size={{ xs:12, md:4 }}>

            <Card>

              <CardContent>

                <Typography

                  variant="h6"

                >

                  ✅ Completed

                </Typography>

                <Typography

                  variant="h3"

                  fontWeight="bold"

                >

                  {completedTasks}

                </Typography>

              </CardContent>

            </Card>

          </Grid>

          <Grid size={{ xs:12, md:4 }}>

            <Card>

              <CardContent>

                <Typography

                  variant="h6"

                >

                  ⏳ Pending

                </Typography>

                <Typography

                  variant="h3"

                  fontWeight="bold"

                >

                  {pendingTasks}

                </Typography>

              </CardContent>

            </Card>

          </Grid>

        </Grid>

        <Divider sx={{ mb: 4 }} />

        <TaskForm />

        <Divider sx={{ my: 4 }} />

        <Typography

          variant="h5"

          fontWeight="bold"

          gutterBottom

        >

          My Tasks

        </Typography>

        <Grid

          container

          spacing={2}

          sx={{ mb: 4 }}

        >

          <Grid size={{ xs:12, md:8 }}>

            <TextField

              fullWidth

              placeholder="Search tasks..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              InputProps={{

                startAdornment:(

                  <InputAdornment position="start">

                    <SearchIcon/>

                  </InputAdornment>

                )

              }}

            />

          </Grid>

          <Grid size={{ xs:12, md:4 }}>

            <TextField

              select

              fullWidth

              label="Category"

              value={categoryFilter}

              onChange={(e)=>setCategoryFilter(e.target.value)}

            >

              <MenuItem value="All">

                All

              </MenuItem>

              <MenuItem value="Study">

                📚 Study

              </MenuItem>

              <MenuItem value="Programming">

                💻 Programming

              </MenuItem>

              <MenuItem value="Work">

                💼 Work

              </MenuItem>

              <MenuItem value="Personal">

                🏠 Personal

              </MenuItem>

            </TextField>

          </Grid>

        </Grid>

        {

          filteredTasks.length===0

          ?

          <Card

            sx={{

              textAlign:"center",

              p:6

            }}

          >

            <Typography

              variant="h5"

              gutterBottom

            >

              🚀 No Tasks Found

            </Typography>

            <Typography

              color="text.secondary"

            >

              Add your first task and start being productive!

            </Typography>

          </Card>

          :

          filteredTasks.map(task=>(

            <TaskCard

              key={task.id}

              task={task}

            />

          ))

        }

      </Box>

    </>

  );

}

export default Dashboard;