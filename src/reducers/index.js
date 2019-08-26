import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import todoTaskReducer from "./todoTaskReducer";

export default combineReducers({  
  errors: errorsReducer,
  todo_task: todoTaskReducer
}); 