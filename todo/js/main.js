
const todo_list = document.querySelector('.todo-list');
const todo_input = document.querySelector("#todo-input");
const btn_add = document.querySelector("#btn-add");

let isUpdate = false;
let idUpdate =null;

function createId(){
    let id = Math.floor(Math.random()*100000);
    return id;
}
let todos =[
    {
        id:createId(),
        title:"Đi thăm người yêu",
        status:true
    },
    {
        id:createId(),
        title:"Đi cafe",
        status:true
    },
    {
        id:createId(),
        title:"Đi làm",
        status:true
    },
    {
        id:createId(),
        title:"Đi chơi",
        status:false
    },
]

btn_add.addEventListener("click", function(){
    let todoTitle = todo_input.value ;
    if(todoTitle==""){
        alert("Nội dung không được rỗng");
        return
    }
    if(isUpdate){
        //update
        for(let i=0 ; i<todos.length ;i++)
        {
            if(todos[i].id==idUpdate){
                todos[i].title = todoTitle;
            }
        }
        btn_add.innerText ="Thêm";
        isUpdate = false;
        idUpdate=null;
    }else{
        //tao todo 
        let newTodo = {
            id:createId(),
            title : todoTitle,
            status:false,
        }
        todos.push(newTodo);
    }
    
    renderUI(todos);
    todo_input.value ="";
})

function renderUI(todos){
    //lam rong todo 
    todo_list.innerHTML="";
    if(todos.length==0 || todos==null){
        todo_list.innerHTML=`<p class="todos-empty">Không có công việc nào</p>`;
    }
    //loop 
    for(let i=0; i<todos.length; i++){
        const todo= todos[i];
        todo_list.innerHTML +=`
                <div class="todo-item ${todo.status?'active-todo' : ''}">
                    <div class="todo-item-title">
                        <input type="checkbox" ${todo.status?'checked':''} onClick="toggleStatus(${todo.id})">
                        
                        <p>${todo.title}</p>
                    </div>

                    <div class="option">
                        <button class="btn btn-update" onClick="updateTodo(${todo.id})"> 
                            <img src="./img/pencil.svg" alt="icon">
                        </button>
                        <button class="btn btn-delete" onClick="deleteTodo(${todo.id})">
                            <img src="./img/remove.svg" alt="icon" >
                        </button>
                    </div>
                </div>
        `;
    }
}

function updateTodo(id){
    let title="";
    for(let i =0; i<todos.length;i++){
        if(todos[i].id==id){
            title = todos[i].title;            
        }
    }
    btn_add.innerText = "Cập nhật";
    todo_input.value = title;
    todo_input.focus();
    idUpdate = id;
    isUpdate = true;
}
function deleteTodo(id){
    for(let i =0; i<todos.length;i++){
        if(todos[i].id==id){
            todos.splice(i,1);
            
        }
    }
    renderUI(todos);
}

function toggleStatus(id){
    
    for(let i =0; i<todos.length;i++){
        if(todos[i].id==id){

            todos[i].status = !todos[i].status;
            
        }
    }
    renderUI(todos);

}

renderUI(todos);
