
import { api } from "../api/client";



//valor inicial do meu state
const initialState = {
    todos: [
       
    ],
    filters: {
        status: 'Todos',
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
        
       case "todos/todoDeleted":
         return {...state, 
        todos: state.todos.filter(x=> x.id !== action.payload)
       }  

       case "todos/updateToggle":
          return {...state,
        todos: state.todos.map(x=>{
            if(x.id !== action.payload){
                return x
            }

            x.completed = !x.completed
            return x
        })}

        case "todos/updateColor":
            return {...state, 
            todos: state.todos.map(x=>{
                if(x.id!==action.payload.id){
                    return x
                }

                x.color = action.payload.color

                return x
            })}

        case "filters/updateColors":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    colors: action.payload
                }
            }

        case "filters/updateStatus":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.payload
                }
            }

        case "todos/defineAllCompleted":{
            return {
                ...state,
                todos: state.todos.map(x=>{
                   // if(!x.completed){
                    x.completed = true
                    return x
                //}
                   // return x
                })
            }
        }
        case "todos/defineAllNotCompleted":{
            return {
                ...state,
                todos: state.todos.map(x=>{

                  //  if(x.completed){
                        x.completed = false
                        return x
                    //}
                   //return x
                })
            }
        }
        default:
        return state;
    }
}