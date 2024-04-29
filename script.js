const taskInput = document.getElementById('task-input');  // get task-input element
const todoList = document.getElementById('todo-list');    // get todo-list element
const doneList = document.getElementById('done-list');    // get done-list element

// check for saved tasks in local storage and load them
document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const taskItem = createTaskElement(task);
        if (task.completed && !task.querySelector('.placeholder')) {
            doneList.appendChild(taskItem);
        } else {
            todoList.appendChild(taskItem);
        }
    });
});

// function to create a task element
function createTaskElement(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    taskItem.textContent = task.text;
    taskItem.draggable = true;
    taskItem.addEventListener('dragstart', function() {
        taskItem.classList.add('dragging');
    });
    taskItem.addEventListener('dragend', function() {
        taskItem.classList.remove('dragging');
    });
    return taskItem;
}

// function to add task
function addTask(taskText) {
    const taskItem = createTaskElement({ text: taskText });
    todoList.appendChild(taskItem);
    saveTasks();
}

// function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    [...todoList.children].forEach(task => tasks.push({ text: task.textContent, completed: false}));
    [...doneList.children].forEach(task => tasks.push({ text: task.textContent, completed: true}));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// function to clear tasks from done list
function deleteChildren () {
    let tasks = doneList.querySelectorAll('.task');
    tasks.forEach(task => doneList.removeChild(task));
    const placeholder = doneList.querySelector('.placeholder');
    placeholder.style.display = 'block';
}

// event listener for adding a new task
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    }
});

// event listener for clearing done tasks
document.getElementById('clear-done-button').addEventListener('click', function() {
    deleteChildren();
    //const list = document.getElementById('done-list');
    //const placeholder = document.querySelector('.placeholder');
    //if (list.children.length > 1) {
    //    placeholder.style.display = 'none';
    //}
    saveTasks();
});

// event listeners for drag and drop functionality
todoList.addEventListener('dragover', function(event){
    event.preventDefault();
});

todoList.addEventListener('drop', function(event) {
    const taskItem = document.querySelector('.dragging');
    // if taskItem exists and is not being dragged over the doneList
    if (taskItem && !doneList.classList.contains('drag-over')) {
        todoList.appendChild(taskItem); // add item to todo list
    }
    saveTasks();
});

doneList.addEventListener('dragover', function(event) {
    event.preventDefault();
    doneList.classList.add('drag-over');
});

doneList.addEventListener('dragleave', function(event) {
    doneList.classList.remove('drag-over');
});

doneList.addEventListener('drop', function(event) {
    const taskItem = document.querySelector('.dragging');
    const placeholder = doneList.querySelector('.placeholder');
    if (taskItem && doneList.classList.contains('drag-over')) {
        doneList.classList.remove('drag-over');
        doneList.appendChild(taskItem);
        placeholder.style.display = 'none'; // hide placeholder
    }
    saveTasks();
});
