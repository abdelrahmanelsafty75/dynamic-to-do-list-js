 document.addEventListener('DOMContentLoaded', () => {
     const addButton = document.getElementById('add-task-btn');
     const taskInput = document.getElementById('task-input');
     const taskList = document.getElementById('task-list');

     loadTasks();

     function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
         storedTasks.forEach(taskText => addTask(taskText, false));
     }
     
     function addTask(taskText, save = true) {
         const listItem = document.createElement('li');
         listItem.textContent = taskText;
         const removeButton = document.createElement('button');
         removeButton.textContent = 'Remove';
         removeButton.className = 'remove-btn';
        
         removeButton.onclick = function() {
             taskList.removeChild(listItem);
             const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
             const updatedTasks = storedTasks.filter(task => task !== taskText);

             localStorage.setItem('tasks', JSON.stringify(updatedTasks));
         };
         listItem.appendChild(removeButton);
         taskList.appendChild(listItem);
         if (save) {
             const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
             storedTasks.push(taskText);
             localStorage.setItem('tasks', JSON.stringify(storedTasks));
         }
     }
     
     function handleAddTask() {
         const taskText = taskInput.value.trim();
         if (taskText === "") {
             alert('Please enter a task.');
             return;
         }
         addTask(taskText);
         taskInput.value = "";
     }

     addButton.addEventListener('click', handleAddTask);
     taskInput.addEventListener('keypress', (event) => {
         if (event.key === 'Enter') {
             handleAddTask();
         }
     });
 });