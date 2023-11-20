let alertBtn = document.querySelector(".alert");
let alertPage = document.querySelector(".alert-page");

let todoBtn = document.querySelector(".todo");
let todoPage = document.querySelector(".todo-page");

let formBtn = document.querySelector(".form");
let formPage = document.querySelector(".form-page");

let defaultPage = document.querySelector(".default-page");

const pageState = (prop1, prop2, prop3, prop4) => {
	alertPage.style.display = prop1;
	todoPage.style.display = prop2;
	formPage.style.display = prop3;
	defaultPage.style.display = prop4;
};

const linkState = (cond1, cond2, cond3) => {
	if (cond1) {
		alertBtn.classList.add(cond1);
		todoBtn.classList.remove(cond1);
		formBtn.classList.remove(cond1);
	} else if (cond2) {
		alertBtn.classList.remove(cond2);
		todoBtn.classList.add(cond2);
		formBtn.classList.remove(cond2);
	} else if (cond3) {
		alertBtn.classList.remove(cond3);
		todoBtn.classList.remove(cond3);
		formBtn.classList.add(cond3);
	}
};

alertBtn.addEventListener("click", () => {
	pageState("block", "none", "none", "none");
	linkState("active", "", "");
});

todoBtn.addEventListener("click", () => {
	pageState("none", "block", "none", "none");
	linkState("", "active", "");
});

formBtn.addEventListener("click", () => {
	pageState("none", "none", "block", "none");
	linkState("", "", "active");
});

// alert box page
let openDialog = document.querySelector(".open-dialog");
let closeDialog = document.querySelector(".close-dialog");
let modal = document.querySelector(".modal");

openDialog.addEventListener("click", () => {
	modal.classList.add("showModal");
});

closeDialog.addEventListener("click", () => {
	modal.classList.remove("showModal");
});

modal.addEventListener("click", (e) => {
	e.target.classList.remove("showModal");
});

// todo page
let todoForm = document.querySelector(".todo-form");
let todoError = document.querySelector(".todo-error");
let todoList = document.querySelector(".todo-list");
let searchTask = document.querySelector(".search-task");

searchTask.addEventListener("keyup", (e) => {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const filterTasks = tasks.filter((task) => task.includes(e.target.value));
	console.log(filterTasks);
});

const addTodoList = (task) => {
	let todoTask = `
	<li class="todo-task">
		<span class="todo-text">${task}</span>
		<span class="delete-btn">&#10007;</span>
	</li>`;
	todoList.innerHTML += todoTask;
};

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
for (const task of tasks) {
	addTodoList(task);
}

const saveTask = (task) => {
	const newTasks = JSON.parse(localStorage.getItem("tasks")) || [];
	newTasks.push(task);
	localStorage.setItem("tasks", JSON.stringify(newTasks));
};

const deleteTask = (task) => {
	const myTasks = JSON.parse(localStorage.getItem("tasks")) || [];
	const newTasks = myTasks.filter((myTask) => myTask !== task);
	localStorage.setItem("tasks", JSON.stringify(newTasks));
};

todoForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let todoItem = document.querySelector("input[name=todo-item]").value;

	if (todoItem) {
		addTodoList(todoItem);
		saveTask(todoItem);
		e.target.reset();
		todoError.style.display = "none";
	} else {
		todoError.style.display = "block";
	}
});

todoList.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete-btn")) {
		const taskItem = event.target.parentElement;
		const taskText = taskItem.querySelector(".todo-text").textContent;
		deleteTask(taskText);
		todoList.removeChild(taskItem);
	}
});

// form validation page
let myForm = document.querySelector(".form-validate");

const validateEmail = (email) => {
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
	return emailRegex.test(email);
};

const validateName = (name) => {
	const nameRegex = /.*[a-z].*\d.*|.*\d.*[a-z].*/;
	return nameRegex.test(name);
};

myForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let name = document.querySelector("input[name=name]").value;
	let email = document.querySelector("input[name=email]").value;
	let password = document.querySelector("input[name=password]").value;
	let nameError = document.querySelector(".name-error");
	let emailError = document.querySelector(".email-error");
	let pwdError = document.querySelector(".pwd-error");

	if (name || email || password) {
		if (validateName(name) && validateEmail(email) && password.length >= 6) {
			e.target.reset();
			setTimeout(() => {
				alert("Form is successfully submitted!");
			}, 10);
		}
		nameError.style.display = validateName(name) ? "none" : "block";
		emailError.style.display = validateEmail(email) ? "none" : "block";
		pwdError.style.display = password.length <= 5 ? "block" : "none";
	} else {
		nameError.style.display = "block";
		emailError.style.display = "block";
		pwdError.style.display = "block";
	}
});
