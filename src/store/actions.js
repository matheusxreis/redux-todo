
//{type: "todo/todoAdded", payload: ""}
export function AddNewTodo(payload){
    return {
        type: "todos/todoAdded",
        payload: payload
    }
}

export function ListAllTodos(payload){

    //const {id, text, completed, color} = payload[]
    //id: 0, text: "Passear com o cachorro", completed: false, color:"blue"

    return {
        type: "todos/listAll",
        payload: payload
    }
}

export function RemoveTodo(payload){

    //payload = id

return {
    type: "todos/todoDeleted",
    payload
}

}


export function UpdateToggle(payload){

    //payload = id
   return {
       type: "todos/updateToggle",
       payload
    }
   }
   

export function UpdateColor(payload){

    //const { id, color } = payload

    return { type: "todos/updateColor",
    payload}
}

export function UpdateFilterByColor(payload){

    //color ou colors = payload

    return {
        type:"filters/updateColors",
        payload
    }
}

export function UpdateFilterByStatus(payload){

    //status = payload 
    
    return {
        type: "filters/updateStatus",
        payload 
    }
}