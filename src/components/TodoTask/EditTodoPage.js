import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTodoTask,
  updateTodoTask,
  deleteErrorTask
} from "../../actions/todoTaskActions";
import {formValidMethod, formValidMethodWithName} from "../FormValidator";


class EditTodoPage extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      description: "",
      dueDate: "",
      status: "",
      errors: {},
      errMsg:""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });      
    }

    const { id, name, status, description, dueDate } = nextProps.todo_task;
    

    this.setState({
      id,
      name,
      description,
      dueDate,
      status
    });
  }

  componentDidMount() {
    const { pt_id } = this.props.match.params;
    this.props.getTodoTask(pt_id);
    this.setState({ errors: ''});    
  }

  onSubmit(e) {
    e.preventDefault();
    
    let formErrors = formValidMethod(this.state);

    if (formErrors.length < 2) {
      // When Form is valid
      const editedTodo = {
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        dueDate: this.state.dueDate,
        status: this.state.status
      };

      this.props.updateTodoTask(editedTodo, editedTodo.id, this.props.history);
    }
    else {
      let errorMessage = "Form is invalid!" + formErrors;
      window.confirm(errorMessage);
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });    

    let formErrors = formValidMethodWithName(e.target.value, e.target.name);
    if (formErrors.length > 1) {

      let errorMessage = "Form is invalid!" + formErrors;
      this.setState({ errMsg: errorMessage });      
    }
    else {
      this.setState({ errMsg: "" });
    }

  }

  onError() {    
    this.props.deleteErrorTask();
  }
  render() {
    const { errors } = this.state.errors;    
    
    if((errors) && (errors.message))
    {            
      let errorStatus=errors.message;
      let erroMessage=errors.response.data.message;      
      this.onError.bind(this);
      return(        
        <div className="updateTodoTask">
          <form onError={this.onError}>
          <h4>Error Status:{errorStatus}</h4>
          <h4>Error Message:{erroMessage}</h4>
          <div className="edit-todo-button">
                <button
                  type="submit"
                  className="edit-todo-button-submit"
                >Try Again</button>
                </div>
                </form>
        </div>
      );
    }
    else{
    return (
      <div className="updateTodoTask">
        <div className="edit-todo-container">
          <div className="edit-todo-row">
            <div className="edit-todo-col">
              <h4 className="edit-todo-header">
              Edit To Do Task
              </h4>
              <div className="view-todo-container"> 
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"                    
                    name="name"
                    placeholder="Todo Task name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />                  
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control-desc"
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                   {/* for error feedback realtime */}
               { this.state.errMsg ? <div className="form-group-error-msg">{this.state.errMsg}</div> : <div></div> }   
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"                  
                    name="dueDate"
                    placeholder="Todo Task dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />                 
                </div>
                <div className="form-group">
                  <select
                    className="form-control-select"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="" disabled>Status Edit Disabled</option>                    
                    <option value={this.state.status}>{this.state.status}</option>                    
                  </select>
                </div>
                <div className="edit-todo-button">
                <input
                  type="submit"
                  className="edit-todo-button-submit"
                />
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  }
}

EditTodoPage.propTypes = {
  todo_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getTodoTask: PropTypes.func.isRequired,
  updateTodoTask: PropTypes.func.isRequired,
  deleteErrorTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todo_task: state.todo_task.todo_task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTodoTask, updateTodoTask,deleteErrorTask }
)(EditTodoPage);