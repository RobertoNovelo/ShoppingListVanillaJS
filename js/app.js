// //---------------------------VARIABLES-----------------------------

// var addButton = document.getElementById("add");
// var taskInput = document.getElementById("new-task");
// var incompleteTasksHolder = document.getElementById("incomplete-tasks");
// var completeTasksHolder = document.getElementById("completed-tasks");

// //---------------------------FUNCIONS-----------------------------

// var createNewListElement = function(taskString) {
//   //Create list item
//   var listItem = document.createElement("li");
//   //input (checkbox)
//   var checkBox = document.createElement("input");
//   //label
//   var label = document.createElement("label");
//   //input (text)
//   var editInput = document.createElement("input");
//   //button .edit
//   var editButton = document.createElement("button");
//   //button .delete
//   var deleteButton = document.createElement("button");
//   // each element needs modifying
//   checkBox.type = "checkbox";
//   editInput.type = "text";
//   editButton.innerHTML = "Edit";
//   editButton.className = "edit";
//   deleteButton.innerHTML = "Delete";
//   deleteButton.className = "delete";
//   label.innerHTML = taskString;

//   // and each element needs appending
//   listItem.appendChild(checkBox);
//   listItem.appendChild(label);
//   listItem.appendChild(editInput);
//   listItem.appendChild(editButton);
//   listItem.appendChild(deleteButton);

//   return listItem;
// }

// var addTask = function() {
//   if (taskInput.value) {
//     //Create new list item with text from #new-task
//     var listItem = createNewListElement(taskInput.value);
//     //append list item to incompleteTasksHolder
//     incompleteTasksHolder.appendChild(listItem);
    
//     bindTaskEvents(listItem, taskCompleted);
//     taskInput.value = "";
//   }
// }

// var deleteTask = function() {
//   var listItem = this.parentNode;
//   var ul = listItem.parentNode;
//   ul.removeChild(listItem);
// }

// var taskCompleted = function() {
//   var listItem = this.parentNode;
//   completeTasksHolder.appendChild(listItem);
//   bindTaskEvents(listItem, taskIncomplete);
// };

// var taskIncomplete = function() {
//   var listItem = this.parentNode;
//   incompleteTasksHolder.appendChild(listItem);
//   bindTaskEvents(listItem, taskCompleted);
// };

// var editTask = function() {
  
//   var editButton = this;
//   var listItem = this.parentNode;

//   var label = listItem.querySelector("label");
//   var editInput = listItem.querySelector("input[type=text]");
//   var containsClass = listItem.classList.contains("editMode");

//   if (containsClass) {
//     label.innerText = editInput.value;
//     editButton.innerText = "Edit";
//   } else {
//     editInput.value = label.innerText;
//     editButton.innerText = "Save";
//   }
//   listItem.classList.toggle("editMode");
// };

// var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
//   //console.log("Binding list item events");
//   //select taskListItem's children
//   var checkbox = taskListItem.querySelector("input[type=checkbox]");
//   var editButton = taskListItem.querySelector("button.edit");
//   var deleteButton = taskListItem.querySelector("button.delete");
//   //bind editTask to edit button
//   editButton.addEventListener("click", editTask);
//   //bind deleteTask to deleted button
//   deleteButton.addEventListener("click", deleteTask);
//   //bind checkboxEventHandler to checkbox
//   checkbox.onchange = checkboxEventHandler;
// }

// //cycle over incompleteTasksHolder ul list items
// for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
//   //bind events to li item's children (taskCompleted)
//   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
// }

// //cycle over CompleteTasksHolder ul list items
// for (var i = 0; i < completeTasksHolder.children.length; i++) {
//   //bind events to li item's children (taskIncompleted)
//   bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
// }

// addButton.addEventListener("click", addTask);

//---------------------------VARIABLES-----------------------------

var jQueryAddButton = $("#add");
var jQueryTaskInput = $("#new-task");
var jQueryIncompleteTasksHolder = $("#incomplete-tasks");
var jQueryCompleteTasksHolder = $("#completed-tasks");

//---------------------------FUNCIONS-----------------------------

