const form = document.querySelector("#form");
const url = "http://localhost:8080/tasks/";
form.addEventListener("submit", submitForm);

async function submitForm(e) {
  e.preventDefault();
  const task = document.querySelector("#taskIn").value;
  console.log("task value", task);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-cache",
    body: JSON.stringify({ task }),
  });
  location.reload();
}

async function updateList() {
  const todoList = document.querySelector("#todolist");

  let response = await fetch(url);
  response = await response.json();
  console.log(response);
  for (let taskId in response.tasks) {
    const taskLi = document.createElement("li");
    taskLi.classList.add("list");
    const taskDelBtn = document.createElement("button");
    taskDelBtn.innerText = "X";
    taskDelBtn.classList.add("delBtn");
    taskDelBtn.addEventListener("click", async () => {
      const response = await fetch(url + taskId, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
      });
      location.reload();
    });
    taskLi.innerText = response.tasks[taskId];
    taskLi.appendChild(taskDelBtn);
    todoList.appendChild(taskLi);
  }
}

window.addEventListener("load", updateList);

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/clearTasks");
  location.reload();
});
