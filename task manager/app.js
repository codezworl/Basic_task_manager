
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
function renderTasks(tasks) {
  taskList.innerHTML = tasks.map((task, index) => `
    <li data-index="${index}">
      <input type="checkbox" ${task.completed ? 'checked' : ''} />
      <span>${task.title}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </li>
  `).join('');
}


function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}


function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


const addTask = () => {
  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  if (title === '') return; 

  const newTask = { title, description, completed: false };
  const tasks = [...getTasksFromLocalStorage(), newTask];
  saveTasksToLocalStorage(tasks);
  renderTasks(tasks);

 
  taskTitleInput.value = '';
  taskDescriptionInput.value = '';
};


const editTask = (index) => {
  const tasks = getTasksFromLocalStorage();
  const updatedTitle = prompt('Enter new title:', tasks[index].title);
  if (updatedTitle === null) return; 
  tasks[index].title = updatedTitle;
  saveTasksToLocalStorage(tasks);
  renderTasks(tasks);
};


const deleteTask = (index) => {
  const tasks = getTasksFromLocalStorage();
  tasks.splice(index, 1);
  saveTasksToLocalStorage(tasks);
  renderTasks(tasks);
};


addTaskBtn.addEventListener('click', addTask);

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const listItem = event.target.closest('li');
    const index = listItem.dataset.index;
    editTask(index);
  } else if (event.target.classList.contains('delete-btn')) {
    const listItem = event.target.closest('li');
    const index = listItem.dataset.index;
    deleteTask(index);
  }
});

renderTasks(getTasksFromLocalStorage());
