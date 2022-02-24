


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

