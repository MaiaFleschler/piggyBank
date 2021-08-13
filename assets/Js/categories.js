var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var categoriesTable = document.getElementById('categoriesTable');
var deleteCategory = function (e) {
    var idCategory = e.target.dataset.id;
    var storage = getLocalStorage();
    var updatedStorage = storage.categories.filter(function (item) { return item.id != idCategory; });
    localStorage.setItem('piggy-storage', JSON.stringify(__assign(__assign({}, storage), { categories: updatedStorage })));
    loadCategories();
};
var loadCategories = function () {
    categoriesTable.innerHTML = "";
    var storage = getLocalStorage();
    var categories = storage.categories;
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var category = categories_1[_i];
        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        var tdEdit = document.createElement('td');
        var tdDelete = document.createElement('td');
        var btnEdit = document.createElement('button');
        var btnDelete = document.createElement('button');
        btnEdit.dataset.id = "" + category.id;
        btnDelete.dataset.id = "" + category.id;
        var textName = document.createTextNode(category.name);
        var textEdit = document.createTextNode('Edit');
        var textDelete = document.createTextNode('Delete');
        tdName.appendChild(textName);
        btnEdit.appendChild(textEdit);
        btnDelete.appendChild(textDelete);
        tdEdit.appendChild(btnEdit);
        tdDelete.appendChild(btnDelete);
        tr.appendChild(tdName);
        tr.appendChild(tdEdit);
        tr.appendChild(tdDelete);
        btnDelete.addEventListener('click', deleteCategory);
        categoriesTable.appendChild(tr);
    }
};
var formNewCategory = document.getElementById("formNewCategory");
var addNewCategory = function (e) {
    var storage = getLocalStorage();
    console.log(storage, storage.categories);
    e.preventDefault();
    var form = e.target;
    var newCategoryName = form.name.value;
    var newCategory = {
        id: getId(storage.categories),
        name: newCategoryName
    };
    storage.categories.push(newCategory);
    localStorage.setItem('piggy-storage', JSON.stringify(storage));
    loadCategories();
    console.log(storage);
};
loadCategories();
formNewCategory.addEventListener('submit', addNewCategory);
