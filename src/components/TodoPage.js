import React, { Component } from "react";
import TodoTaskItem from "./TodoTask/TodoTaskItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../actions/todoTaskActions";

class TodoPage extends Component {
  componentDidMount() { 
    this.props.getBacklog();
  }


  render() {    
    const { todo_tasks } = this.props.todo_tasks;
    
    let TodoPageContent;
    let todoItems = [];
    let pendingItems = [];
    let doneItems = [];


    const TodoPageAlgorithm = todo_tasks => {
      if (todo_tasks.length < 1) {
        return (
          <div className="form-group-error-msg">
            No Todo Tasks on this page
          </div>
        );
      } else {
        const tasks = todo_tasks.map(todo_task => (
          <TodoTaskItem key={todo_task.id} todo_task={todo_task} />
        ));

        todoItems.props=null;

        for (let i = 0; i < tasks.length; i++) {

          if (tasks[i].props.todo_task.status === "PENDING") {
            pendingItems.push(tasks[i]);            
          }

          if (tasks[i].props.todo_task.status === "DONE") {
            doneItems.push(tasks[i]);
          }

          todoItems.push(tasks[i]);

        }                

        return (
          <React.Fragment>
            <div className="container">
              <div className="todo-page-row">
                <div className="todo-page-col">
                <div className="todo-page-all">
                  <div className="todo-page-text">
                    <div className="todo-page-header">
                      <h3 className="todo-page-header-text">All To Do</h3>
                    </div>
                  </div>
                  {todoItems}
                </div>
                </div>
                <div className="todo-page-pend">
                <div className="todo-page-col">
                  <div className="todo-page-text">
                    <div className="todo-page-header">
                      <h3 className="todo-page-header-text">Pending To Do</h3>
                    </div>
                  </div>
                  {pendingItems}
                </div>
                </div>
                <div className="todo-page-done">
                <div className="todo-page-col"> 
                  <div className="todo-page-text">
                    <div className="todo-page-header">
                      <h3 className="todo-page-header-text">Done To Do</h3>
                    </div>
                  </div>
                  {doneItems}
                </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );        
      }
    };

    TodoPageContent = TodoPageAlgorithm(todo_tasks);
    

    return (      
        <div className="container"> {TodoPageContent} </div>        
    );
  }
}

TodoPage.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  todo_tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todo_tasks: state.todo_task,
  errors:state.errors
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(TodoPage);