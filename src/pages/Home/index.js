import React, {useState, useEffect} from 'react'

import {CenterContainer} from '../../components/CenterContainer'
import { CheckItem } from '../../components/CheckItem'
import { Input, Button, Select} from '../../components/Input/styles'

import { useSelector, useDispatch} from 'react-redux'

import { toast } from 'react-toastify'

import { MdDelete } from 'react-icons/md'

import {
    AddNewTodo,
    ListAllTodos,
    RemoveTodo,
    UpdateToggle,
    UpdateColor,
    UpdateFilterByColor,
    UpdateFilterByStatus} from '../../store/actions'

import { api } from '../../api/client'

export default function Home() {

    const todos = useSelector(state=>state.todos)
    const colors = useSelector(state=>state.filters.colors)
    const status = useSelector(state=>state.filters.status)
   // const todosFiltered = useSelector(state=>state.filtered)
   

   const [newTodo, setNewTodo] = useState('')
   const [todosList, setTodosList] = useState([])
   const [colorsSelected, setColorsSelected] = useState([])
   const [colorsList, setColorsList] = useState([])
   const [statusList, setStatusList] = useState([])
   const [statusSelected, setStatusSelected] = useState([])
   //
    const dispatch = useDispatch()

    //vindo do database
    useEffect(()=>{
        console.log(colors)
    async function getInitialData(){
        const response = await api.get('/todos')
        
        const payload = (response.data.todos)
         dispatch(
             ListAllTodos(payload)
         )
    }

    getInitialData()

    setColorsList(["", "red", "yellow", "green", "blue", "orange", "purple"])

    setStatusList(["Todas", "Ativas", "Finalizadas"])
      },[])

    //setando lista 
    useEffect(()=>{
        let filtered = [];
        
        const loop = colors.length>status.length ? colors.length : status.length
        for(let i = 0; i<loop ; i++){
            const existList = todos.filter(x=>x.color === colors[i])
            const existOne = todos.find(x=>x.color === colors[i])

            if(existList && existOne){
               existList.length>1 ? filtered = existList :  
                filtered = [...filtered, existOne]
            }
            
        }
        console.log(status)

        if(status.find(x=>x==="Ativas")){
            
            filtered =
            filtered.length>1 ? filtered.filter(x=>!x.completed) 
            : todos.filter(x=>!x.completed) 
            console.log(filtered)
        }

        if(status.find(x=>x==="Finalizadas")){
           
            filtered = 
            filtered.length>=1 ? filtered.filter(x=>x.completed)
            : todos.filter(x=>x.completed)
            console.log(filtered)
        }

        const statusIsAll = status.find(x=>x==="Todas")

        if(colors.length<1 && (status.length<1 || statusIsAll)){
            setTodosList(
                todos
            )
        }else{
            setTodosList(
                filtered
            )
        }
             
    }, [todos, colors, status])
    
    

    //ACTIONS
   async function handleAddNewTodo(){
            setNewTodo('')
            try{
                dispatch(
                AddNewTodo(newTodo)
              )
              

            const response= await api.post('/todos',{todo: newTodo})
              console.log(response.data)
              return toast.success("Item adicionado!")
            }catch(err){
              console.log(err)
              return toast.error("erro")
            }

        }

   async function handleRemoveTodo(id){

    try{dispatch(
        RemoveTodo(id)

    )
    
        toast.success('Item removido!')}catch{}
   }

   async function handleUpdateToggle(id){
    dispatch(
        UpdateToggle(id)
    )
   }

   async function handleUpdateColor({ id, color}){

    dispatch(
        UpdateColor({
            id,
            color
        })
    )

   }

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

    if(statusSelected.find(x=>x===status)){
        setStatusSelected(
            statusSelected.filter(x=>x!==status)
        )
    }else {
        setStatusSelected([...statusSelected, status])
    }

    console.log(statusSelected)
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

    return (
        <div style={{marginTop:'100px'}}>
            <CenterContainer>
               
               <h2>Welcome to a example todolist with Redux!</h2> 

               <div style={{display:"flex"}}>
                    <Input 
                    type="text"
                    placeholder="Adicione o item"
                    onChange={(e)=>setNewTodo(e.target.value)}
                    />
    
                    <Button onClick={()=>handleAddNewTodo()}> Add </Button>
                </div>
            </CenterContainer>

            <CenterContainer borderTop={true}>
               <h2> A lista: </h2> 

             
                   <ul>
                   {todosList.length>=1 && todosList.map(x=>(
                  
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems: "center",
                        alignContent:"center" }}>
                        
                         <CheckItem
                         onClickProps={handleUpdateToggle}
                         param={x.id}
                         text={x?.text || ''} checked={x.completed} />

                        <div style={{display:"flex",
                                    alignItems: "center",
                                    alignContent:"center"}}>
                            <Select 
                            style={{color:x.color}}
                            value={x.color || ''}
                            onChange={(e)=>handleUpdateColor({id: x.id, color: e.target.value})}>
                                {colorsList.map(x=><option style={{color:"#212930"}} value={x}> {x } </option>)}
                            </Select> 

                            <MdDelete 
                            onClick={()=>handleRemoveTodo(x.id)}
                            style={{cursor:"pointer"}}size={25}/>
                        </div>
                    </div>
                   ))}  
                   </ul>
                   </CenterContainer>

                   <CenterContainer
                    >
                    <div style={{display:'flex',
                        //alignItems: "center",
                        //alignContent:"center",
                        justifyContent:"space-between"}}>
                    <div>


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
                             width:'170px',
                             height:'25px',
                             marginLeft:'auto'}}>
                              <CheckItem
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
                           margin: 5,
                           padding:10,
                           backgroundColor:x,
                           color: '#FFFFF',
                           width:'150px',
                           height:'25px',
                           marginLeft:'auto'}}>
                            <CheckItem
                            color="#FFF" 
                            text={x} 
                            param={x}
                            onClickProps={handleFilterByColor}/>
                            
                          </div>
                       )})}
                    </div> 
                   </div>
                 </CenterContainer>
        </div>
    )
}