import { all } from 'redux-saga/effects'
 import {  watchListAllTodos, watchAddNewTodo } from "./todos/sagas";



export default function* rootSagas(){

    yield all ([
    watchListAllTodos(),
    watchAddNewTodo()
    ]);
}