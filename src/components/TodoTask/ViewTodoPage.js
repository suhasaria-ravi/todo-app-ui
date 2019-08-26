import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTodoTask,
  updateTodoTask,
  deleteTodoFromView
} from "../../actions/todoTaskActions";


class ViewTodoPage extends Component {
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
    this.onSubmit = this.onSubmit.bind(this);

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
  }

  onSubmit(e) {
    e.preventDefault();
    const viewedTodo = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      dueDate: this.state.dueDate,
      status: this.state.status
    };

    this.props.updateTodoTask(viewedTodo,viewedTodo.id, this.props.history);
  }

  onDeleteClick(pt_id) {    
    this.props.deleteTodoFromView(pt_id,this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    
    return (
      <div className="updateTodoTask">        
          <div className="view-todo-row">
            <div className="view-todo-col">
              <h4 className="view-todo-header">
                To-Do Details
              </h4>         
              <div className="view-todo-container">                     
                <div className="form-control">Name: {this.state.name}</div>
                <div className="form-control-desc"> Description: {this.state.description}</div>
                <div className="form-control"> DueDate: {this.state.dueDate}</div>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <select
                    className="form-control-select"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  > 
                    <option value="" disabled>Select Status</option>                    
                    <option value="PENDING">PENDING</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                <div className="view-todo-button">
                <input
                  type="submit"
                  className="view-todo-button-submit"
                />
                </div>
                <div className="app-item-delete">
                  <button className="view-todo-button-submit" onClick={this.onDeleteClick.bind(this, this.state.id)} >
                    Delete
                  </button>
                </div>                
              </form>
              </div>
            </div>
          </div>        
      </div>
    );
  }
}

ViewTodoPage.propTypes = {
  todo_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getTodoTask: PropTypes.func.isRequired,
  updateTodoTask: PropTypes.func.isRequired,
  deleteTodoFromView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todo_task: state.todo_task.todo_task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getTodoTask, updateTodoTask,deleteTodoFromView }
)(ViewTodoPage);