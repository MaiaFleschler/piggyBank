var getLocalStorage = function () {
    var storage = JSON.parse(localStorage.getItem('piggy-storage'));
    if (!storage) {
        storage = {
            categories: [],
            operations: []
        };
    }
    return storage;
};
var getId = function (storageArray) {
    if (storageArray.length > 0) {
        var lastItem = storageArray[storageArray.length - 1];
        return lastItem.id + 1;
    }
    return 1;
};
//Add new categories to new operation categories select
var selCategory = document.getElementById('selCategory');
var setCategoriesOptions = function () {
    var storage = getLocalStorage();
    storage.categories.forEach(function (element) {
        var option = document.createElement('option');
        var textOption = document.createTextNode("" + element.name);
        option.appendChild(textOption);
        selCategory.appendChild(option);
    });
};
setCategoriesOptions();
