var storage = getLocalStorage();
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
    console.log(storage);
};
formNewCategory.addEventListener('submit', addNewCategory);
