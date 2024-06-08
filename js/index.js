// declaration
var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var tableContent = document.getElementById("tableContent");
var searchInput = document.getElementById("search");
var alertBox = document.getElementById("alertBox");
var alertContent = document.getElementById("alertContent");
var closeBtn = document.getElementById("closeBtn");

var isValid;
var bookMarkToUpdate = "";
var allBookmarks;

// Initialize bookmarks from localStorage
if (localStorage.getItem("BookMarks") !== null) {
  allBookmarks = JSON.parse(localStorage.getItem("BookMarks"));
  displayData(allBookmarks);
} else {
  allBookmarks = [];
}

// onclick="addBookMark()" ==> submitBtn
function addBookMark() {
  if (isValid && siteNameInput.value !== "" && siteURLInput.value !== "") {
    var newBookMark = {
      siteName: siteNameInput.value,
      siteURL: siteURLInput.value,
    };
  
    allBookmarks.push(newBookMark);
    localStorage.setItem("BookMarks", JSON.stringify(allBookmarks));
    displayData(allBookmarks);
    clearInput();
    resetValidation();
  } else {
    alertBox.classList.replace('d-none', 'd-flex');
  }
}

// display data in table
function displayData(arr) {
  var cartoona = "";

  for (var i = 0; i < arr.length; i++) {
    cartoona += `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].siteName}</td>              
        <td>
          <a class="btn btn-visit" href="${arr[i].siteURL}" target="_blank">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </a>
        </td>
        <td>
          <button class="btn btn-update pe-2" onclick="preUpdate('${arr[i].siteName}')">
            <i class="fa-solid fa-pencil"></i> Update
          </button>
        </td>
        <td>
          <button class="btn btn-delete pe-2" onclick="deleteBookMark(${i})">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }

  tableContent.innerHTML = cartoona;
}

// to display value in input for update
function preUpdate(siteName) {
  bookMarkToUpdate = siteName;

  for (var i = 0; i < allBookmarks.length; i++) {
    if (allBookmarks[i].siteName === siteName) {
      siteNameInput.value = allBookmarks[i].siteName;
      siteURLInput.value = allBookmarks[i].siteURL;
      break;
    }
  }

  displayUpdateBtn();
}

// to update bookmark
function updateBookMark() {
  if (isValid && siteNameInput.value !== "" && siteURLInput.value !== "") {
    for (var i = 0; i < allBookmarks.length; i++) {
      if (allBookmarks[i].siteName === bookMarkToUpdate) {
        allBookmarks[i].siteName = siteNameInput.value;
        allBookmarks[i].siteURL = siteURLInput.value;
        break;
      }
    }
  
    displayData(allBookmarks);
    localStorage.setItem("BookMarks", JSON.stringify(allBookmarks));
    clearInput();
    resetValidation();
    displaySubmitBtn();
  } else {
    alertBox.classList.replace('d-none', 'd-flex');
  }
}

// to delete bookmark
function deleteBookMark(index) {
  allBookmarks.splice(index, 1);
  localStorage.setItem("BookMarks", JSON.stringify(allBookmarks));
  displayData(allBookmarks);
}

// to search
searchInput.addEventListener("input", function (e) {
  var searchTerm = e.target.value.toLowerCase();
  var result = [];

  for (var i = 0; i < allBookmarks.length; i++) {
    if (allBookmarks[i].siteName.toLowerCase().includes(searchTerm)) {
      result.push(allBookmarks[i]);
    }
  }

  displayData(result);
});

// hide submit btn & display update btn
function displayUpdateBtn() {
  submitBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
}

// display submit btn & hide update btn
function displaySubmitBtn() {
  submitBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
}

// clear inputs
function clearInput() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

// validation url
function validateInput(inputId, patternKey) {
  var input = document.getElementById(inputId);
  var patterns = {
    Name: /^[a-z]{3,}/i,
    URL: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
  };
    
  isValid = patterns[patternKey].test(input.value);

  resetValidation();
  
  if (isValid) {
    input.classList.add('is-valid');
  } else {
    input.classList.add('is-invalid');
  }
}

// to hide alert box 
function hideAlertBox() {
  alertBox.classList.replace('d-flex', 'd-none');
}

alertContent.addEventListener('click', function(e) {
  e.stopPropagation();
})

// to reset validation classes
function resetValidation() {
  siteNameInput.classList.remove('is-valid', 'is-invalid');
  siteURLInput.classList.remove('is-valid', 'is-invalid');
}
