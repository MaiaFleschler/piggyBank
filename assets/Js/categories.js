var storage = getLocalStorage();
var categoriesTable = document.getElementById('categoriesTable');
var loadCategories = function () {
    console.log('entró');
    categoriesTable.innerHTML = "";
    // let storage: LocalStorage = getLocalStorage();
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
        categoriesTable.appendChild(tr);
    }
};
var formNewCategory = document.getElementById("formNewCategory");
var addNewCategory = function (e) {
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
formNewCategory.addEventListener('submit', addNewCategory);
