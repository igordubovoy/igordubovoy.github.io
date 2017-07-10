import React from 'react'
import PropTypes from 'prop-types';
import { TodoItem } from './todoItem'

export const TodoList = (props) => (
  <ul>
    {
      props.todoList.map(todo => {
        return <TodoItem key={todo.id} {...todo}/>
      })
    }
  </ul>
)

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired
}
