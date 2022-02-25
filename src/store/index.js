import { createStore, applyMiddleware} from "redux";
import appReducer from "./reducer";
import createSagaMiddleware from 'redux-saga'
import { watchListAllTodos } from "./todos/sagas";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    appReducer, 
    applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchListAllTodos)

export default store