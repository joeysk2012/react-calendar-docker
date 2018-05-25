import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Calendar from './Components/Calendar';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Calendar />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
