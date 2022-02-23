
//{type: "todo/todoAdded", payload: ""}
export function AddNewTodo(payload){
    return {
        type: "todos/todoAdded",
        payload: payload
    }
}