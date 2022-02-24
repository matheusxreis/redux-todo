
import todosReducer from './todos/reducers'
import filtersReducer from './filters/reducers'


//valor inicial do meu state


//reduction function, que é a função que
//altera o state
export default function appReducer(
    state={},
    action
){

return {
    todos: todosReducer(state.todos, action),
    filters: filtersReducer(state.filters, action)
}
}