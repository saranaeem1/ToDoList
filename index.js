document.addEventListener("DOMContentLoaded", function () {
  const taskAddButton = document.getElementById("taskbutton");
  const inputTask = document.getElementById("inputtask");
  const taskList = document.getElementById("tasklist");
  const taskDoneContainer = document.getElementById("taskdone");

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    tasks.forEach(function (task) {
      addTaskToDOM(task, false);
    });

    doneTasks.forEach(function (task) {
      addTaskToDOM(task, true);
    });
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    taskList
      .querySelectorAll(".taskcontainer")
      .forEach(function (taskContainer) {
        const taskContent =
          taskContainer.querySelector(".taskparacontent").textContent;
        tasks.push(taskContent);
      });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const doneTasks = [];
    taskDoneContainer
      .querySelectorAll(".taskdonecontainer")
      .forEach(function (taskDoneItem) {
        const taskContent = taskDoneItem.querySelector("p").textContent;
        doneTasks.push(taskContent);
      });
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  }

  // Add task to the DOM
  function addTaskToDOM(taskValue, isDone) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add(isDone ? "taskdonecontainer" : "taskcontainer");

    const taskPara = document.createElement("div");
    taskPara.classList.add(isDone ? "taskdonepara" : "taskpara");

    const taskParaContent = document.createElement("p");
    taskParaContent.classList.add("taskparacontent");
    taskParaContent.textContent = taskValue;
    taskPara.appendChild(taskParaContent);

    const taskIcon = document.createElement("div");
    taskIcon.classList.add("taskicon");

    const checkButton = document.createElement("button");
    checkButton.classList.add("iconbutton");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';

    const editButton = document.createElement("button");
    editButton.classList.add("iconbutton");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("iconbutton");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    if (!isDone) {
      taskIcon.appendChild(checkButton);
      taskIcon.appendChild(editButton);
      taskIcon.appendChild(deleteButton);
    }
    

    taskContainer.appendChild(taskPara);
    taskContainer.appendChild(taskIcon);

    if (isDone) {
      taskDoneContainer.appendChild(taskContainer);
    } else {
      taskList.appendChild(taskContainer);
    }
  }

  // Add task button click event
  taskAddButton.addEventListener("click", function () {
    const taskValue = inputTask.value.trim();

    if (taskValue) {
      addTaskToDOM(taskValue, false);
      inputTask.value = "";
      saveTasks();
    }
  });

  // Task list event delegation
  taskList.addEventListener("click", function (event) {
    const button = event.target.closest(".iconbutton");
    if (button) {
      const taskContainer = button.closest(".taskcontainer");
      const taskParaContent = taskContainer.querySelector(".taskparacontent");

      if (button.innerHTML.includes("fa-check")) {
        addTaskToDOM(taskParaContent.textContent, true);
        taskContainer.remove();
        saveTasks();
      } else if (button.innerHTML.includes("fa-edit")) {
        const newValue = prompt("Edit task:", taskParaContent.textContent);
        if (newValue) {
          taskParaContent.textContent = newValue;
          saveTasks();
        }
      } else if (button.innerHTML.includes("fa-trash")) {
        taskContainer.remove();
        saveTasks();
      }
    }
  });

  // Load tasks on page load
  loadTasks();
});
