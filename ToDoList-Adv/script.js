console.log("JS connected")

let inputTask = document.getElementById("inputTask")
let addTask = document.getElementById("addTask")
let taskList = document.getElementById("taskList")

function addNewTask() {
    let taskText = inputTask.value

    // if the task is empty don't add it 
    if (taskText.trim() === "") {
        return
    }

    // creating "li"
    let newTask = document.createElement("li")

    // creating delete button
    let deleteButton = document.createElement("button")

    // adding content to the li 
    newTask.textContent = taskText

    // Putting delete name to the button 
    deleteButton.textContent = "Delete"

    // adding the "delete" button inside "li"
    newTask.appendChild(deleteButton)

    // deleting a task 
    deleteButton.addEventListener("click", function(e) {
        e.stopPropagation()
        newTask.remove()
    })

    // task completed 
    newTask.addEventListener("click", function() {
        newTask.classList.toggle("completed")
    })

    // adding "li" inside the "ul"
    taskList.appendChild(newTask)

    // clear input
    inputTask.value = ""
}

addTask.addEventListener("click", addNewTask)

inputTask.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addNewTask()
    }
})