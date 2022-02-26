export const PrintAction = (storeAPI) => (next) => (action)=>{

    console.log(action.type)
    return next(action)
}