var jQueryCreateNewListElement = function(taskString) {

  listItem =  '<li><input class="completecheckbox" type="checkbox"><label>'+ taskString +'</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>';

  return listItem;
}


var jQueryAddTask = function() {
  if (""!=jQueryTaskInput.val()) {
    //Create new list item with text from #new-task
    var listItem = jQueryCreateNewListElement(jQueryTaskInput.val());

    addToIncompleteTasks(jQueryTaskInput.val());

    //append list item to incompleteTasksHolder
    jQueryIncompleteTasksHolder.append(listItem);
    jQueryTaskInput.val("");
  }
}

var deleteTask = function() {
  $(this).parent().remove()
}

var taskCompleted = function() {

  console.log($(this).parent().parent());

  if($(this).parent().parent().is("#incomplete-tasks"))
  {
    jQueryCompleteTasksHolder.append($(this).parent());
  }
  else
  {
    jQueryIncompleteTasksHolder.append($(this).parent());
  }
};


var editTask = function() {

  $(this).parent().toggleClass("editMode");

  if($(this).parent().hasClass("editMode"))
  {
    //Items' HTML:
    // <li class="">
    //   <input type="checkbox">
    //   <label>Do excercise</label>
    //   <input type="text">
    //   <button class="edit">Edit</button>
    //   <button class="delete">Delete</button>
    // </li>

    // Since the edit button ( this ) is receiveing  the event:
    //$(this).prev() returns the text type input
    //$(this).prev().prev() returns the label
    //$(this).prev().prev().prev() returns checkbox
    //$(this).next() returns checkbox
    $(this).prev().val( $(this).prev().prev().text() );
    $(this).text("Save");
  }
  else
  {
    $(this).prev().prev().text( $(this).prev().val() );
    $(this).text("Edit");
  }
};

//---------------------------Events-----------------------------

jQueryAddButton.on("click",jQueryAddTask);

$("#incomplete-tasks").on("click",".edit",editTask);
$("#incomplete-tasks").on("click",".delete",deleteTask);
$("#incomplete-tasks").on("click",".completecheckbox",taskCompleted);

$("#completed-tasks").on("click",".edit",editTask);
$("#completed-tasks").on("click",".delete",deleteTask);
$("#completed-tasks").on("click",".completecheckbox",taskCompleted);

//---------------------------LocalStorage-----------------------------


function addToIncompleteTasks(taskString)
{
  var incompleteTasks = [];

  if(null != localStorage.getItem("incompletetasks"))
  {
    incompleteTasks =  JSON.parse(localStorage.getItem("incompletetasks"));
  }

  incompleteTasks.push(taskString);

  localStorage.setItem("incompletetasks", JSON.stringify(incompleteTasks));
}

function addToCompleteTasks(taskString)
{
  var completeTasks = [];
  if(null != localStorage.getItem("incompletetasks"))
  {
    incompleteTasks =  JSON.parse(localStorage.getItem("incompletetasks"));
  }

  completeTasks.push(taskString);

  localStorage.setItem("completetasks", JSON.stringify(completeTasks));
}

function getUserIncompleteTasks(callbackFn)
{
  var incompleteTasks = [];
  if(null != localStorage.getItem("incompletetasks"))
  {
    incompleteTasks =  JSON.parse(localStorage.getItem("incompletetasks"));
  }

  callbackFn(incompleteTasks);
}

function getUserCompleteTasks(callbackFn)
{
  var completeTasks = [];
  if(null != localStorage.getItem("completetasks"))
  {
    completeTasks =  JSON.parse(localStorage.getItem("completetasks"));
  }

  callbackFn(completeTasks);
}

function showIncompleteTasks(tasksArray)
{
  for(var i=0; i<tasksArray.length; i++)
  {
    $("#incomplete-tasks").append(jQueryCreateNewListElement(tasksArray[i]));
  }
}


function showCompleteTasks(tasksArray)
{
  for(var i=0; i<tasksArray.length; i++)
  {
    $("#complete-tasks").append(jQueryCreateNewListElement(tasksArray[i]));
  }
}

$(function(){
  getUserIncompleteTasks(showIncompleteTasks);
  getUserCompleteTasks(showCompleteTasks);
});