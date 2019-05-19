import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskItem from './TaskItem';
import AgendaHeader from './AgendaHeader';
import { TaskContext } from "../store/TaskContext";
import { DialogProvider } from "../store/DialogContext";
import TaskDialog from "./TaskDialog";
import TaskItemGroup from './TaskItemGroup';
import moment from 'moment';

const styles = theme => ({
    content : {
        backgroundColor: 'white',
        overflowY: 'hidden',
        height: '100%'
    },
    agendaHeader: {
        width: '100%',
        display: 'flex'
    },
    tasksContainer: {
        height: '100%',
        overflowY: 'auto'
    },
    bottom: {
        height: 100,
    }
})

function Agenda({ classes }) {
    const { tasks } = useContext(TaskContext);
    const getGroup = date => date && moment(date).format('hh:00-MMMM DD');
    const getTaskItem = (id, group, state) => <TaskItemGroup 
                                                key={id + '-group'} 
                                                group={group} 
                                                state={state}/>
    const getAgendaItems = () => {
        if (tasks.length === 0) return [];
        let currentGroup = null;
        let taskItems = [];

        tasks.forEach(task => {
            if (task.state !== 'running') {
                if (currentGroup !== getGroup(task.start)) {
                    currentGroup = getGroup(task.start);
                    taskItems.push(getTaskItem(task.id, currentGroup, task.state))
                } 
                taskItems.push(<TaskItem task={task} key={task.id}/>);
            } else {
                taskItems.unshift(<TaskItem task={task} key={task.id}/>);
                taskItems.unshift(getTaskItem(task.id, currentGroup, task.state))
            } 
        })

        return taskItems;
    }

    return(
        <Grid item xs={10} className={classes.content}>
            <DialogProvider>
                <AgendaHeader/>
                    <div className={classes.tasksContainer}>
                        {getAgendaItems()}
                        <div className={classes.bottom}></div>
                    </div>
                <TaskDialog/>
            </DialogProvider>
        </Grid>
    ) 
}

export default withStyles(styles)(Agenda);