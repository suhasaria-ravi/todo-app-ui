import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTodoTask,deleteErrorTask, deleteTodoTask, updateTodoTask } from "../../actions/todoTaskActions"; 


class TodoTaskItem extends Component {

  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      description: "",
      dueDate: "",
      status: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);    
  }


  onChange(editedTodo,e) {    
    const { id, name, status, description, dueDate } = editedTodo;
        
    this.setState({ [e.target.name]: e.target.value },()=> {
    });

    editedTodo.status=e.target.value;

    this.setState({
      id,
      name,
      description,
      dueDate,
      status
    });
    
    this.props.updateTodoTask(editedTodo,editedTodo.id, this.props.history);
  }

  onDeleteClick(pt_id) {
    this.props.deleteTodoTask(pt_id);
  }  

  onError() {    
    this.props.deleteErrorTask();
  }

  render() { 
    const { todo_task } = this.props;
    let doneStatus;

    if(todo_task.status ==="PENDING"){
      doneStatus="DONE";
    }

    return (      
      <div className="todoTaskItem">
      <div className="app-item-container">
        <div className="app-item-view">
        <Link to={`viewTodoTask/${todo_task.id}`} className="app-item-button-link">
          <button className="app-item-button" >            
              View
          </button>
          </Link>
        </div>
        <div className="app-item-edit">
        <Link to={`editTodoTask/${todo_task.id}`} className="app-item-button-link"  onClick={this.onError.bind(this)}>
          <button className="app-item-button" >            
              Edit          
          </button>
          </Link>
        </div>
        <div className="app-item-delete">
          <button className="app-item-button" onClick={this.onDeleteClick.bind(this, todo_task.id)} >
            Delete
          </button>
        </div>
        <div className="app-item-content">
        {/* <div className="app-item-header">Msg Id: {todo_task.id}</div>         */}        
        <div className="app-item-name" value={todo_task.name} onChange={this.onChange}>
        <div className="divTable"> 
        <div className="divRow"> 
        <div className="divCell">Name</div>
        <div className="divCell">{todo_task.name}</div>  
        </div>
        </div>
        </div>     
        <div className="app-item-description"  value={todo_task.description} onChange={this.onChange}>
        <div className="divTable"> 
        <div className="divRow"> 
        <div className="divCell">Details</div>  
        <div className="divCell">{todo_task.description}</div>          
        </div>
        </div> 
        </div> 
        <div className="app-item-date" value={todo_task.dueDate} onChange={this.onChange}>
        <div className="divTable"> 
        <div className="divRow"> 
        <div className="divCell">Due Date</div> 
        <div className="divCell">{todo_task.dueDate}</div>        
        </div>
        </div> 
        </div> 
        {  //conditon added on status , since item should be editable from Pending to Done only on Pending items list.
          doneStatus ? 
                      <div className="app-item-status">
                      <div className="divTable"> 
                      <div className="divRow"> 
                      <div className="divCell">Status</div>                       
                      <select className="div-Cell" 
                                          name="status"
                                          value={todo_task.status}
                                          onChange={this.onChange.bind(this, todo_task)}>    
                      
                      <option value={todo_task.status}>{todo_task.status}</option>            
                      <option className="div-Cell" value={doneStatus} >{doneStatus}</option>          
                      
                      </select> 
                      </div>
                      </div> 
                      </div>                             
                      
          :  //do not reomve this : operator part of conditon above
                      <div className="app-item-status">
                        <div className="divTable"> 
                        <div className="divRow"> 
                        <div className="divCell">Status</div> 
                        <div className="divCell">{todo_task.status}</div>
                        </div> 
                        </div>
                        </div>
        }
        
        </div> 
        </div>      
        </div>
    );
  }
}

TodoTaskItem.propTypes = {
  getTodoTask: PropTypes.func.isRequired,
  deleteTodoTask: PropTypes.func.isRequired,
  updateTodoTask: PropTypes.func.isRequired,
  todo_tasks: PropTypes.object.isRequired,
  deleteErrorTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todo_tasks: state.todo_task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTodoTask, deleteTodoTask, updateTodoTask,deleteErrorTask }
)(TodoTaskItem);