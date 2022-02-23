import { Server } from 'miragejs'

new Server({

    routes(){
        this.namespace = '/todos'
    
        this.get('/', (schema)=> {
            return {}
        });

        this.post('/', (schema, request)=>{
       let attrs = JSON.parse(request.requestBody)
       console.log(attrs.todo)
           return schema.todos.create(attrs.todo);
        });
    }
})
