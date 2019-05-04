import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';

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

function StopWatch({ classes }) {
    const [timer, setTimer] = useState({ 
        seconds: 0,
        text: '00:00:00', 
        isRunning: false 
    });

    const addPadding = value => value.toString().length === 1 ? `0${value}` : value;

    const getTimerText = () => {
        let hours = Math.floor(timer.seconds / 3600);
        let remainingSecs = timer.seconds - hours * 3600;
        let minutes = Math.floor(remainingSecs / 60);
        let seconds = remainingSecs - minutes * 60;

        return `${addPadding(hours)}:${addPadding(minutes)}:${addPadding(seconds)}`;
    } 

    const playTimer = () => {
        if (timer.isRunning) {
            setTimer({ 
                isRunning: false,
                seconds: timer.seconds, 
                text: getTimerText()
            });
            clearInterval(interval)
        } else {
            interval = setInterval(() => {
                setTimer({ 
                    isRunning: true,
                    seconds: timer.seconds += 1,
                    text: getTimerText()
                });
            },1000)
        }
    }

    const stopTimer = () => {
        setTimer({ 
            isRunning: false,
            seconds: 0,
            text: '00:00:00'
        });
        clearInterval(interval)
    }



    return(
        <React.Fragment>
           <div className={classes.stopWatch}>{ timer.text }</div> 
           <div className={classes.buttons}>
            <Fab variant="extended" 
                size="large" 
                onClick={playTimer} 
                color="primary" 
                className={classes.fab}>
                { timer.isRunning ? <Pause/> : <PlayArrow/>}
                { timer.isRunning ? ' Pause' : ' Start'}
             </Fab>
            <Fab variant="extended" 
                    disabled={!timer.isRunning}
                    size="large" 
                    onClick={stopTimer} 
                    color="secondary" 
                    className={classes.fab}>
                <Stop/> Stop
             </Fab>
           </div>
        </React.Fragment>
    ) 
}

export default withStyles(styles)(StopWatch);