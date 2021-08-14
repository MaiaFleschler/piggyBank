var param = new URLSearchParams(window.location.search);
var formEditOperation = document.getElementById('formEditOperation');
var inpDescription = document.getElementById('inpDescription');
var inpAmount = document.getElementById('inpAmount');
var selType = document.getElementById('selType');
var selCategory = document.getElementById('selCategory');
var inpDate = document.getElementById('inpDate');
var showCurrentValues = function () {
    var storage = getLocalStorage();
    storage.operations.forEach(function (element) {
        if (element.id == param.get("id")) {
            inpDescription.value = element.description;
            inpAmount.value = element.amount;
            selType.value = element.type;
            selCategory.value = element.category;
            inpDate.value = element.date;
        }
    });
};
showCurrentValues();
var editOperation = function (e) {
    var storage = getLocalStorage();
    var form = e.target;
    var newDescription = form.description.value;
    var newAmount = form.amount.value;
    var newType = form.type.value;
    var newCategory = form.category.value;
    var newDate = form.date.value;
    storage.operations.forEach(function (element) {
        if (element.id == param.get("id")) {
            element.description = newDescription;
            element.amount = newAmount;
            element.type = newType;
            element.category = newCategory;
            element.date = newDate;
        }
    });
    localStorage.setItem('piggy-storage', JSON.stringify(storage));
};
formEditOperation.addEventListener('submit', editOperation);
