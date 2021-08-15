var formNewOperation = document.getElementById("formNewOperation");
var addNewOperation = function (e) {
    var storage = getLocalStorage();
    var form = e.target;
    var newDescription = form.description.value;
    var newType = form.type.value;
    var newAmount = form.amount.value;
    var newOperationCategory = form.category.value;
    var newDate = form.date.value;
    var newOperation = {
        id: getId(storage.operations),
        description: newDescription,
        amount: newAmount,
        type: newType,
        category: newOperationCategory,
        date: newDate
    };
    storage.operations.push(newOperation);
    localStorage.setItem('piggy-storage', JSON.stringify(storage));
    console.log(storage);
};
formNewOperation.addEventListener('submit', addNewOperation);
