import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodoTask, deleteErrorTask } from "../../actions/todoTaskActions";
import {formValidMethod,formValidMethodWithName} from "../FormValidator";

class AddTodoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      name: "",
      description: "",
      dueDate: "",
      status: "PENDING", //default value set here as pending on Add To do page.
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

  onSubmit(e) {    
    e.preventDefault();    

    let formErrors = formValidMethod(this.state);

    if (formErrors.length < 2) {
      //When form is valid
      const newTodoTask = {
        name: this.state.name,
        description: this.state.description,
        dueDate: this.state.dueDate,
        status: this.state.status
      };

      this.props.addTodoTask(newTodoTask, this.props.history);
    }
    else {
      let errorMessage = "Form is invalid!" + formErrors;
      window.confirm(errorMessage);
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
        <div className="addTodoTask">
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
    }else{
    return (
      <div className="addTodoTask">
        <div className="add-todo-container">
          <div className="add-todo-row">
            <div className="add-todo-col">
              <h4 className="add-todo-header">
                Add Todo Task
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Task name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control-desc"
                    placeholder="Enter Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  {/* for error feedback realtime */}
               { this.state.errMsg ? <div className="form-group-error-msg">{this.state.errMsg}</div> : <div></div> }                  
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"        
                    name="dueDate"
                    placeholder="Enter Due Date"
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
                  <option value="PENDING" >PENDING</option>
                  <option value="DONE" disabled>DONE</option> 
                  {/* disabled done option on add page  */}
                  </select>
                </div>
                <div className="add-todo-button">
                <input
                  type="submit"
                  className="add-todo-button-submit"
                />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );}
  }
}

AddTodoPage.propTypes = {
  addTodoTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  deleteErrorTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTodoTask,deleteErrorTask }
)(AddTodoPage);