import Kanban from "./kanban.js";

const todoCards = document.querySelector(".cards.todo");
const pendingCards = document.querySelector(".cards.pending");
const completedCards = document.querySelector(".cards.completed");

const taskbox = [todoCards, pendingCards, completedCards];

function addTask(task, index) {
    const element = document.createElement("form");
    element.className = "card";
    element.draggable = true;
    element.dataset.id = task.taskId;
    element.innerHTML = `
        <input type="text" name="task" autocomplete="off" disabled="disabled" value="${task.content}">
            <div>
                <span class="task-id">#${task.taskId}</span>
                <span>
                   <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                   <button class="bi bi-check-lg update hide" data-id="${task.taskId}"></button>
                   <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
                </span>
             </div>
    `;
    taskbox[index].appendChild(element);
}

clearScreenTasks();
retrieveAllTasks();

function clearScreenTasks() {
    todoCards.innerHTML = "";
    pendingCards.innerHTML = "";
    completedCards.innerHTML = "";
}

function retrieveAllTasks() {
    Kanban.getAllTasks().forEach((tasks, index) => {
        tasks.forEach(task => {
            addTask(task, index); 
        });
    });
}

const addForm = document.querySelectorAll(".add");
addForm.forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (form.task.value){
            const task = Kanban.insertTask(form.submit.dataset.id, form.task.value.trim());
            addTask(task, form.submit.dataset.id);
            form.reset();    
        }
    })
});


taskbox.forEach((column, columnId) => {
    column.addEventListener("click", event => {
        event.preventDefault();

        if (event.target.classList.contains("edit")){
            event.target.classList.add("hide");
            event.target.nextElementSibling.classList.remove("hide");
            event.target.form.task.removeAttribute("disabled");
        }

        if (event.target.classList.contains("update")){
            event.target.classList.add("hide");
            event.target.previousElementSibling.classList.remove("hide");
            event.target.form.task.setAttribute("disabled","disabled"); 
            const taskId = event.target.dataset.id;
            Kanban.updateTask(taskId, {
                columnId: columnId,
                content: event.target.form.task.value
            });
        }

        if (event.target.classList.contains("delete")){
            const taskId = event.target.dataset.id;
            event.target.form.remove()
            Kanban.deletTask(taskId);
        }
    });

    column.addEventListener("dragstart", event => {
        if (event.target.classList.contains("card")) {
            event.target.classList.add("dragging");
        }
    });

    column.addEventListener("dragover", event => {
        const card = document.querySelector(".dragging");
        column.appendChild(card);
    });

    column.addEventListener("dragend", event => {
        if (event.target.classList.contains("card")){
            event.target.classList.remove("dragging");
            const taskId = event.target.dataset.id;
            const columnId = column.dataset.id;
            const content = event.target.task.value;
            Kanban.updateTask(taskId, {
                columnId,
                content 
            })
        }
    });

})