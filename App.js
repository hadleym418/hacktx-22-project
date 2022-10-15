import React from 'react';
import './style.css';

import TaskList from './basic/TaskList.js';
import FetchTaskList from './api/FetchTaskList.js';

export default function App() {
  return (
    <div>
      <h1>Hello Everyone!</h1>
      <TaskList />
    </div>
  );
}