const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

taskInput.addEventListener('keypress', function(event) {
    // if enter is pressed 
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim(); // remove whitespace

        // check to see if taskText is empty then do something
        if (taskText != '') {
            const taskItem = document.createElement('li'); // create a list element
            taskItem.classList.add('task');                // add the task item to the list
            taskItem.textContent = taskText;               // the text content equals the task text
            taskItem.draggable = true;                     // we can drag it
            // start dragging
            taskItem.addEventListener('dragstart', function() {
                taskItem.classList.add('dragging');
            });
            // end dragging
            taskItem.addEventListener('dragend', function() {
                taskItem.classList.remove('dragging')
            });
            // append item to list
            todoList.appendChild(taskItem);
            taskInput.value = '';
        }
    }
});

// triggered when an item is dragged over a valid drop target
todoList.addEventListener('dragover', function(event) {
    event.preventDefault(); // called to prevent the browser's default behavior not to allow dropping
});

// triggered when item is dropped into a valid drop target
todoList.addEventListener('drop', function(event) {
    const taskItem = document.querySelector('.dragging');  // select element with class .dragging
    // if task item exists ie element is being dragged
    if (taskItem) {
        todoList.removeChild(taskItem); // remove item from todo list
        doneList.appendChild(taskItem); // add item to done list
    }
});