// import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css';
import App from './App'
import "ladda/dist/ladda-themeless.min.css";
import * as serviceWorker from './serviceWorker'
import 'react-tippy/dist/tippy.css'
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
