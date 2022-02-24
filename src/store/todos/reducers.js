

//valor inicial do meu state
const initialState =  []


export default function todosReducer(
    state=initialState,
    action
){
    switch(action.type){
        case 'todos/todoAdded':
        return [...state, 
        {
            id: state.length,
            text: action.payload,
            completed: false
        }
    ]
       

        case "todos/listAll":
        return  action.payload
       
        
       case "todos/todoDeleted":
         return state.filter(x=> x.id !== action.payload)
       

       case "todos/updateToggle":
          return state.map(x=>{
            if(x.id !== action.payload){
                return x
            }

            x.completed = !x.completed
            return x
        })

        case "todos/updateColor":
            return state.map(x=>{
                if(x.id!==action.payload.id){
                    return x
                }

                x.color = action.payload.color

                return x
            })

        

        case "todos/defineAllCompleted":{
            return  state.map(x=>{
                   // if(!x.completed){
                    x.completed = true
                    return x
                //}
                   // return x
                })
            
        }
        case "todos/defineAllNotCompleted":{
            return state.map(x=>{

                  //  if(x.completed){
                        x.completed = false
                        return x
                    //}
                   //return x
                })
            
        }
        default:
        return state;
    }
}