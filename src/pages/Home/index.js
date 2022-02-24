import React, {useState, useEffect} from 'react'

import {CenterContainer} from '../../components/CenterContainer'
import { CheckItem } from '../../components/CheckItem'
import { Input, Button, Select} from '../../components/Input/styles'

import { useSelector, useDispatch} from 'react-redux'

import { toast } from 'react-toastify'

import { AddNewTodo, ListAllTodos, FilterByColor, reFilterByColor} from '../../store/actions'

import { api } from '../../api/client'

export default function Home() {

    const todos = useSelector(state=>state.todos)
    const colors = useSelector(state=>state.filters.colors)
    const todosFiltered = useSelector(state=>state.filtered)

    const dispatch = useDispatch()

    //vindo do database
    useEffect(()=>{

    async function getInitialData(){
        const response = await api.get('/todos')
        
        const payload = (response.data.todos)
         dispatch(
             ListAllTodos(payload)
         )
    }

    getInitialData()
      },[])

    //setando lista 
    useEffect(()=>{
         let filtered = todos.filter(x=>todosFiltered.find(y=>y===x?.color))
         filtered = [...filtered, todosFiltered.filter(x=>!x?.color)]

         console.log(todosFiltered)

         if(todosFiltered.length>=1){
            setTodosList(
                todosFiltered
                )
         }else{
             setTodosList(
                 todos
             )
         }
        
    }, [todos, todosFiltered])

    
   

    const [newTodo, setNewTodo] = useState('')
    const [todosList, setTodosList] = useState([])

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

  async function handleFilterByColor(color, isCheck){
      
    console.log(isCheck)

    if(isCheck){
        

        dispatch(
            FilterByColor({color: color})
        )
    
    }else{
        dispatch(
            reFilterByColor({color: color})
        )
    
    }
   
    console.log(isCheck)
     setTodosList(todos.filter(x=>x.color === color))       
        
    }   
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
                        
                         <CheckItem text={x?.text || ''} checked={x?.completed} />

                        <Select 
                        style={{color:x?.color}}
                        value={x?.color}>
                            {colors.map(x=><option style={{color:"#212930"}} value={x}> {x } </option>)}
                        </Select> 
                    </div>
                   ))}  
                   </ul>
                   </CenterContainer>

                   <CenterContainer>

                       <span style={{display:'block', marginLeft:'auto', width:'130px'}}>
                        <b>Filtrar pela cor: </b>
                       </span>
                       {colors.map(x=> {
                           
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
                            onClickProps={handleFilterByColor}/>
                            
                          </div>
                       )})}
                   
                 </CenterContainer>
        </div>
    )
}