import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import {setupStore} from './store/store'

const store = setupStore()

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById('root')
)


//console.log(store)

// @ts-ignore
//window.store55 = store

//store55.getState()



