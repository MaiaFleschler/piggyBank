var param = new URLSearchParams(window.location.search);
var formEditCategory = document.getElementById('formEditCategory');
var inpName = document.getElementById('inpName');
var showCurrValues = function () {
    var storage = getLocalStorage();
    storage.categories.forEach(function (element) {
        if (element.id == param.get("id")) {
            inpName.value = element.name;
        }
    });
};
showCurrValues();
var editCategory = function (e) {
    var storage = getLocalStorage();
    var form = e.target;
    var newCategoryName = form.name.value;
    storage.categories.forEach(function (element) {
        if (element.id == param.get("id")) {
            element.name = newCategoryName;
        }
    });
    localStorage.setItem('piggy-storage', JSON.stringify(storage));
};
formEditCategory.addEventListener('submit', editCategory);
