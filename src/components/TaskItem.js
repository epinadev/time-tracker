import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import TaskItemControls from "./TaskItemControls";
import Input from '@material-ui/core/Input';
import { TaskContext } from '../store/TaskContext';
import _ from 'lodash';


const styles = theme => ({
    item: {
        display: 'flex',
        backgroundColor: '#FFF',
        margin: 7,
        padding:7,
        borderRadius: '10px !important',
        boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.01), 0px 6px 10px 0px rgba(0, 0, 0, 0), 0px 1px 18px 0px rgba(0, 0, 0, 0.08)',
        '&:before': {
            content: 'unset !important'
        }
    },
    taskTime: {
        width: 110,
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRight: '4px solid green'
    },
    startTime: {
        color: '#321db1',
        fontSize: 18,
        fontWeight: 'bold'
    },
    stopTime: {
        color: '#aba2a2',
        fontSize: 13,
    },
    info: {
        width: '100%',
        marginLeft: 40
    },
    divider: {
        borderRadius: 50,
        backgroundColor: 'green',
        width:5 
    },
    inputCategory: {
        color: '#aba2a2',
        fontSize: 14,
    },
    inputDescription: {
        color: '#59527d',
        fontSize: 15
    }
})

function TaskItem(props) {
    const { task, classes } = props;
    const { editTask } = useContext(TaskContext);
    const startTime = task.start ? moment(task.start).format('HH:mm') : '00:00';
    const stopTime = task.stop ? moment(task.stop).format('HH:mm') : '00:00';
    const debouncedEdit = _.debounce((key, value) => editTask({ ...task, [key]: value }), 1000)
    const handleCategory = event => {
        const { value } = event.currentTarget
        debouncedEdit('category', value);
    }

    const handleDescription = event => {
        const { value } = event.currentTarget
        debouncedEdit('description', value);
    }

    return(
        <div className={classes.item} >
            <div className={classes.taskTime}>
                <div className={classes.startTime}>{startTime}</div>
                <div className={classes.stopTime}>{stopTime}</div>
            </div>
            <div className={classes.divider}></div>
            <div className={classes.info}>
                <div className={classes.category}>
                    <Input
                        disableUnderline
                        fullWidth
                        placeholder="Add a category"
                        defaultValue={task.category}
                        onChange={handleCategory}
                        className={classes.inputCategory}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </div>
                <div className={classes.description}>
                <Input
                    disableUnderline
                    fullWidth
                    multiline
                    placeholder="Describe your task here"
                    defaultValue={task.description}
                    onChange={handleDescription}
                    className={classes.inputDescription}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    />
                </div>

            </div>
            <TaskItemControls task={task}/>
        </div>
    ) 
}

export default withStyles(styles)(TaskItem);