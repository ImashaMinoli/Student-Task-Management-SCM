const STORAGE_KEY = "student-tasks";

const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const dueInput = document.getElementById("due");
const priorityInput = document.getElementById("priority");
const list = document.getElementById("task-list");
const empty = document.getElementById("empty");
const summary = document.getElementById("summary");
const progressBar = document.getElementById("progress-bar");
const filterButtons = document.querySelectorAll(".filter");
const clearButton = document.getElementById("clear-completed");

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return JSON.parse(stored);
  // First run: start with the initial SCM records from docs/initial-scm-records.js
  return window.INITIAL_SCM_RECORDS ? [...window.INITIAL_SCM_RECORDS] : [];
}

let tasks = loadTasks();
let currentFilter = "all";

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(title, due, priority) {
  tasks.push({ id: Date.now(), title, due, priority, done: false });
  save();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  save();
  render();
}

// CR-01: remove all completed tasks at once
function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  save();
  render();
}

function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.done);
  if (currentFilter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task" + (task.done ? " done" : "");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const info = document.createElement("div");
  info.className = "task-info";

  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;
  info.appendChild(title);

  if (task.due) {
    const meta = document.createElement("span");
    meta.className = "task-meta";
    meta.textContent = "Due " + task.due;
    info.appendChild(meta);
  }

  const badge = document.createElement("span");
  badge.className = "badge " + task.priority;
  badge.textContent = task.priority;

  const del = document.createElement("button");
  del.className = "delete";
  del.textContent = "Delete";
  del.addEventListener("click", () => deleteTask(task.id));

  li.append(checkbox, info, badge, del);
  return li;
}

function render() {
  const visible = getVisibleTasks();
  list.innerHTML = "";
  visible.forEach((task) => list.appendChild(createTaskElement(task)));

  empty.hidden = visible.length > 0;
  clearButton.hidden = !tasks.some((t) => t.done);

  const remaining = tasks.filter((t) => !t.done).length;
  summary.textContent = tasks.length
    ? `${remaining} of ${tasks.length} tasks remaining`
    : "No tasks yet";

  const completed = tasks.length - remaining;
  progressBar.style.width = tasks.length ? (completed / tasks.length) * 100 + "%" : "0";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  addTask(title, dueInput.value, priorityInput.value);
  form.reset();
  priorityInput.value = "Medium";
});

clearButton.addEventListener("click", clearCompleted);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === button));
    render();
  });
});

save();
render();
