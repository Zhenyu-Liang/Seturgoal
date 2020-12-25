var draggable;
var draggingElement;
var containerNameObject = {
  l: "longterm",
  m: "monthly",
  d: "daily",
  done: "done"
};
var localStorageDataArrayForDraggables = [];
var containerNameForLocalStorage;


function getElementLocation(container, mouse_y) {
    // get all draggables in the container except for the current one and put them in a array
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      var offset = mouse_y - box.top - box.height / 2
      // to check if the current element is on top of an element and check closest.
      if (0>offset && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }


function makeDraggable(className, containerName){
    const draggables = document.querySelectorAll(className);
    const containers = document.querySelectorAll(containerName);

    draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', () => {
      // remember to add a class to show that it is dragged. 
        draggable.classList.remove('dragging');


        draggable.classList.add("dragged");
        let draggedElement = document.querySelector(".dragged");
        if(draggedElement.classList[1] == "done-task"){
            
            draggedElementOriginalContainer = containerNameObject["done"];
            localStorageDataArrayForDraggables = localStorage.getItem("doneContainerName").split(",")
            localStorageDataArrayForDraggables.splice(localStorageDataArrayForDraggables.indexOf(draggedElement.innerHTML), 1);
            try {
              localStorage.removeItem("doneContainerName");
            } catch {}
            
            localStorage.setItem("doneContainerName", localStorageDataArrayForDraggables);
            
            

        } else {
              draggedElementOriginalContainer = containerNameObject[draggedElement.classList[1][0]]
              
              try {
                localStorageDataArrayForDraggables = localStorage.getItem(draggedElementOriginalContainer+"ContainerName").split(",");
              } catch {
                localStorageDataArrayForDraggables = [];
              }
              const indexOfTheRemovingElement = localStorageDataArrayForDraggables.indexOf(draggedElement.innerHTML);
              if (indexOfTheRemovingElement > -1) {
                  localStorageDataArrayForDraggables.splice(indexOfTheRemovingElement, 1);
              }
              
              containerNameForLocalStorage = draggedElementOriginalContainer+"ContainerName"
              try {
                localStorage.removeItem(containerNameForLocalStorage);
              } catch {}
              
              localStorage.setItem(containerNameForLocalStorage, localStorageDataArrayForDraggables)
        }
        
        
        
        draggedElement.classList.remove(draggedElement.classList[1]);

        

        newDraggedElementContainer = draggedElement.parentNode.id.slice(0, draggedElement.parentNode.id.length-6)
        if (newDraggedElementContainer!="done") {
          draggedElement.classList.add(newDraggedElementContainer[0]+"-task")

        } else {
          draggedElement.classList.add(newDraggedElementContainer+"-task")
        }
        try {
          localStorageDataArrayForDraggables = localStorage.getItem(newDraggedElementContainer+"ContainerName").split(",");
        } catch {
          localStorageDataArrayForDraggables = []
        }
        
        localStorageDataArrayForDraggables.push(draggedElement.innerHTML);
        containerNameForLocalStorage = newDraggedElementContainer+"ContainerName"
        try {
          localStorage.removeItem(containerNameForLocalStorage);
        } catch {

        }
        
        localStorage.setItem(containerNameForLocalStorage, localStorageDataArrayForDraggables)


        draggedElement.classList.remove("dragged");
        


    })
    })

    containers.forEach(container => {
      container.addEventListener('dragover', e => {
          e.preventDefault();
          const afterElement = getElementLocation(container, e.clientY);
          draggable = document.querySelector('.dragging');
          
          if (afterElement == null) {
            container.appendChild(draggable);

        } else {
            container.insertBefore(draggable, afterElement);

          } 
          

          
      }) 
      
      
    
})
}
