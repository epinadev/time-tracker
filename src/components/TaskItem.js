import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import TaskItemControls from "./TaskItemControls";
import TaskItemDuration from "./TaskItemDuration";

const styles = theme => ({
    item: {
        backgroundColor: '#FFF',
        height: 68,
        display: 'flex',
        margin: 7,
        borderRadius: 10,
        padding: 10,
        boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.01), 0px 6px 10px 0px rgba(0, 0, 0, 0), 0px 1px 18px 0px rgba(0, 0, 0, 0.08)'
    },
    taskTime: {
        marginLeft: 10,
        paddingRight: 20,
        paddingTop: 6,
    },
    info: {
        width: '100%',
        marginLeft: 40
    },
    startTime: {
        color: '#321db1',
        fontSize: 18,
        fontWeight: 'bold'
    },
    stopTime: {
        color: '#aba2a2',
        textAlign: 'right',
        fontSize: 13,
    },
    divider: {
        borderRadius: 50,
        backgroundColor: 'blue',
        width: '3.5px'
    },
    description: {
        marginTop: 5,
        color: '#59527d',
        fontSize: 15
    },
    category: {
        color: '#aba2a2',
        fontSize: 14,
    },
    rightMenu: {
        width: '20%',
        display: 'flex',
        alignItems: 'center'
    }
})

function TaskItem(props) {
    const { task, classes } = props;
    const [ isHovering, setHover ] = useState(false);
    const startTime = task.start ? moment(task.start).format('HH:mm') : '00:00';
    const stopTime = task.stop ? moment(task.stop).format('HH:mm') : '00:00';

    return(
        <React.Fragment>
            <div className={classes.item} 
                   onMouseEnter={() => setHover(true)}
                   onMouseLeave={() => setHover(false)}>
                <div className={classes.taskTime}>
                    <div className={classes.startTime}>{startTime}</div>
                    <div className={classes.stopTime}>{stopTime}</div>
                </div>
                <div className={classes.divider}></div>
                <div className={classes.info}>
                    <div className={classes.category}>{task.category}</div>
                    <div className={classes.description}>{task.description}</div>
                </div>
                <div className={classes.rightMenu}>{ 
                    isHovering &&
                    <TaskItemControls task={task}/> || 
                    <TaskItemDuration hours={task.hours} mins={task.mins} secs={task.secs}/>
                    }
                </div>
            </div>
        </React.Fragment>
    ) 
}

export default withStyles(styles)(TaskItem);