// A standard todo list array initialized with sample data
let todoList = [
  {
    id: 1,
    text: "Buy groceries",
    completed: false
  },
  {
    id: 2,
    text: "Finish JavaScript project",
    completed: true
  },
  {
    id: 3,
    text: "Walk the dog",
    completed: false
  }
];

const todoListUl = document.getElementById("task-list");
const addTaskBtn = document.getElementById('add-task-btn');
const createTodoForm = document.querySelector('.todo-form');

// Function to create a todo <li> item
function createTodoLi(todoItem) {
  const li = document.createElement("li");
  li.className = "text-xl py-2 text-gray-700";
  li.setAttribute("data-id", todoItem.id);

  // Wrapping checkbox and text inside a <label> makes the text clickable
  li.innerHTML = `
    <label style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
      <input type='checkbox' class='todo-box' ${todoItem.completed ? 'checked' : ''} /> 
      <span class='todo-text' style='text-decoration: ${todoItem.completed ? "line-through" : "none"}; color: ${todoItem.completed ? "gray" : "black"};'>
        ${todoItem.text}
      </span>
    </label>
    <button type='button' class='delete-btn' style='margin-left: 10px; cursor: pointer;'>Delete</button>
  `;

  // Checkbox event listener
  const checkbox = li.querySelector('.todo-box');
  const todoText = li.querySelector('.todo-text');

  checkbox.addEventListener('change', (event) => {
    todoItem.completed = event.target.checked;
    if (event.target.checked) {
      todoText.style.textDecoration = 'line-through';
      todoText.style.color = 'gray';
    } else {
      todoText.style.textDecoration = 'none';
      todoText.style.color = 'black';
    }
  });

  // Delete button event listener
  const deleteBtn = li.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deleteTodoItem(todoItem.id);
  });

  return li;
}

// Function to render the full initial list
function showTodoList() {
  todoListUl.innerHTML = "";
  todoList.forEach((item) => {
    const todoLi = createTodoLi(item);
    todoListUl.appendChild(todoLi);
  });
}

// Handle Form Submission
createTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formTodos = new FormData(event.target);
  const data = Object.fromEntries(formTodos.entries());
  const newTodoText = data['todo-input'] ? data['todo-input'].trim() : "";

  // Alert if empty and prevent adding
  if (newTodoText === "") {
    alert("Todo text cannot be empty!");
    return;
  }

  const newTodoItem = {
    id: Date.now(),
    text: newTodoText,
    completed: false
  };

  todoList.push(newTodoItem);
  const newLi = createTodoLi(newTodoItem);
  todoListUl.appendChild(newLi);

  event.target.reset();
});

// Toggle Add Todo Form
addTaskBtn.addEventListener('click', () => {
  const currentText = addTaskBtn.innerText.trim().toLowerCase();
  if (currentText === "add todo") {
    createTodoForm.style.display = "flex";
    addTaskBtn.innerText = "Cancel";
  } else {
    createTodoForm.style.display = "none";
    addTaskBtn.innerText = "Add Todo";
  }
});

// Delete function
function deleteTodoItem(id) {
  todoList = todoList.filter((item) => item.id !== id);
  const liToRemove = document.querySelector(`li[data-id='${id}']`);
  if (liToRemove) {
    liToRemove.remove();
  }
}

// Initial render
showTodoList();