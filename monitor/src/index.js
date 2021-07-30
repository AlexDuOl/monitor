import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'


// ========================================================
// Store Instantiation
// ========================================================
export const store = createStore()

// ========================================================
// Go!
// ========================================================
ReactDOM.render(
    <AppContainer store={store} />,
    document.querySelector('#root')
)
