const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value;

  if(text.trim() !== '') {

    errorEl.hidden = true;
    tasks.push({ 
      id: nextId++, 
      text: text, 
      done: false 
    });
    input.value = "";
    render();

  } else {
    errorEl.hidden = false;
  }

}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  
  if(task.done != true) {
    task.done = true
  } else {
    task.done = false
  }

  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);

  render();
}

function clearCompleted() {
  let arrayComplete = [];
  
  tasks.forEach((e) => {
    if(e.done) {
      arrayComplete.push(e);
    }
  })

  render();
}

function getVisibleTasks() {
  return tasks;
}

function updateCounter() {
  let countCompleateTask = 0;
  for(let j = 0; j < tasks.length; j++) {
    if(tasks[j].done == false) {
      countCompleateTask++;
    }
  }
  counter.textContent = "Активных задач: " + countCompleateTask;
}

function render(filter = {}) {
  const visible = getVisibleTasks();


  list.querySelectorAll('li').forEach((e) => {
    e.remove();
  })
  
  for (let i = 0; i < visible.length; i++) {

    const task = visible[i];
    const li = document.createElement("li");
    
    li.className = "task";

    if (task.done) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }


    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    switch(Object.values(filter)[0]) {
      case 'active': {
        if(!li.classList.contains("completed")) {
          li.appendChild(span);
          li.appendChild(del);
          list.appendChild(li);
        }
      }
      break;
      case 'done': {
        if(li.classList.contains("completed")) {
          li.appendChild(span);
          li.appendChild(del);
          list.appendChild(li);
        }
      }
      break;
      default: {
        li.appendChild(span);
        li.appendChild(del);
        list.appendChild(li);
      }
    }
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;

    render( {filter: currentFilter} );
  });
});

render();
