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

doneList.addEventListener('dragover', function(event) {
    event.preventDefault();
    doneList.classList.add('drag-over');
    // Show placeholder if there are no tasks in doneList
    if (doneList.querySelectorAll('.task').length === 0) {
        doneList.querySelector('.placeholder').style.display = 'block';
    }
});

doneList.addEventListener('dragleave', function(event) {
    doneList.classList.remove('drag-over');
    // Hide placeholder
    doneList.querySelector('.placeholder').style.display = 'none';
});

doneList.addEventListener('drop', function(event){
    const taskItem = document.querySelector('.dragging');
    if (taskItem && doneList.classList.contains('drag-over')) {
        doneList.classList.remove('drag-over');
        doneList.appendChild(taskItem);
    }
});

todoList.addEventListener('dragover', function(event){
    event.preventDefault();
});

todoList.addEventListener('drop', function(event) {
    const taskItem = document.querySelector('.dragging');
    if (taskItem && !doneList.classList.contains('drag-over')) {
        todoList.appendChild(taskItem);
    }
});

// TODO: Currently, when you drag an item over the placeholder text in the Done list, the placeholder disappears even if 
//       you stop dragging over it. But, it does not disappear if you drop the item into the done list. 