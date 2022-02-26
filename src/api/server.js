import { Server, Model} from 'miragejs'
import { v4 } from 'uuid'
 new Server({
    models: {
        todos: Model,
      },

      seeds(server) {
          //se passar o nome no plural não funciona wtf
        server.create("todo", {id: 0, text: "Passear com o cachorro", completed: false, color:"blue"})
        server.create("todo", {id: 1, text: "Jogar futebol no sábado", completed: false, color:"purple"})
        server.create("todo", {id: 2, text: "Treinar", completed: false, color:"red"})
        server.create("todo",  {id: 3, text: "Aprender Redux", completed: true})
        
      },

    routes(){
        this.namespace = '/todos'
    
        this.get('/', (schema)=> {
            return schema.todos.all()
        });

       this.post('/', (schema, request)=>{
       let {text} = JSON.parse(request.requestBody)
           return schema.todos.create({id: v4(), text, completed: false, color:''});
        });
    }
})
