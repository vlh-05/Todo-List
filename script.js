let tasks = [];
function addTask() 
{
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "" || taskText.length > 20) {
    return; 
  }
  const task = {
    id: Date.now().toString(),
    text: taskText,
    status: null
  };
  tasks.push(task);
  renderTasks();
  taskInput.value = "";
  updateCharacterCount();
}
function deleteTask(taskId)
{
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}
function finishTask(taskId) 
{
  const task = tasks.find(task => task.id === taskId);
  if (task) 
  {
    task.status = "Completed";
    renderTasks();
  }
}
function updateTaskStatus(taskId, status) 
{
  const task = tasks.find(task => task.id === taskId);
  if (task && task.status !== "Completed") 
  {
    task.status = status;
    renderTasks();
  }
}
function renderTasks() 
{
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    // Use the setAttribute method to set the attributes programmatically
    const taskText = document.createElement("div");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    li.appendChild(taskText);
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown mr-3";
    li.appendChild(dropdown);
    const button = document.createElement("button");
    button.className = "dropdown-toggle status-dropdown";
    button.dataset.taskid = task.id; // Use the dataset property to access the data attributes
    button.disabled = task.status === "Completed";
    button.textContent = task.status ? task.status : "Status";
    button.onclick = function () 
    {
      toggleDropdown(this);
    };
    dropdown.appendChild(button);
    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.id = "dropdownMenu" + task.id;
    dropdown.appendChild(dropdownMenu);
    const pending = document.createElement("a");
    pending.href = "#";
    pending.textContent = "Pending";
    pending.onclick = function () 
    {
      updateTaskStatus(task.id, "Pending");
    };
    dropdownMenu.appendChild(pending);
    const inProgress = document.createElement("a");
    inProgress.href = "#";
    inProgress.textContent = "In Progress";
    inProgress.onclick = function () 
    {
      updateTaskStatus(task.id, "In Progress");
    };
    dropdownMenu.appendChild(inProgress);
    const completed = document.createElement("a");
    completed.href = "#";
    completed.textContent = "Completed";
    completed.onclick = function () 
    {
      updateTaskStatus(task.id, "Completed");
    };
    dropdownMenu.appendChild(completed);
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () 
    {
      deleteTask(task.id);
    };
    li.appendChild(deleteButton);
    const finishButton = document.createElement("button");
    finishButton.className = "finish-button";
    finishButton.textContent = "Finish";
    finishButton.onclick = function () 
    {
      finishTask(task.id);
    };
    li.appendChild(finishButton);
    taskList.appendChild(li);
  });
}
function handleKeyPress(event) 
{
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
}
function toggleDropdown(button) 
{
  const dropdownId = button.dataset.taskid; // Use the dataset property to access the data attributes
  const dropdownMenu = document.getElementById("dropdownMenu" + dropdownId);
  dropdownMenu.classList.toggle("show");
}
window.onclick = function (event) 
{
  // Check if the event target is a dropdown menu item
  if (
    !event.target.matches(".status-dropdown") &&
    !event.target.closest(".dropdown-menu")
  ) {
    const dropdowns = document.getElementsByClassName("dropdown-menu");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
function updateCharacterCount()
 {
  const taskInput = document.getElementById("taskInput");
  const charCount = document.getElementById("charCount");
  const remainingChars = 20 - taskInput.value.trim().length; // Use the trim method to remove whitespace
  charCount.textContent = `${taskInput.value.trim().length}/${20}`; // Use the trim method to remove whitespace
  if (remainingChars <= 0) 
  {
    taskInput.value = taskInput.value.substring(0, 20);
  }
}
taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", handleKeyPress); 
updateCharacterCount();
