const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
let currentFilter = "all";

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    if (
      currentFilter === "all" ||
      (currentFilter === "active" && !task.completed) ||
      (currentFilter === "completed" && task.completed)
    ) {
      addTaskToDOM(task.text, task.completed);
    }
  });
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    saveTask(taskText, false);
    taskInput.value = "";
    loadTasks();
  }
});

function addTaskToDOM(taskText, completed) {
  const li = document.createElement("li");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    span.classList.toggle("completed");
    updateTask(taskText, checkbox.checked);
    loadTasks();
  });

  const span = document.createElement("span");
  span.textContent = taskText;
  if (completed) {
    span.classList.add("completed");
  }

  taskContent.appendChild(checkbox);
  taskContent.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Usuń";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = function () {
    deleteTask(taskText);
    loadTasks();
  };

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) => (t.text === text ? { text: t.text, completed } : t));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(filter) {
  currentFilter = filter;
  loadTasks();
}
