import React, {useState, useEffect} from 'react'
import {CenterContainer} from '../CenterContainer'
import { CheckItem } from '../../components/CheckItem'
import { Input, Button, Select} from '../../components/Input/styles'
import { useSelector, useDispatch } from 'react-redux'

import {
    MarkAllCompleted,
    DesmarkAllCompleted
} from '../../store/todos/actions'
import {
    UpdateFilterByColor,
    UpdateFilterByStatus,
} from '../../store/filters/actions'


export function OptionsComponent(){
    const colors = useSelector(state=>state.filters.colors)
    const status = useSelector(state=>state.filters.status)   
    const todos = useSelector(state=>state.todos)

    const dispatch = useDispatch()

    const [colorsSelected, setColorsSelected] = useState([])
    const [colorsList, setColorsList] = useState([])
    const [statusList, setStatusList] = useState([])
    const [statusSelected, setStatusSelected] = useState([])

    useEffect(()=>{
        setColorsList(["", "red", "yellow", "green", "blue", "orange", "purple"])

        setStatusList(["Todas", "Ativas", "Finalizadas"])
    }, [])

    function handleFilterByColor(color){

        if(colorsSelected.find(x=>x===color)){
            setColorsSelected(
                colorsSelected.filter(x=>x!==color)
            )
        }else {
            setColorsSelected([...colorsSelected, color])
        }
        
       }
    
       function handleFilterByStatus(status){
    
        if(statusSelected===status){
            setStatusSelected(
                "Todas"
            )
        }else {
            setStatusSelected(status)
        }
    
        //setStatusSelected(status)
    
        console.log(statusSelected)
       }

       function handleMarkAll(){
        dispatch(
            MarkAllCompleted()
        )
    }
 
    function handleDesmarkAll(){
        dispatch(
            DesmarkAllCompleted()
        )
    }
       useEffect(()=>{
            dispatch(
                UpdateFilterByColor(colorsSelected)
            )
        
       }, [colorsSelected])
    
       useEffect(()=>{
           dispatch(
            UpdateFilterByStatus(statusSelected)
           )
        
       }, [statusSelected])

    return(
        <CenterContainer
        >
        <div style={{display:'flex',
            //alignItems: "center",
            //alignContent:"center",
            justifyContent:"space-between"}}>

        <div>
        <span style={{display:'block', marginLeft:'auto', width:'150px'}}>
            <b>Ações: </b>

           <Button 
           onClick={()=>handleMarkAll()}
           style={{padding: 0, height:'30px', width:150}}> 
           Marcar todas </Button>
           <Button
           onClick={()=>handleDesmarkAll()}
           style={{padding: 0, height:'30px', width:150}}>
             Desmarcar todas </Button>

        </span>

        </div>

        <div>
        <span style={{display:'block', marginLeft:'auto', width:'150px'}}>
            <b>Tarefas restantes: </b>

            <p> {todos.filter(x=>!x.completed).length} 
            {todos.filter(x=>!x.completed).length === 1 ? ' item ' :' itens '} 
            sobrando. </p>
        </span>

        </div>
        <div>
        <span style={{display:'block', marginLeft:'auto', width:'150px'}}>
            <b>Filtrar pelo status: </b>
        </span>

        {statusList.map(x=> {
               
               return x!=='' && (
                 
                 <div style={{display:"flex",
                 alignItems: "center",
                 alignContent:"center",
                 margin: 5,
                 padding:10,
                 lineHeight: `25px\${statusList.length}`,
                 color: '#FFFFF',
                 width:'120px',
                 height:'25px',
                 marginLeft:'auto'}}>
                  <CheckItem
                  checked={x===statusSelected}
                  color="#212930" 
                  text={x} 
                  param={x}
                  onClickProps={handleFilterByStatus}/>
                  
                </div>
         )})}
        </div>
        <div>  
           <span style={{display:'block', marginLeft:'auto', width:'150px'}}>
            <b>Filtrar pela cor: </b>
           </span>

           {colorsList.map(x=> {
               
             return x!=='' && (
               
               <div style={{display:"flex",
               alignItems: "center",
               alignContent:"center",
               justifyContent:"space-between",
               margin: 5,
               padding:10,
               width:'120px',
               height:'25px',
               marginLeft:'auto'}}>

                <CheckItem
                color="#212930" 
                text={x} 
                param={x}
                onClickProps={handleFilterByColor}/>
                <div style={{
                    width:20,
                    height:20,
                    background: x,
                    borderRadius: 2,

                }}> </div>
              </div>
           )})}
        </div> 
       </div>
     </CenterContainer>
    )
}
