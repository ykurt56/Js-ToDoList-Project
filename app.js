// Tüm Elementleri Seçmek İçin 

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody= document.querySelectorAll(".card-body")[0];
const secondCardBody= document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch")

let todos = [];
runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click",allTodosDelete);
    filterInput.addEventListener("keyup",filter)
}

function pageLoaded(){
    checkTodosFromStroge();
    todos.forEach(function(todo){
    addTodoUI(todo);
    });
}


function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");
    if(todoList.length>0){
        todoList.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                
                todo.setAttribute("style","display : block");

            }else {
                todo.setAttribute("style","display : none !important");
            }
        });

    }else {
        showAlert("warning","Filtreleme yapmak için en az bir todo giriniz.")
    }
}




function allTodosDelete(){
    const todoListRemove = document.querySelectorAll(".list-group-item");
    if(todoListRemove.length>0){
        todoListRemove.forEach(function(todo){
            todo.remove();
        });

        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Başarılı Bir Şekilde Todolar Silindi.")

    }else {
        showAlert("warning", "Silmek İçin En Az Bir Tane Todo Olmak Zorunda.")
    }
}


function removeTodoToUI(e){
    if(e.target.className === "fa fa-remove"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        removeTodoToStorage(todo.textContent);
        showAlert("success","Todo Başarıyla Silinmiştir.")
            console.log(todo)
    }
    
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStroge();
    todos.forEach(function(todo, index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}


function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen Boş Bırakmayınız !")
        
    }else {
        addTodoUI(inputText);
        addTodoStroge(inputText);
        showAlert("success","Todo Başarıyla Eklenmiştir.")
    }
        e.preventDefault();
}

function addTodoUI(newTodo) {

    // <li class="list-group-item d-flex justify-content-between">Todo 1
    //                         <a href="#" class="delete-item">
    //                             <i class="fa fa-remove"></i>
    //                         </a>
    //                     </li>


    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";


}

function addTodoStroge(newTodo){
    checkTodosFromStroge();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
} 

function checkTodosFromStroge(){
    if(localStorage.getItem("todos")==null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
        
    }, 2500);
}