//define UI element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('#output');
//console.log(taskList);
//taskList.remove();
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//define event listener
form.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);

function addTask(e) {
    console.log(e);
    console.log('work');
    if (taskInput.value == '') {
        alert('Add a task!')
    }
    else {
        //create element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'close';
        li.appendChild(link);
        taskList.appendChild(li);
        store(taskInput.value);
        taskInput.value = ' ';
    };
    e.preventDefault();
}

//Remove task
function removeTask(e){
    if(e.target.hasAttribute('href')){
      if(confirm("Are you sure?")){
       
            let ele = e.target.parentElement;
            console.log(ele);
            ele.remove();
            removeFromLS(ele);
     }
    }
}


//Clear task
function clearTask(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

//filter task
document.getElementById('filter-task').addEventListener('keyup', filterTask);
function filterTask(e){
    let text = e.target.value.toLowerCase();
    //console.log(text);
    document.querySelectorAll('li').forEach(task =>{
        let item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
}


//add task
function store(task){
    //console.log(task);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded',getTask);

function getTask(){
   
    let tasks = [];
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'close';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function removeFromLS(taskItem){
    let tasks = [];
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //let str = taskItem.textContent.trim;
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) =>{
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}