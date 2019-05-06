import React,{ useState, createContext } from 'react';
import {v4} from 'uuid';
import moment from 'moment';

let interval;
export const TaskContext = createContext();
export const TaskProvider = props => {
    const [ tasks, setTasks ] = useState([]);
    const getModelTask = () => ({
        id: v4(),
        state: 'non-started',
        start: false,
        stop: false,
        duration: '00:00:00',
        hours: '00',
        mins: '00',
        secs: '00',
        description: 'Empty Task',
        category: 'None',
        totalSeconds: 0
    })
    const getRunningTask = () => tasks.find(t => t.state === 'running');
    const getTask = id => tasks.find(t => t.id === id);
    const addTask = task => setTasks([...tasks, task]) 
    const addFutureTask = description => {
        const ntask = getModelTask();
        ntask.description = description;
        setTasks([...tasks, ntask])
    } 
    const editTask = task => {
        const index = tasks.findIndex(t => t.id === task.id);
        tasks[index] = task;
        setTasks([...tasks])
    }
    const deleteTask = task => {
        setTasks(tasks.filter(t => t.id !== task.id));
        if(task.state === 'running') {
            clearInterval(interval)
        } 
    }

    const getPaddedTime = totalSeconds => {
        const addPadding = value => value.toString().length === 1 ? `0${value}` : value;
        const hours = Math.floor(totalSeconds / 3600);
        const remainingSecs = totalSeconds - hours * 3600;
        const minutes = Math.floor(remainingSecs / 60);
        const seconds = remainingSecs - minutes * 60;

        return { 
            hours: addPadding(hours),
            mins: addPadding(minutes),
            secs: addPadding(seconds),
        }
    } 

    const startRunningTask = task => {
        editTask({ 
            ...task,
            state: 'running',
            totalSeconds: 1,
            start: moment().format(),
            ...getPaddedTime(1),
        });

        interval = setInterval(() => {
            const running = getRunningTask()
            editTask({ 
                ...running,
                totalSeconds: running.totalSeconds += 1,
                start: moment().format(),
                ...getPaddedTime(running.totalSeconds += 1),
            });
        },1000)
    }

    const stopRunningTask = () => {
        const runningTask = getRunningTask();
        editTask({
            ...runningTask, 
            stop: moment().format(),
            ...getPaddedTime(runningTask.totalSeconds),
            state: 'stopped'
        })
        clearInterval(interval)
    }
    const properties = {
        tasks,
        getTask,
        addFutureTask,
        addTask,
        editTask,
        getModelTask,
        getRunningTask,
        startRunningTask,
        stopRunningTask,
        deleteTask,
    }

    return(
        <TaskContext.Provider value={properties}>
            {props.children}
        </TaskContext.Provider>
    )
}