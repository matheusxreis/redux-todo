
import { api } from "../api/client";



//valor inicial do meu state
const initialState = {
    todos: [
       
    ],
    filters: {
        status: 'All',
        colors: ["", "red", "yellow", "green", "blue", "orange", "purple"],
    },
    filtered: []
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
        ]};

        case "todos/listAll":
        return {...state,
        todos: action.payload
       }
        
        case "todos/filterByColor":
         return {...state, 
            filtered: [...state.filtered,
                 state.todos.find(x=>x?.color===action.payload.color)]
        }
        
        case "todos/reFilterByColor":
         return {...state, 
            filtered: [state.filtered.filter(x=>x.color!==action.payload.color)]
        }
        
        default:
        return state;
    }
}