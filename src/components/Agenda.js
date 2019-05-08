import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskItem from './TaskItem';
import AgendaHeader from './AgendaHeader';
import { TaskContext } from "../store/TaskContext";

const styles = theme => ({
    content : {
        backgroundColor: '#f4f3ff',
        backgroundColor: '#fff',
        // background: 'url(https://images.pexels.com/photos/207301/pexels-photo-207301.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)',
        overflowY: 'hidden'
    },
    agendaHeader: {
        width: '100%',
        display: 'flex'
    },
    tasksContainer: {
        height: '100%'
    }
})

function Agenda({ classes }) {
    const { tasks } = useContext(TaskContext);

    return(
        <Grid item xs={9} className={classes.content}>
            <AgendaHeader/>
            <div className={classes.tasksContainer}>
                <div>
                { tasks.map(task => <TaskItem task={task} key={task.id}/>) }
                </div>
            </div>
        </Grid>
    ) 
}

export default withStyles(styles)(Agenda);