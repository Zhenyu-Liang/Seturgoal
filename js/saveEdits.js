// Save the Changes for the box title


let longtermBoxTitle = document.getElementById("longterm-box-title");
let monthlyBoxTitle  = document.getElementById("monthly-box-title");
let dailyBoxTitle  = document.getElementById("daily-box-title");
let doneBoxTitle  = document.getElementById("done-box-title");
let taskIdList = ["longterm", "monthly", "daily", "done"]
let boxTitleArray = [longtermBoxTitle, monthlyBoxTitle, dailyBoxTitle, doneBoxTitle];
let containerTitle;



let saveBoxTitle = function(){
    let currentTitleBoxContainerName = this.id.slice(0, this.id.length-10);
    let saveTitleButton = document.getElementById(currentTitleBoxContainerName+"-title-btn");
    saveTitleButton.style.display = "inline";
    saveTitleButton.addEventListener("click", function (){
        containerTitle = document.getElementById(currentTitleBoxContainerName+"-box-title");
        try {
            localStorage.setItem(currentTitleBoxContainerName+"Title", containerTitle.innerHTML);
        } catch {
            localStorage.removeItem(currentTitleBoxContainerName+"Title");
            localStorage.setItem(currentTitleBoxContainerName+"Title", containerTitle.innerHTML);
        }
        containerTitle.innerHTML = localStorage.getItem(currentTitleBoxContainerName+"Title");
        saveTitleButton.style.display = "none";
    }) 
}




for (i of boxTitleArray) {
    containerTitle = i.id.slice(0, i.id.length-10);
    if(localStorage.getItem(containerTitle+"Title")) {
        i.innerHTML = localStorage.getItem(containerTitle+"Title")
    } else {
        if(containerTitle=="done"){
            i.innerHTML = "Done"
        } else {
            i.innerHTML = containerTitle + " Goals"
        }
    }

    i.onclick = saveBoxTitle;
    
}