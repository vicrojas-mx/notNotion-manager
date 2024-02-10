export default class Kanban {
    static getTasks(columnId) {
        const data = read().find(column => {
            return column.columnId == columnId
          }
        );
        if (!data) {
            return [];
        }
        return data.tasks;
    }

    static insertTask(columnId, content){
        const data = read();
        const column = data.find(column => {
            console.log(columnId, column.columnId);
            return column.columnId == columnId
          }
        );

        if (!column) {
            throw new Error(`Error: The column ${columnId} doesn't exists!`);
        }

        const  task = {
            taskId: Math.floor(Math.random() * 100000),
            content: content
        };
        column.tasks.push(task);
        save(data);
        updateColumnCount();
        return task;
    }

    static updateTask(taskId, updatedInformation) {
        const data = read();
    
        function findColumnTask(){
            for(const column of data) {
                let task = column.tasks.find((element) => {
                    return element.taskId == taskId
                });
                if (task) {
                    return[task, column];
                }
            }
            return [];
        }
        
        const [task, currentColumn] = findColumnTask();
        if (task) {
            currentColumn.tasks.splice(currentColumn.tasks.indexOf(task),1);
            task.content = updatedInformation.content;
            const newColumn = data.find(column => column.columnId == updatedInformation.columnId);
            newColumn.tasks.push(task);
            save(data);
            updateColumnCount();
        }
    }

    static deletTask(taskId){
        const data = read();
        for(const column of data) {
            let task = column.tasks.find((element) => {
                return element.taskId == taskId
            });
            if (task) {
                column.tasks.splice(column.tasks.indexOf(task), 1);
            }
        } 
        save(data);
        updateColumnCount();
    }

    static getAllTasks() {
        const data = read() ;
        updateColumnCount();
        return [data[0].tasks, data[1].tasks, data[2].tasks];
    }
}

function read() {
    const data = localStorage.getItem("data");

    if (!data) {
        return [{columnId:0, tasks:[]}, {columnId:1, tasks: []}, {columnId:2, tasks:[]}];
    }
    return JSON.parse(data);
}


function save(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

function updateColumnCount(){
    const data = read();
    const todoCount = document.querySelector(".todo");
    const pendingCount = document.querySelector(".pending");
    const completedCount = document.querySelector(".completed");

    todoCount.textContent = data[0].tasks.length;
    pendingCount.textContent = data[1].tasks.length;
    completedCount.textContent = data[2].tasks.length; 
}