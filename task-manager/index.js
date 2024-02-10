const formAdd = document.querySelector("form.add");
const tasks = document.querySelector("ul.tasks");
const clearAll = document.querySelector(".clear");
const pendingTasksMessage = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

function updatePendingTasksMessage() {
    const tasksNum = tasks.querySelectorAll("li").length;
    if (tasksNum > 0) {
        pendingTasksMessage.innerText = `You have ${tasksNum} pending tasks`;
    } else {
        pendingTasksMessage.innerText = "";
    }       
}
updatePendingTasksMessage();

formAdd.addEventListener("submit", (event) => {
    let inputTask = formAdd.task.value.trim();
    console.log(inputTask);

    if (inputTask.length) {

        tasks.innerHTML += `<li>
                                <span>${inputTask}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`;
        updatePendingTasksMessage();
        formAdd.reset();
    }
    event.preventDefault();
});


tasks.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")){
        console.log(event.target);
        event.target.parentElement.remove();
        updatePendingTasksMessage();
    }
    event.preventDefault();
});

clearAll.addEventListener("click", (event) => {
    console.log(event);
    const tasksDel = tasks.querySelectorAll("li");
    tasksDel.forEach(element => element.remove());
    updatePendingTasksMessage();
});

function filterTask(term) {
    let myTerms = Array.from(tasks.children)
        .filter((task) => !task.textContent.toLowerCase().includes(term))
        .forEach(task => task.classList.add("hide"));

        Array.from(tasks.children)
        .filter((task) => task.textContent.toLowerCase().includes(term))
        .forEach(task => task.classList.remove("hide"));
}

searchForm.addEventListener("keyup", (event) => {
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term);
})

searchForm.addEventListener("click", (event) => {
    if (event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.value.trim();
        filterTask(term);
    }
})