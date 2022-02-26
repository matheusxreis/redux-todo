import { api } from '../../api/client'
import { put, takeEvery, all, actionChannel } from 'redux-saga/effects'
import { v4 } from 'uuid'

//worker function
export function* listAllTodos(){

   const response =  yield api.get('/todos')

   console.log('DEU CERTO UHU!')
    yield put({type:'todos/listAll', payload: response.data?.todos})

}

//watcher function
export function* watchListAllTodos(){

    
   yield takeEvery('@todos/listAll', listAllTodos)
}


export function* addNewTodo({payload}){

     yield api.post('/todos', 
     {
   
    text: payload,
    
      })

   yield put({payload})
}

export function* watchAddNewTodo(){

    yield takeEvery("todos/todoAdded", addNewTodo)
}