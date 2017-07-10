import React from 'react'
import PropTypes from 'prop-types';

export const TodoForm = (props) => (
  <div>
    <input type="text" value={props.inputText} onChange={props.setText}/>
    <button onClick={props.addTodo}>add</button>
  </div>
)

TodoForm.propTypes = {
  inputText: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired
}
