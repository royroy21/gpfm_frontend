import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import loginReducer from '../store/reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preLoadedState) {
  return createStore(
    loginReducer,
    preLoadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}
