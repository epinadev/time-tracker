import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';
import moment from 'moment';
import { v4 } from 'uuid';

let interval;
const styles = theme => ({
    buttons: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    stopWatch: {
        color: '#494463',
        fontSize: 60,
        width: '100%',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20
}})

function StopWatch(props) {
    const { classes, addTask } = props;
    const getDefaultState = () => ({
        id: v4(),
        state: 'non-started',
        start: false,
        stop: false,
        duration: '00:00:00',
        description: 'Empty Task',
        seconds: 0
    })
    const [timer, setTimer] = useState(getDefaultState());

    const addPadding = value => value.toString().length === 1 ? `0${value}` : value;

    const getTimerText = () => {
        let hours = Math.floor(timer.seconds / 3600);
        let remainingSecs = timer.seconds - hours * 3600;
        let minutes = Math.floor(remainingSecs / 60);
        let seconds = remainingSecs - minutes * 60;

        return `${addPadding(hours)}:${addPadding(minutes)}:${addPadding(seconds)}`;
    } 

    const startTimer = () => {
        setTimer(prevTimer => ({ 
            ...prevTimer,
            state: 'running',
            seconds: timer.seconds += 1,
            start: moment().format(),
            duration: getTimerText(),
        }));

        interval = setInterval(() => {
            setTimer(prevTimer => ({
                ...prevTimer,
                seconds: timer.seconds += 1,
                duration: getTimerText()
            }))
        },1000)
    }

    const stopTimer = mode => {
        addTask({
            ...timer, 
            stop: moment().format(),
            duration: getTimerText(),
            state: 'stopped'
        })
        setTimer(getDefaultState());
        clearInterval(interval)
    }
    
    return(
        <React.Fragment>
           <div className={classes.stopWatch}>{ timer.duration }</div> 
           <div className={classes.buttons}>
            { timer.state === 'non-started' ? (
                <Fab variant="extended" 
                    size="large" 
                    onClick={startTimer} 
                    color="primary" 
                    className={classes.fab}>
                        <PlayArrow/> Start task
                </Fab>
            ) : (
                <Fab variant="extended" 
                    size="large" 
                    onClick={stopTimer} 
                    color="secondary" 
                    className={classes.fab}>
                        <Stop/> Stop Task 
                </Fab>
            )}
           </div>
        </React.Fragment>
    ) 
}

export default withStyles(styles)(StopWatch);