let btn = document.getElementById('addBtn')
let addTodoBox = document.getElementById('dialog')
let close = document.getElementById('close')

//TaskBoxContainer
// let closeTask = document.querySelectorAll(".closeTask1");
let todoContainer = document.getElementById("todo_container")
let todoTitle = document.getElementById('title')
let todoContent = document.getElementById('todo_text')


let counter = 0;

let todoStore = JSON.parse(localStorage.getItem("todo")) || [];
console.log(todoStore);

counter = todoStore.length;
for (let i = 0; i < counter; i++) {
    let cur = todoStore[i];
    todoStore[i].id = i;
    let todo = ` <div class="todo" id="${i}">
                    <div class="close closeTask1">X</div>
                    <div class="title">${cur["title"]}</div>
                    <div class="content">${cur["content"]}</div>
                </div>`;

    todoContainer.innerHTML = todoContainer.innerHTML + todo;
}
localStorage.setItem("todo", JSON.stringify(todoStore));




btn.addEventListener('click', () => {
    addTodoBox.style.display = "flex";
});

close.addEventListener('click', () => {
    addTodoBox.style.display = "none";
})

// adding close listner to all todo which is being created
function addCloseListnerToAllTodo() {
    let closeTask = document.querySelectorAll(".closeTask1");
    console.log(closeTask)
    for (let i = 0; i < counter; i++) {
        closeTask[i].addEventListener('click', (e) => {
            let gettodo = e.target.closest(".todo")
                // console.log(gettodo)
            let id = gettodo.getAttribute("id");
            console.log(id)
            gettodo.style.display = "none"

            //main delete from the Local Storage
            let todoStore = JSON.parse(localStorage.getItem("todo")) || [];
            let makeNewtodoStore = [];
            let j = 0;
            for (let obj of todoStore) {
                if (obj["id"] == id) { continue; }
                obj["id"] = j++;
                makeNewtodoStore.push(obj);
            }
            localStorage.setItem("todo", JSON.stringify(makeNewtodoStore));
            todoStore = makeNewtodoStore;
            counter = j;
            console.log("conter" + j);
        });
    }
}
addCloseListnerToAllTodo();

function addTodo() {
    let todo = ` <div class="todo" id="${counter}">
                    <div class="close closeTask1">X</div>
                    <div class="title">${todoTitle.value}</div>
                    <div class="content">${todoContent.value}</div>
                </div>`;

    todoContainer.innerHTML = todoContainer.innerHTML + todo;
    todoStore.push({
        "id": counter,
        "title": todoTitle.value,
        "content": todoContent.value
    });
    localStorage.setItem("todo", JSON.stringify(todoStore));
    addCloseListnerToAllTodo();
    counter++;

    todoTitle.value = "";
    todoContent.value = "";
    addTodoBox.style.display = "none"

    console.log(todoContainer.innerHTML)
}