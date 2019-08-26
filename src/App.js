import React, { Component } from 'react';
import './css/App.css';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import Navbar from "./components/Navbar";
import TodoPage from "./components/TodoPage";
import AddTodoPage from "./components/TodoTask/AddTodoPage";
import EditTodoPage from "./components/TodoTask/EditTodoPage";
import ViewTodoPage from "./components/TodoTask/ViewTodoPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">          
            <Navbar />
            <Route exact path="/" component={TodoPage} />
            <Route exact path="/addTodoTask" component={AddTodoPage} />
            <Route exact path="/viewTodoTask/:pt_id"  component={ViewTodoPage}  /> 
            <Route exact path="/editTodoTask/:pt_id"  component={EditTodoPage}  /> 
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
