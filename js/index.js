const webSitNameInput = document.getElementById("bookmarkName");
const webSitUrlInput = document.getElementById("bookmarkURL");
const webSitBoxInfo = document.getElementById("boxInfo");
const SearchInput = document.getElementById("inputSearch");
webSitList = [];

//================ Click Event BoxInfo ==================

document.addEventListener("click", function (e) {
  if (e.target == webSitBoxInfo) {
    webSitBoxInfo.classList.add("d-none");
  }
});

// ======================================

SearchInput.addEventListener("input", function () {
  // SearchInput.value;
  displayData();
  // console.log( SearchInput.value);
});

//================= getItem From LocalStorage  ==================
if (localStorage.getItem("webSitContanir") !== null) {
  webSitList = JSON.parse(localStorage.getItem("webSitContanir"));
  displayData();
}
//================= addWebSit ===================
function addWebSit() {
  if (validationInputs(webSitNameInput) && validationInputs(webSitUrlInput)) {
    webSit = {
      webSitnName: webSitNameInput.value,
      webSitUrl: webSitUrlInput.value,
    };
    // console.log(webSit);
    webSitList.push(webSit);
    localStorage.setItem("webSitContanir", JSON.stringify(webSitList));
    // console.log(webSitList);
    displayData();
    clearForm();
    webSitBoxInfo.classList.add("d-none");
  } else {
    webSitBoxInfo.classList.remove("d-none");
  }
}
//================= clearForm ===================
function clearForm() {
  webSitNameInput.value = null;
  webSitUrlInput.value = null;

  webSitNameInput.classList.remove("is-valid");
  webSitUrlInput.classList.remove("is-valid");
}
//================= displayData =================
function displayData() {
  var boxData = "";
  let term = SearchInput.value;

  for (let i = 0; i < webSitList.length; i++) {
    if (webSitList[i].webSitnName.toLowerCase().includes(term.toLowerCase())) {
      boxData += `
      <tr>
      <td>${i}</td>
      <td>${webSitList[i].webSitnName}</td>
      <td>
        <a id="btnVisit" onclick="visitItem(${i})" class="btn btn-visit">
          <i class="fa-solid fa-eye pe-2"></i>
          Visit
        </a>
      </td>
      <td>
        <button id="btnDelete" onclick="deletItem(${i})" class="btn btn-danger">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
    </tr>
      `;
    }
  }
  document.getElementById("tableData").innerHTML = boxData;
}

//================= DeletItem ===================
function deletItem(indexItem) {
  webSitList.splice(indexItem, 1);
  localStorage.setItem("webSitContanir", JSON.stringify(webSitList));
  displayData();
}
//================= visit Item ==================
function visitItem(vistItem) {
  var websiteIndex = vistItem;

  console.log(webSitList[websiteIndex].webSitUrl);

  open(webSitList[websiteIndex].webSitUrl);
}
//==================  REGX   ====================
/* 
    var  bookmarkName = /^\w{3,35}(\s+\w+)*$/gi;
    var  bookmarkURL =
    /^((?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9.-]+)\.[a-zA-Z]{2,})(?:[^\s]*)$/g;
 */

//================= Validation Item =============
function validationInputs(element) {
  let text = element.value;
  regex = {
    bookmarkName: /^\w{3,35}(\s+\w+)*$/gi,
    bookmarkURL:
      /^((?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9.-]+)\.[a-zA-Z]{2,})(?:[^\s]*)$/g,
  };

  if (regex[element.id].test(text) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
// =================== closeBtn =================
function closeBtn() {
  webSitBoxInfo.classList.add("d-none");
}
