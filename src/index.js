import React from 'react';
import ReactDOM from 'react-dom';
import FetchDemo from './FetchDemo';
import './index.css';

// Change subreddit to whatever you like:
ReactDOM.render(
  <FetchDemo subreddit='reactjs' />,
  document.getElementById('root')
);
