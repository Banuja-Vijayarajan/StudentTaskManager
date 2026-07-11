import {

  Card,

  CardContent,

  Typography,

  Grid,

  Stack,

  LinearProgress,

  Chip

} from "@mui/material";

function Analytics({ tasks }) {

  const completed = tasks.filter(

    t=>t.completed

  ).length;

  const pending =

    tasks.length-completed;

  const progress=

    tasks.length===0

    ?0

    :Math.round(

      completed/

      tasks.length*100

    );

  const today=

    new Date()

    .toISOString()

    .split("T")[0];

  const dueToday=

    tasks.filter(

      t=>

      t.dueDate===today &&

      !t.completed

    );

  const overdue=

    tasks.filter(

      t=>

      t.dueDate &&

      t.dueDate<today &&

      !t.completed

    );

  const hour=

    new Date()

    .getHours();

  let greeting=

    "Good Evening 🌙";

  if(hour<12)

    greeting=

    "Good Morning ☀️";

  else if(hour<18)

    greeting=

    "Good Afternoon 🌤";

  return(

    <>

      <Card

        sx={{

          mb:4,

          borderRadius:5

        }}

      >

        <CardContent>

          <Typography

            variant="h4"

            fontWeight="bold"

          >

            {greeting}

          </Typography>

          <Typography

            color="text.secondary"

          >

            Stay productive today 🚀

          </Typography>

        </CardContent>

      </Card>

      <Grid

        container

        spacing={3}

      >

        <Grid

          size={{

            xs:12,

            md:4

          }}

        >

          <Card>

            <CardContent>

              <Typography

                variant="h6"

              >

                🎯 Progress

              </Typography>

              <LinearProgress

                variant="determinate"

                value={progress}

                sx={{

                  mt:3,

                  height:12,

                  borderRadius:10

                }}

              />

              <Typography

                mt={2}

                fontWeight="bold"

              >

                {progress}%

              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid

          size={{

            xs:12,

            md:4

          }}

        >

          <Card>

            <CardContent>

              <Typography

                variant="h6"

              >

                📅 Due Today

              </Typography>

              <Stack

                spacing={1}

                mt={2}

              >

                {

                  dueToday.length===0

                  ?

                  <Typography

                    color="text.secondary"

                  >

                    Nothing Due 🎉

                  </Typography>

                  :

                  dueToday.map(

                    task=>(

                      <Chip

                        key={task.id}

                        label={task.title}

                        color="primary"

                      />

                    )

                  )

                }

              </Stack>

            </CardContent>

          </Card>

        </Grid>

        <Grid

          size={{

            xs:12,

            md:4

          }}

        >

          <Card>

            <CardContent>

              <Typography

                variant="h6"

              >

                🚨 Overdue

              </Typography>

              <Stack

                spacing={1}

                mt={2}

              >

                {

                  overdue.length===0

                  ?

                  <Typography

                    color="text.secondary"

                  >

                    No overdue tasks

                  </Typography>

                  :

                  overdue.map(

                    task=>(

                      <Chip

                        key={task.id}

                        label={task.title}

                        color="error"

                      />

                    )

                  )

                }

              </Stack>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </>

  );

}

export default Analytics;