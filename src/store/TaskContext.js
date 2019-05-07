import React,{ useState, createContext, useRef, useEffect } from 'react';
import {v4} from 'uuid';
import moment from 'moment';

let interval;
export const TaskContext = createContext();
export const TaskProvider = props => {
    const intervalRef = useRef();
    const [ tasks, setTasks ] = useState([]);
    const getModelTask = () => ({
        id: v4(),
        state: 'non-started',
        parent: false,
        start: false,
        stop: false,
        hours: '00',
        mins: '00',
        secs: '00',
        description: '',
        category: '',
        totalSeconds: 0
    })
    const getRunningTask = () => tasks.find(t => t.state === 'running');
    const getTask = id => tasks.find(t => t.id === id);
    const addTask = task => {
        const ntask = task ? {...task } : getModelTask();
        setTasks(prevTasks => [...prevTasks, ntask])
    } 
    const editTask = task => {
        console.log('Editing', task)
        setTasks(prevTasks => {
            const index = prevTasks.findIndex(t => t.id === task.id);
            prevTasks[index] = task;
            return [...prevTasks];
        })
    }
    const duplicateTask = id => {
        const parent = getTask(id);
        addTask({
            ...getModelTask(), 
            description: parent.description,
            category: parent.category,
            parent: parent.id || id,
        })
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
    const intervalCallback = () => {
        const running = getRunningTask()
        const seconds = running.totalSeconds +=1;
        editTask({ 
            ...running,
            totalSeconds: seconds,
            ...getPaddedTime(seconds),
        });
    }

    useEffect(() => {
        intervalRef.current = intervalCallback;
    })

    const startRunningTask = task => {
        const running = getRunningTask();
        if (!running) {
            getTask(task.id) 
                ? editTask({ 
                        ...task,
                        state: 'running',
                        totalSeconds: 0,
                        start: moment().format(),
                        ...getPaddedTime(0),
                    })
                : addTask(task)
            interval = setInterval(() => { intervalRef.current() },1000)
        }
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
        addTask,
        editTask,
        getModelTask,
        duplicateTask,
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