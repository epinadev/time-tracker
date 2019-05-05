import React,{ useState, createContext } from 'react';

export const TaskContext = createContext();
export const TaskProvider = props => {

    const [ tasks, setTasks ] = useState([]);
    const addTask = task => setTasks([...tasks, task])


    return(
        <TaskContext.Provider value={{tasks, addTask}}>
            {props.children}
        </TaskContext.Provider>
    )
}