import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import moment from 'moment';
import { TaskContext } from '../store/TaskContext';

let interval;
const styles = theme => ({
    timerContainer: {
        display: 'flex',
        justifyContent:  'center'
    },
    timerCircle: {
        margin: 23,
        border: '5px dotted #494463',
        display: 'flex',
        alignContent: 'center',
        borderRadius: '50%',
        width: '15vw',
        height: '15vw'
    },
    buttons: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    timerSecs: {
        fontSize: '6vw',
        marginTop: '13%',
        fontWeight: 'bold',
        borderBottom: '0.5px solid #dad7d7'
    },
    timerSecsSpan: {
        fontSize: '3vw',
        color: '#AAA'
    },
    timerTime: {
        color: '#76768a'
    },
    timer: {
        color: '#494463',
        position: 'relative',
        top: '50%',
        left: '50%',
        width: '100%',
        fontSize: '3vw',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
        margin: 0
    }
})

function StopWatch(props) {
    const { 
        addTask, 
        startRunningTask, 
        stopRunningTask, 
        getRunningTask, 
        getModelTask } = useContext(TaskContext);
    const { classes } = props;
    const timer = getRunningTask() || getModelTask();

    const startTimer = () => {
        const newTask = {...timer, state: 'running', start: moment().format()}
        addTask(newTask);
        startRunningTask(newTask);
    }

    const stopTimer = mode => {
        stopRunningTask()
    }
    
    return(
        <React.Fragment>
            <div className={classes.timerContainer}>
                <div className={classes.timerCircle}>
                    <div className={classes.timer}>
                        <div className={classes.timerSecs}>
                            {timer.secs}
                            <span className={classes.timerSecsSpan}>s</span>
                        </div>
                        <div className={classes.timerTime}>
                            {`${timer.hours}:${timer.mins}`}
                        </div>
                    </div> 
                </div> 
            </div>
           <div className={classes.buttons}>
            { timer.state === 'non-started' ? (
                <Fab 
                    size="large" 
                    onClick={startTimer} 
                    color="primary" 
                    className={classes.fab}>
                        <PlayArrow/>
                </Fab>
            ) : (
                <Fab 
                    size="large" 
                    onClick={stopTimer} 
                    color="secondary" 
                    className={classes.fab}>
                        <Stop/>
                </Fab>
            )}
           </div>
        </React.Fragment>
    ) 
}

export default withStyles(styles)(StopWatch);