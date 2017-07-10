import React, { Component } from 'react'
import { TodoForm } from './todoForm'
import { TodoList } from './todoList'

class Todo extends Component   {
  constructor(props) {
      super(props);
      this.props = props
      this.state = {
        todoList: [
          {id: 1, taskText: 'Learn JSX', isComplete: true},
          {id: 2, taskText: 'Learn JSX', isComplete: false},
          {id: 3, taskText: 'Learn JSX', isComplete: false}
        ],
        inputText: ''
      };
  }
  render() {
    return (
      <div>
        <h2>{this.props.name}'s ToDo </h2>
          <TodoForm
            inputText={this.state.inputText}
            setText={this.setText}
            addTodo={this.addTodo}
          />
          <TodoList
            todoList={this.state.todoList}
          />
      </div>
    );
  }

  setText = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  addTodo = (event) => {
    if(this.state.inputText.length) {
      let list = this.state.todoList.slice();
      list.push({
        id: list.length + 1,
        taskText: this.state.inputText,
        isComplete: false
      })
      this.setState({
        todoList: list,
        inputText: ''
      })
    }
  }
}

export default Todo;
