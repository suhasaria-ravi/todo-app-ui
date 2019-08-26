import axios from "axios";

import {
  GET_ERRORS,
  GET_TODO_TASKS,
  DELETE_TODO_TASK,
  GET_TODO_TASK ,
  UPDATE_INLINE_TASK,
  DELETE_ERROR_TASK
} from "./types";

export const addTodoTask = (todo_task, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/app/api/add", todo_task);
    history.push("/");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {    
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};

export const updateTodoTask = (todo_task, pt_id, history) => async dispatch => {
  try {
    if (history) {
      await axios.put(`http://localhost:8080/app/api/todo/update/${pt_id}`, todo_task);
      history.push("/");
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    }
    else {

      const res = await axios.put(`http://localhost:8080/app/api/todo/update/${pt_id}`, todo_task);

      dispatch({
        type: UPDATE_INLINE_TASK,
        payload: res.data
      });
    }
  } catch (error) {
        
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};


export const getBacklog = () => async dispatch => {  
  const res = await axios.get("http://localhost:8080/app/api/todos");
  dispatch({
    type: GET_TODO_TASKS,
    payload: res.data 
  });
};

export const deleteTodoTask = pt_id => async dispatch => {
  if (
    window.confirm(
      `You are deleting todo task, this action cannot be undone`
    )
  ) {
    await axios.delete(`http://localhost:8080/app/api/delete/${pt_id}`);
    dispatch({
      type: DELETE_TODO_TASK,
      payload: pt_id
    });
  }
};

export const deleteTodoFromView = ( pt_id, history)  => async dispatch => {
  if (
    window.confirm(
      `You are deleting todo task, this action cannot be undone`
    )
  ) {
    await axios.delete(`http://localhost:8080/app/api/delete/${pt_id}`);
    history.push("/");
    dispatch({
      type: DELETE_TODO_TASK,
      payload: pt_id
    });
  }
};

export const getTodoTask = (pt_id, history) => async dispatch => {    
  try {
    const res = await axios.get(`http://localhost:8080/app/api/todo/${pt_id}`);
    dispatch({
      type: GET_TODO_TASK,
      payload: res.data
    });
  } catch (error) {
    // history.push("/");
  }
};

export const deleteErrorTask = () => async dispatch => {
  
    dispatch({
      type: DELETE_ERROR_TASK,
      payload: {}
    });  
};