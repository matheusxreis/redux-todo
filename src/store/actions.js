
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

export function FilterByColor(payload){

    const {color, increment} = payload
    return {
        type: "todos/filterByColor",
        payload: {color, increment}
    }
}

export function reFilterByColor(payload){
    const {color, increment} = payload
    return {
        type:"todos/reFilterByColor",
        payload: {color, increment}
    }
}