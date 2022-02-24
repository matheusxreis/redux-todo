const initialState = {
    status: "Todas",
    colors: []
}

export default function filtersReducer(state = initialState, action){

switch(action.type){
    case "filters/updateColors":
        return {
                ...state,
                colors: action.payload
            
        }
    
    case "filters/updateStatus":
        return {
                ...state,
                status: action.payload
            
        }
     default:
     return state
}
}


