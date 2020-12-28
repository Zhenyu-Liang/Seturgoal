let taskBtnIdList = ["longterm-btn", "monthly-btn", "daily-btn"]
taskIdList = ["longterm", "monthly", "daily", "done"]
var taskContainer; // The current container
var taskContainerDataVariable; 
var count = 0
var goals;


function validateTask (string){
    return string.replace(/\s/g, '').length && string.length
}

for(let taskIndex=0; taskIndex<taskIdList.length; taskIndex++){

    goals = loadGoals(taskIdList[taskIndex] + "ContainerName");
    loadGoalsToUI(goals, taskIdList[taskIndex] + "-tasks");
}




function loadGoalsToUI(goals, goalsDivID) {
    const parentDiv = document.getElementById(goalsDivID);
    for (let index = 0; index < goals.length; index++) {
    if (validateTask(goals[index])){
      let task = document.createElement("p");
      task.setAttribute("spellcheck", "false");
      task.setAttribute("draggable", "true");
      task.contentEditable = true;
      task.innerHTML = goals[index];
      task.classList.add("task");
      if(goalsDivID.slice(0, goalsDivID.length-6) == "done") {
        task.classList.add(goalsDivID.slice(0, goalsDivID.length-6) + "-task");
      } else {
        task.classList.add(goalsDivID[0] + "-task");
      }
      
      
      count++;
      task.id = "task" + count;
      parentDiv.appendChild(task);
      makeDraggable(".task", ".task-container")
      
    }
    }
}


function loadGoals(goalName) {
    try {
        return localStorage.getItem(goalName).split(",");
    } catch {
        return ""
    }

    
}


function saveGoals(goalName, goals) {
    localStorage.setItem(goalName, goals);
  }


function appendToGoals(goalName, goal) {
    // loading the task object to append our new task
    let goals = [];
    if (loadGoals(goalName) != "") {
        goals = loadGoals(goalName);
    } else{
        goals = [];
    }
    goals.push(goal);
    saveGoals(goalName, goals);
}




let addTask = function (){
    var clickedBtn = document.getElementById(this.id);
    containerName = String(clickedBtn.id)[0]
    taskContainerDataVariable = String(clickedBtn.id).slice(0, clickedBtn.id.length-4) + "ContainerName"
    var task_input = document.getElementById(String(clickedBtn.id)[0] + "-enter-task");
    var submit_btn = document.getElementById(String(clickedBtn.id)[0] + "cbtn");
    taskContainer = document.getElementById(String(clickedBtn.id).slice(0, clickedBtn.id.length-4) + "-tasks");
    task_input.style.display = "block";
    submit_btn.style.display = "block";
    submit_btn.addEventListener("click", function(){
        count+=1;
        if (validateTask(task_input.value)){
            let newTask = document.createElement("p");
            newTask.innerHTML = task_input.value;
            newTask.classList.add("task");
            newTask.classList.add(containerName + "-task")
            newTask.id = "task" + count
            newTask.setAttribute("spellcheck", "false");
            newTask.setAttribute("draggable", "true");
            newTask.contentEditable = true;
            taskContainer.appendChild(newTask);
            appendToGoals(taskContainerDataVariable, task_input.value);
            task_input.value = "";
            task_input.style.display = "";
            submit_btn.style.display = "";
            makeDraggable(".task", ".task-container");
            
        

    } else {
        task_input.value = "";
        task_input.style.display = "";
        submit_btn.style.display = "";
    }
})

        }
        
for (i of taskBtnIdList) {

    document.getElementById(i).onclick = addTask;
}



