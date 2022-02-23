import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddNewTodo } from './store/actions'
import { toast } from 'react-toastify'
import { api } from './api/client'

function App() {
  const todos = useSelector(state=>state.todos)
  const dispatch = useDispatch()

  const [textTodo, setTextTodo] = useState()

  useEffect(()=>{

    fetch('http://localhost:3000/todos')
    .then(res => res.json())
    .then(json => console.log(json.todos))

  },[])

  async function handleNewTodo(){
    setTextTodo('')
    try{
        dispatch(
        AddNewTodo(textTodo)
      )
      
      const request = {
        textTodo
      }
    const response= await api.post('/todos',{todo: textTodo})
    console.log(response.data)
      return toast.success("Item adicionado!")
    }catch(err){
      console.log(err)
      return toast.error("erro")
    }
  }


  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>

          <div className="navContent">
            <div className="navLinks"></div>
          </div>
        </section>
      </nav>
      <section>
        <h2>Welcome to the Redux Fundamentals example app!</h2>
      </section>


      <div style={{margin:"5px auto",
      display:"flex",
      alignContent:"center",
      alignItems:"center",
      justifyContent:'space-between',
        width:"700px",
        background:"#FFF",
        color:"#212930"}}>
        <input type="text" 
        placeholder='Digite a todo'
        onChange={(e)=>setTextTodo(e.target.value)}></input>
        <button 
        style={{
          backgroundColor: '#764abc',
          height:"45px",
          color:"#FFF",
          margin:0,
          padding:3,
          marginLeft:2,
          marginBottom:'8px'
        }}
        onClick={()=>handleNewTodo()}> Adicionar </button>
      </div>

      <div style={{margin:"10px auto",
       borderTop:"1px solid #c8c8c8",
        width:"700px",
        background:"#FFF",
        color:"#212930"}}>
        <h3> Todos </h3>

       
         <ul>
         {todos.map(x=> (
          <li style={{display:'flex',
          alignContent:"center",
          alignItems:"center",
          justifyContent:'space-between',}}>

            <div style={{display:'flex',
            alignContent:"center",
            alignItems:"center",}}>
              <input 
              style={{
                width:'20px',
                height:'20px', 
                marginTop:'7px',
                marginRight:'5px'}}
              type="checkbox"
              checked={x.completed}></input>
              <h5>{x.text}</h5>
              </div>

              <select style={{width:'100px', height:'50px'}}>
                
                <option style={{color:x.color}}>
                  {x.color}
                </option>
              </select>

          </li>
         ))
}
         </ul>
        
      </div>
    </div>
  )
}

export default App
