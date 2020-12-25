// get all the hamburger buttons
let hamburgerList = document.getElementsByClassName("task-box-hamburger");
let allHamburgerDropDownMenu = document.querySelectorAll(".hamburger-dropdown-menu");


for (hamburger of hamburgerList){
    hamburger.addEventListener("click", (evt)=> {
        let hamburgerId = evt.target.id;
        let hamburgerMenu = document.getElementById(hamburgerId + "-menu");
        
        hamburgerMenu.style.display = "inline";
        let removeAllTasks = hamburgerMenu.children[0];
        removeAllTasks.addEventListener("click", function(){
            try{
                let taskInput = hamburgerMenu.parentNode.children[4].children[0];
                let confirmTaskButton = hamburgerMenu.parentNode.children[4].children[1];
                hamburgerMenu.parentNode.children[4].innerHTML = "";
                hamburgerMenu.parentNode.children[4].appendChild(taskInput);
                hamburgerMenu.parentNode.children[4].appendChild(confirmTaskButton);
            } catch {
                hamburgerMenu.parentNode.children[3].innerHTML = "";

            }

            localStorageContainerName = hamburgerMenu.parentNode.id.slice(8, hamburgerMenu.parentNode.id.length)+"ContainerName";

            localStorage.removeItem(localStorageContainerName);
            saveGoals(localStorageContainerName, []);            
            
        });
    }) 
}


document.body.addEventListener("click", (e) => {
    if(!e.target.matches(".task-box-hamburger")){
        for(hamburger of hamburgerList){
            document.getElementById(hamburger.id + "-menu").style.display = "none";

        }
    }
});






