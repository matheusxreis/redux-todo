import { api } from '../../api/client'
import { put, takeEvery, all } from 'redux-saga/effects'


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