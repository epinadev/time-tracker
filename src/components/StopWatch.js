import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import moment from 'moment';
import { TaskContext } from '../store/TaskContext';
import { TaskHelper } from '../store/Settings';

const styles = theme => ({
    timerContainer: {
        display: 'flex',
        justifyContent:  'center'
    },
    timerCircle: {
        margin: 23,
        border: '2.5px solid #494463',
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
    timerTime: {
        fontSize: '4.5vw',
        marginTop: '27%',
        fontWeight: 'bold',
        borderBottom: '0.5px solid #dad7d7'
    },
    timerSecsSpan: {
        fontSize: '1.6vw',
        color: '#AAA'
    },
    timerSecs: {
        fontSize: '3.6vw',
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
        startRunningTask, 
        stopRunningTask, 
        getRunningTask, 
        getModelTask } = useContext(TaskContext);
    const { classes } = props;
    const timer = getRunningTask() || getModelTask();

    const startTimer = () => {
        startRunningTask({
            ...timer, 
            state: 'running', 
            totalSeconds: 0,
            start: moment().format()
        });
    }

    const stopTimer = mode => {
        stopRunningTask()
    }
    
    return(
        <React.Fragment>
            <div className={classes.timerContainer}>
                <div className={classes.timerCircle}>
                    <div className={classes.timer}>
                        <div className={classes.timerTime}>
                            {`${timer.hours}:${timer.mins}`}
                        </div>
                        <div className={classes.timerSecs}>
                            {timer.secs}
                            <span className={classes.timerSecsSpan}>s</span>
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