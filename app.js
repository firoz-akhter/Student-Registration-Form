//Select DOM
const nameInput = document.querySelector(".name-input");
const idInput = document.querySelector(".id-input");
const emailInput = document.querySelector(".email-input");
const contactInput = document.querySelector(".contact-input");

const addBtn = document.querySelector(".add-button");
const studentList = document.querySelector(".student-list");

const popUp = document.querySelector(".pop-up");
const header = document.querySelector(".header");
const form = document.querySelector(".form");
const studentContainer = document.querySelector(".student-container");
const editNameInput = document.querySelector(".edit-name-input");
const editIdInput = document.querySelector(".edit-id-input");
const editEmailInput = document.querySelector(".edit-email-input");
const editContactInput = document.querySelector(".edit-contact-input");
const closeBtn = document.querySelector(".close-btn");
const saveBtn = document.querySelector(".save-btn");
const alertMsg = document.querySelector(".alert-msg");
// console.log(addBtn, studentList);

//Event Listeners
document.addEventListener("DOMContentLoaded", getStudents);
addBtn.addEventListener("click", addStudent);
studentList.addEventListener("click", deleteStudent);

//Functions
function addStudent(e) {
  //Prevent natural behaviour
  e.preventDefault();

  // making sure inputs passes all requirements
  if(nameInput.value === "") {
    alert("Student name can't be empty");
    return;
  }
  if(idInput.value === "") {
    alert("Student Id can't be empty");
    return ;
  }
  if(emailInput.value === "") {
    alert("Email can't be empty");
    return ;
  }
  if(contactInput.value === "") {
    alert("Contact number can't be empty.");
    return ;
  }

  // making sure that studentName does not contain digits.
  if(hasNumber(nameInput.value)) {
    alert("Name contains only characters")
    return;
  }
  if(isOnlydigits(idInput.value) === false) {
    alert("Student Id only contains digits")
    return ;
  }
  // checking email is valid or not
  if(isEmailValid(emailInput.value) === false) {
    alert("Please enter a valid email.")
    return;
  }
  // check if contact number contains letters
  if(isOnlydigits(contactInput.value) === false) {
    alert("Contact No. does not contain characters.")
    return ;
  }
  // check if mobile number contains atleat 10 digits or not
  if(contactInput.value.length < 10) {
    alert("Contact number contains atleast ten digit.")
    return ;
  }

  //Create student div
  const studentDiv = document.createElement("div");
  studentDiv.classList.add("student");
  //Create list
  const name = document.createElement("li");
  const id = document.createElement("li");
  const email = document.createElement("li");
  const contact = document.createElement("li");
  // Four list elements for name, id, email, contact
  name.innerText = nameInput.value;
  id.innerText = idInput.value;
  email.innerText = emailInput.value;
  contact.innerText = contactInput.value;
  //Save to local - do this last
  saveLocalStudents(nameInput.value, idInput.value, emailInput.value, contactInput.value);
  
  name.classList.add("student-item");
  id.classList.add("student-item");
  email.classList.add("student-item");
  contact.classList.add("student-item"); 
  contact.classList.add("contact-list-item");
  
  studentDiv.appendChild(name);
  studentDiv.appendChild(id);
  studentDiv.appendChild(email);
  studentDiv.appendChild(contact);

  nameInput.value = "";
  idInput.value = "";
  emailInput.value = "";
  contactInput.value = "";


  //Create edit Button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;
  editButton.classList.add("edit-btn");
  studentDiv.appendChild(editButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  studentDiv.appendChild(trashButton);
  //attach final student
  studentList.appendChild(studentDiv);
}

function deleteStudent(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const student = item.parentElement;
    student.classList.add("fall");
    //at the end
    removeLocalStudents(student);
    student.addEventListener("transitionend", e => {
      student.remove();
    });
  }
  if (item.classList[0] === "edit-btn") {
    const student = item.parentElement;
    // console.log("adding active button")
    // Show Edit form and hide main page
    popUp.classList.add("active");
    header.classList.add("dim");
    form.classList.add("dim");
    studentContainer.classList.add("dim");

    // fill values from student to Edit form input fields
    editNameInput.value = student.children[0].innerText;
    editIdInput.value = student.children[1].innerText;
    editEmailInput.value = student.children[2].innerText;
    editContactInput.value = student.children[3].innerText;
  }
}


function saveLocalStudents(name, id, email, contact) {
  let students;
  if (localStorage.getItem("students") === null) {
    students = {};
  } else {
    students = JSON.parse(localStorage.getItem("students"));
  }
  students[id] = {name, id, email, contact};
  localStorage.setItem("students", JSON.stringify(students));
}

function removeLocalStudents(student) {
  let students;
  if (localStorage.getItem("students") === null) {
    students = {};
  } else {
    students = JSON.parse(localStorage.getItem("students"));
  }
  const studentId = student.children[1].innerText;
  delete students[studentId];
  localStorage.setItem("students", JSON.stringify(students));
}

