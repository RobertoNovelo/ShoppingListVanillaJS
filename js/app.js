//---------------------------VARIABLES-----------------------------

var addButton = document.getElementById("add");
var taskInput = document.getElementById("new-task");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completeTasksHolder = document.getElementById("completed-tasks");

//---------------------------FUNCIONS-----------------------------

var createNewListElement = function(taskString) {
  //Create list item
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkBox = document.createElement("input");
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input");
  //button .edit
  var editButton = document.createElement("button");
  //button .delete
  var deleteButton = document.createElement("button");
  // each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerHTML = "Edit";
  editButton.className = "edit";
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  label.innerHTML = taskString;

  // and each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var addTask = function() {
  if (taskInput.value) {
    //Create new list item with text from #new-task
    var listItem = createNewListElement(taskInput.value);
    //append list item to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  }
}

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  var listItem = this.parentNode;
  completeTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var editTask = function() {
  
  var editButton = this;
  var listItem = this.parentNode;

  var label = listItem.querySelector("label");
  var editInput = listItem.querySelector("input[type=text]");
  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};

var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
  //console.log("Binding list item events");
  //select taskListItem's children
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.addEventListener("click", editTask);
  //bind deleteTask to deleted button
  deleteButton.addEventListener("click", deleteTask);
  //bind checkboxEventHandler to checkbox
  checkbox.onchange = checkboxEventHandler;
}

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to li item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over CompleteTasksHolder ul list items
for (var i = 0; i < completeTasksHolder.children.length; i++) {
  //bind events to li item's children (taskIncompleted)
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}

addButton.addEventListener("click", addTask);