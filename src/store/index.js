import { createStore, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from 'redux-saga'
import rootSagas from "./rootSagas";
import { PrintAction } from './middlewares/PrintAction'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware,
         PrintAction))

sagaMiddleware.run(rootSagas)

export default store