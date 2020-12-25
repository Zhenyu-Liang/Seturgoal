// show menu when right click
var menu = document.querySelector(".menu");
var cancelButton = document.getElementById("cancel");
var duplicateTaskButton = document.getElementById("duplicate-task");
var rightClickElement;
var deleteTaskButton = document.getElementById("delete-task");
var isShowingMenu = false;
var localStorageContainerName;




window.oncontextmenu = function menuOperations(evt){

    if (document.getElementById(evt.target.id).classList.contains("task")){
        evt.preventDefault();
        rightClickElement = document.getElementById(evt.target.id);
        menu.classList.remove('off');
        menu.style.position = "absolute";
        menu.style.top = `${window.event.clientY}px`
        menu.style.left= `${window.event.clientX}px`

    }

}



function removeMenu(){
    if(!menu.classList.contains("off") && !isShowingMenu) {
        menu.classList.add("off");
    }    
}    

function showMenu(){
    isShowingMenu = true;
    menu.classList.remove("off");
}    

function menuOffRemove(){
    isShowingMenu = false;
    menu.classList.add("off");
}    



deleteTaskButton.addEventListener("click", () => {
    let localStorageDataList = [];
    localStorageContainerName = rightClickElement.parentNode.id.slice(0, rightClickElement.parentNode.id.length-6)+"ContainerName";
    localStorageDataList = localStorage.getItem(localStorageContainerName).split(",");
    const indexOfTheRemovingElement = localStorageDataList.indexOf(rightClickElement.innerHTML);
    if (indexOfTheRemovingElement > -1) {
        localStorageDataList.splice(indexOfTheRemovingElement, 1);
    }

    rightClickElement.parentNode.removeChild(rightClickElement);
    localStorage.removeItem(localStorageContainerName);
    saveGoals(localStorageContainerName, localStorageDataList);
})



duplicateTaskButton.addEventListener("click", function(){
    localStorageContainerName = rightClickElement.parentNode.id.slice(0, rightClickElement.parentNode.id.length-6)+"ContainerName";
    let newLocalStorageDataList = [];
    newLocalStorageDataList = localStorage.getItem(localStorageContainerName).split(",");
    newLocalStorageDataList.push(rightClickElement.innerHTML);
    let duplicatedTask = document.createElement("p");
    duplicatedTask.innerHTML = rightClickElement.innerHTML;
    duplicatedTask.classList.add("task");
    duplicatedTask.classList.add(localStorageContainerName[0] + "-task")
    count++;
    duplicatedTask.id = "task" + count;
    duplicatedTask.setAttribute("spellcheck", "false");
    duplicatedTask.setAttribute("draggable", "true");
    duplicatedTask.contentEditable = true;
    rightClickElement.parentNode.appendChild(duplicatedTask);
    makeDraggable(".task", "task-container");
    localStorage.removeItem(localStorageContainerName);
    saveGoals(localStorageContainerName, newLocalStorageDataList);
})      


cancelButton.addEventListener("click", function(){
    menu.classList.add("off")
})    





