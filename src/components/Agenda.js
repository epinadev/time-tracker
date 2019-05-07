import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskItem from './TaskItem';
import AgendaHeader from './AgendaHeader';
import { TaskContext } from "../store/TaskContext";

const styles = theme => ({
    content : {
        backgroundColor: '#f4f3ff'
    },
    agendaHeader: {
        width: '100%',
        display: 'flex'
    }
})

function Agenda({ classes }) {
    const { tasks } = useContext(TaskContext);

    console.log(tasks)

    return(
        <Grid item xs={9} className={classes.content}>
            <AgendaHeader/>
            { tasks.map(task => <TaskItem task={task} key={task.id}/>) }
        </Grid>
    ) 
}

export default withStyles(styles)(Agenda);