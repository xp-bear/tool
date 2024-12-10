document.addEventListener("DOMContentLoaded", () => {
  const addTaskButton = document.getElementById("add-task"); //添加按钮
  const newTaskInput = document.getElementById("new-task"); //输入框
  const taskList = document.getElementById("task-list"); //ul列表

  // 监听回车事件。
  newTaskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // 可选：阻止默认行为

      const taskText = newTaskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        newTaskInput.value = "";
      }
    }
  });

  // Load tasks from local storage on page load
  window.onload = function () {
    loadTasks();
  };
  // ----------------------------------
  // Event delegation for double-click editing on <li> elements
  taskList.addEventListener("dblclick", function (event) {
    if (event.target.tagName.toLowerCase() === "li") {
      editTask(event.target);
    }
  });

  // Function to enter edit mode for a task
  function editTask(liElement) {
    const originalText = liElement.firstChild.nodeValue;
    const input = document.createElement("input");
    input.type = "text";
    input.value = originalText;
    input.classList.add("edit-input"); // Optional: For styling the input field

    liElement.replaceChild(input, liElement.firstChild);

    input.focus();
    input.setSelectionRange(originalText.length, originalText.length); // Place cursor at the end of text

    // Save changes when pressing Enter or losing focus
    input.addEventListener("blur", saveEdit.bind(null, liElement, input, originalText));
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        saveEdit(liElement, input, originalText);
      }
    });
  }

  // Function to save edits and update localStorage
  function saveEdit(liElement, input, originalText) {
    const newText = input.value.trim();
    if (newText !== "") {
      liElement.replaceChild(document.createTextNode(newText), input);

      // Update in localStorage
      let tasks = getTasksFromStorage().map((task) => (task === originalText ? newText : task));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      // If empty, revert back to original text
      liElement.replaceChild(document.createTextNode(originalText), input);
    }
  }
  // ----------------------------------------------------
  // 点击添加按钮
  addTaskButton.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      newTaskInput.value = "";
    }
  });

  // Add task to DOM and local storage
  function addTask(text) {
    const li = document.createElement("li");
    li.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.onclick = () => {
      deleteTask(li);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    // 如果 ul 中已经有子元素，则将新 li 插入到第一个子元素之前
    if (taskList.children.length > 0) {
      taskList.insertBefore(li, taskList.firstElementChild);
    } else {
      // 如果没有子元素，直接添加新 li
      taskList.appendChild(li);
    }

    // 保存到本地
    saveTask(text);
  }

  // Save task to local storage
  function saveTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Get tasks from local storage
  function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  // Load tasks from local storage to DOM
  function loadTasks() {
    const tasks = getTasksFromStorage();
    localStorage.removeItem("tasks"); //清除这个tasks的值
    tasks.forEach((task) => addTask(task));
  }

  // Delete task from DOM and local storage
  function deleteTask(taskElement) {
    taskElement.remove();

    // Remove from local storage
    let tasks = getTasksFromStorage();
    tasks = tasks.filter((t) => t !== taskElement.firstChild.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
