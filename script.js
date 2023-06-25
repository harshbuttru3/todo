let saveBtn = document.getElementById('save');
let taskInput = document.getElementById('taskInput');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addEventListener('load', () => {
    displaytasks();
});

function displaytasks() {
    const lists = document.getElementById('lists');
    let ihtml = '';
    for (let i = 0; i < tasks.length; i++) {
        ihtml += `
        <div id="taskcontainer">
        <div id="taskItem">
            <div><li>${tasks[i].task}</li></div>
            <button class="done">Done</button>
        </div>
        </div>
        `;
    }
    lists.innerHTML = ihtml;

    const doneButtons = document.getElementsByClassName('done');
    for (let i = 0; i < doneButtons.length; i++) {
        doneButtons[i].addEventListener('click', () => {
            deleteTask(i);
        });
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displaytasks();
}

function addTask() {
    let taskItem = taskInput.value.trim();
    if (taskItem !== '') {
        const task = {
            task: taskItem
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displaytasks();
    }
}

saveBtn.addEventListener('click', () => {
    addTask();
});

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});



// =========adding time========
function currentTime(){
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM.";
    if(hh == 0){
        hh = 12;
    }

    if(hh>12){
     hh = hh - 12;
     session = "PM."    
    }

    (hh < 10)? "0"+hh:hh;
    (mm < 10)? "0"+mm:mm;
    (ss < 10)? "0"+ss:ss;

    let time = hh+":" +mm +":" + ss + " " + session;
    document.getElementById('time').innerText = time;
    let t = setTimeout(() => {
       currentTime(); 
    }, 1000);
} 
currentTime();