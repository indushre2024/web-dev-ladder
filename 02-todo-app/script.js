let todos = JSON.parse(localStorage.getItem('todos')) || [];
const form = document.querySelector('.new-todo');
const todo_input = document.getElementById('todo');
const todo_list = document.querySelector('.todos');

display_todos();
function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function create_todo_item(todo, todo_id){
    const li_item = document.createElement('li');
    li_item.draggable=true;
    li_item.innerHTML = `<input type="checkbox" id=${todo_id} name=${todo_id} ${todo.complete==true?'checked':''}>
                <label for=${todo_id} class = "custom-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for=${todo_id} class = "todo-text">${todo['todo_text']}</label>
                <button class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="var(--text-color)" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>`
    return li_item;
}

function display_todos(){
    todo_list.innerHTML = '';
    todos.forEach((todo,index)=>{
        const liItem = create_todo_item(todo,`todo${index}`);
        todo_list.append(liItem);
        const delBtn = liItem.querySelector('.delete-btn');
        delBtn.addEventListener('click', function(e){
            todos = todos.filter(function(todo,ind){
               return ind!=index;
            })
            saveTodos();
            display_todos();
        })
        const checkBox = liItem.querySelector('input[type="checkbox"]');
        checkBox.addEventListener('change', function(e){
            todos[index].complete = checkBox.checked;
            saveTodos();
        })
    })
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    const todo = todo_input.value.trim();
    if(todo.length > 0){
        todos.push({'todo_text':todo, 'complete':false});
        saveTodos();
        display_todos();
    }
    todo_input.value = '';
});

let todoItems = [...document.querySelectorAll(".todos li")];
let oInd;
let endInd;

todoItems.forEach(card=>{
    card.addEventListener("dragstart",e=>{
        oInd = todoItems.indexOf(card);
        card.classList.add("dragging");
    });
    card.addEventListener("dragend",e=>{
        card.classList.remove("dragging");
        todoItems = [...document.querySelectorAll(".todos li")];
        endInd = todoItems.indexOf(card);
        const content = todos.splice(oInd,1)[0];
        todos.splice(endInd,0,content);
        saveTodos();
    });
});

todo_list.addEventListener("dragover",e=>{
    e.preventDefault();
    const targetTodo = getBelowTodo(e.clientY).element || undefined;
    const drag = document.querySelector(".dragging");
    if(targetTodo){
        todoItems = [...document.querySelectorAll(".todos li")];
        let ind = todoItems.indexOf(targetTodo);
        todo_list.insertBefore(drag,targetTodo);
    }else todo_list.append(drag);
})

function getBelowTodo(y){
    const todoCards = [...document.querySelectorAll(".todos li:not(.dragging)")];
    const target = todoCards.reduce((result, todo)=>{
        const box = todo.getBoundingClientRect();
        let offset = y - box.y - box.height/2;
        if(offset<0 && offset>result.offset){
            result = {offset:offset,element:todo};
        }
        return result;
    },{offset:Number.NEGATIVE_INFINITY})
    return target;
}
    