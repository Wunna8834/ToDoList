const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if (userData.trim() !=0){ //if user enter value aren't space
        addBtn.classList.add("active"); // active the add button
    }else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}

//if user click on the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value
    let getLocalStorage = localStorage.getItem("New ToDo");//getting local storage
    if (getLocalStorage == null){
        listArr = [] //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming js string into json object
    }
  
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New ToDo", JSON.stringify(listArr)); //transforming js object into json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button
}
//function to add list in ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New ToDo");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage); 
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;   //passing the length value in pendingNumb
    if (listArr.length > 0){ //if array length is greater than 0
        deleteAllBtn.classList.add("active");//active the deleteAllBtn
    }else{
        deleteAllBtn.classList.remove("active");//inactive the deleteAllBtn
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;//adding new li tag inside ul tag
    inputBox.value =""; //once task added leave the input field blank
}

//deleting task functon
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New ToDo");
    listArr = JSON.parse(getLocalStorage); 
    listArr.splice(index, 1);//remove particular index li
    //after removing the li again update the local storage
    localStorage.setItem("New ToDo", JSON.stringify(listArr)); //transforming js object into json string
    showTasks(); //calling showTask function
}

//delete all tasks function 

deleteAllBtn.onclick = ()=>{
    listArr =[]; //empty an array
    //after delete all tasks again update the local storage
    localStorage.setItem("New ToDo", JSON.stringify(listArr)); //transforming js object into json string
    showTasks(); //calling showTask function
}

