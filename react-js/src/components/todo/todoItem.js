import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = (props) => (
  <li>
    <input type="checkbox" defaultChecked={props.isComplete}/>
    {props.taskText}
  </li>
)

TodoItem.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  taskText: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}
