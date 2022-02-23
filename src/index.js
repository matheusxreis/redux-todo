import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import './api/server'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.min.css'; 


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    <ToastContainer

/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
