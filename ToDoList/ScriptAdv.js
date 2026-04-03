document.addEventListener("DOMContentLoaded", () => {
  const inputTask = document.getElementById("inputTask");
  const addTask = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTask.addEventListener("click", () => {
    const taskText = inputTask.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    inputTask.value = "";
  });

  inputTask.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask.click();
    }
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;

      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();

      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});