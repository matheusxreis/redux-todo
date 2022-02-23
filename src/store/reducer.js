
//valor inicial do meu state
const initialState = {
    todos: [
        {id: 0, text: "Passear com o cachorro", completed: false, color:"blue"},
        {id: 1, text: "Jogar futebol no sábado", completed: false, color:"purple"},
        {id: 2, text: "Aprender Redux", completed: true}
    ],
    filters: {
        status: 'All',
        colors: []
    }
}

//reduction function, que é a função que
//altera o state
export default function appReducer(
    state=initialState,
    action
){
    switch(action.type){
        case 'todos/todoAdded':
        return {...state, 
        todos: 
        [...state.todos,
        {
            id: state.todos.length,
            text: action.payload,
            completed: false
        }
        ]}
        
        default:
        return state;
    }
}