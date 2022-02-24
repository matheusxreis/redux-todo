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
    MarkAllCompleted,
    DesmarkAllCompleted} from '../../store/todos/actions'

import {
    UpdateFilterByColor,
    UpdateFilterByStatus,
} from '../../store/filters/actions'

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
        
        const loop = colors.length>=1 ? colors.length : 6
        for(let i = 0; i<loop ; i++){
            const existList = todos.filter(x=>x.color === colors[i])
            const existOne = todos.find(x=>x.color === colors[i])

            if(existList && existOne && colors.length>=1){
               existList.length>1 ? filtered = existList :  
                filtered = [...filtered, existOne]
            }
            
        }
        console.log(status)

        if(status==="Ativas"){

            console.log('aaa', todos)
            console.log(filtered)
            filtered =
            filtered.length<1 ? todos.filter(x=>!x.completed) 
            : filtered.filter(x=>!x.completed) 
            console.log(filtered)
        }

        if(status==="Finalizadas"){
           
            filtered = 
            filtered.length<1 ? todos.filter(x=>x.completed)
            : filtered.filter(x=>x.completed)
            console.log(filtered)
        }

        if(status==="Todas"){
           
            filtered = 
            filtered.length<1 ? todos
            : filtered
            console.log(filtered)
        }

       // const statusIsAll = status.find(x=>x==="Todas")

        console.log(filtered)

        if(colors?.length<1 && status?.length<1){
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

   useEffect(()=>{
    console.log(todos)
   }, [todos])

    return (
        <div style={{marginTop:'100px'}}>
            <CenterContainer>
               
               <h2>Welcome to a example todolist with Redux!</h2> 

               <div style={{display:"flex"}}>
                    <Input 
                    type="text"
                    value={newTodo}
                    placeholder="Adicione o item"
                    onChange={(e)=>setNewTodo(e.target.value)}
                    />
    
                    <Button onClick={()=>handleAddNewTodo()}> Add </Button>
                </div>
            </CenterContainer>

            <CenterContainer borderTop={true}>
               {/* <h2> A lista: </h2>  */}

             
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
                         text={x.text || ''} 
                         checked={x.completed === true} />

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
        </div>
    )
}