function getStudents() {
  console.log("running getStudents function...")
  let students;
  if (localStorage.getItem("students") === null) {
    students = {};
  } else {
    students = JSON.parse(localStorage.getItem("students"));
  }
  for(const key in students) {

    //Create student div
    // console.log(student);
    const studentDiv = document.createElement("div");
    studentDiv.classList.add("student");

    //Create list
    const name = document.createElement("li");
    const id = document.createElement("li");
    const email = document.createElement("li");
    const contact = document.createElement("li");

    // list elements for name, id, email, contact
    name.innerText = students[key].name;
    id.innerText = students[key].id;
    email.innerText = students[key].email;
    contact.innerText = students[key].contact;
    //Save to local - do this last
    //Save to local
    name.classList.add("student-item");
    id.classList.add("student-item");
    email.classList.add("student-item");
    contact.classList.add("student-item");
    contact.classList.add("contact-list-item");
    
    studentDiv.appendChild(name);
    studentDiv.appendChild(id);
    studentDiv.appendChild(email);
    studentDiv.appendChild(contact);

    nameInput.value = "";
    idInput.value = "";
    emailInput.value = "";
    contactInput.value = "";


    //Create Completed Button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    editButton.classList.add("edit-btn");
    studentDiv.appendChild(editButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    studentDiv.appendChild(trashButton);
    //attach final student
    studentList.appendChild(studentDiv);
  }
}

closeBtn.addEventListener("click", function() {
  // Hide Edit form and show the main page
  popUp.classList.remove("active");
  header.classList.remove("dim");
  form.classList.remove("dim");
  studentContainer.classList.remove("dim");
})


saveBtn.addEventListener("click", function(e) {
  e.preventDefault();

  // making sure inputs passes all requirements
  if(editNameInput.value === "") {
    // alert("Student name can't be empty");
    alertMsg.innerText = "Student name can't be empty";
    alertMsg.classList.add("red");
    return;
  }
  if(editIdInput.value === "") {
    alertMsg.innerText = "Student input can't be empty";
    alertMsg.classList.add("red");
    return ;
  }
  if(editEmailInput.value === "") {
    alertMsg.innerText = "Student email can't be empty";
    alertMsg.classList.add("red");
    return ;
  }
  if(editContactInput.value === "") {
    alertMsg.innerText = "Student contact can't be empty";
    alertMsg.classList.add("red");
    return ;
  }

  // making sure that studentName does not contain digits.
  if(hasNumber(editNameInput.value)) {
    alertMsg.innerText = "Name contains only characters";
    alertMsg.classList.add("red");
    return;
  }
  if(isOnlydigits(editIdInput.value) === false) {
    alertMsg.innerText = "Student Id only contains digits";
    alertMsg.classList.add("red");
    return ;
  }
  // checking email is valid or not
  if(isEmailValid(editEmailInput.value) === false) {
    alertMsg.innerText = "Please enter a valid email.";
    alertMsg.classList.add("red");
    return;
  }
  // check if contact number contains letters
  if(isOnlydigits(editContactInput.value) === false) {
    alertMsg.innerText = "Contact No. does not contain characters.";
    alertMsg.classList.add("red");
    return ;
  }
  // check if mobile number contains atleat 10 digits or not
  if(editContactInput.value.length < 10) {
    alertMsg.innerText = "Contact number contains atleast ten digit.";
    alertMsg.classList.add("red");
    return ;
  }

  let students;
  if (localStorage.getItem("students") === null) {
    students = {};
  } else {
    students = JSON.parse(localStorage.getItem("students"));
  }
  
  let name = editNameInput.value;
  let id = editIdInput.value;
  let email = editEmailInput.value;
  let contact = editContactInput.value;

  // Edit current student
  students[id] = {name, id, email, contact};
  localStorage.setItem("students", JSON.stringify(students));

  // Hide Edit form and show main page
  popUp.classList.remove("active");
  header.classList.remove("dim");
  form.classList.remove("dim");
  studentContainer.classList.remove("dim");
  location.reload()
})


// dynamic scroll bar on body 
document.addEventListener("DOMContentLoaded",  function() {
  document.querySelector(".body").classList.add("dynamic-scroll");
  console.log("adding dynamic scroll bar to body element")
}                         
);



// helper functions for validation ------------------>
function hasNumber(myString) {
  return /\d/.test(myString);
}
function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
  // if (emailRegex.test(email.value)) {
  //     // email is valid
  //     return true;
  // }
  // // email is invalid
  // return false;
}
function isOnlydigits(value) {
  var regExp = /[a-zA-Z]/g;

  if(regExp.test(value)){
    return false;
  } 
  return true ;
}
//  ------------------------------------------------->
