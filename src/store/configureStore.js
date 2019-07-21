import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preLoadedState) {
  return createStore(
    reducer,
    preLoadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}
