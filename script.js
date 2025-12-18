document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 1. Add click event
    addButton.addEventListener('click', addTask);

    // 2. FIXED: Add keypress event to the INPUT, not the button
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        
        // 3. UX IMPROVEMENT: Don't use alert(). 
        // Just return if empty, or show a custom error message.
        if (!taskText) {
            console.warn("Task cannot be empty"); 
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create Remove Button
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'Remove';
        
        // Remove logic
        removeButton.addEventListener('click', () => {
            listItem.remove();
        });

        // Append button to the list item
        listItem.appendChild(removeButton);

        // 4. FIXED: Only append the finished item to the list ONCE
        taskList.appendChild(listItem);

        // Clear input
        taskInput.value = "";
    }
});