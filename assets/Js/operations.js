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
var operationsTable = document.getElementById("operationsTable");
var deleteOperation = function (e) {
    var idOperation = e.target.dataset.id;
    var storage = getLocalStorage();
    var updatedStorage = storage.operations.filter(function (item) { return item.id != idOperation; });
    localStorage.setItem('piggy-storage', JSON.stringify(__assign(__assign({}, storage), { operations: updatedStorage })));
    loadOperations();
};
var loadOperations = function () {
    console.log("entró");
    operationsTable.innerHTML = "";
    var storage = getLocalStorage();
    var operations = storage.operations;
    for (var _i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
        var operation = operations_1[_i];
        var tr = document.createElement('tr');
        var tdDescription = document.createElement('td');
        var tdCategory = document.createElement('td');
        var tdDate = document.createElement('td');
        var tdAmount = document.createElement('td');
        var tdActions = document.createElement('td');
        var btnEdit = document.createElement('button');
        btnEdit.setAttribute('onclick', "location.href=\"./operations-edit.html?id=" + operation.id + "\"");
        var btnDelete = document.createElement('button');
        btnDelete.dataset.id = "" + operation.id;
        var textDescription = document.createTextNode(operation.description);
        var textCategory = document.createTextNode(operation.category);
        var textDate = document.createTextNode(operation.date);
        var textAmount = document.createTextNode("" + operation.amount);
        var textEdit = document.createTextNode('Edit');
        var textDelete = document.createTextNode('Delete');
        tdDescription.appendChild(textDescription);
        tdCategory.appendChild(textCategory);
        tdDate.appendChild(textDate);
        tdAmount.appendChild(textAmount);
        btnEdit.appendChild(textEdit);
        btnDelete.appendChild(textDelete);
        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdDescription);
        tr.appendChild(tdCategory);
        tr.appendChild(tdDate);
        tr.appendChild(tdAmount);
        tr.appendChild(tdActions);
        operationsTable.appendChild(tr);
        btnDelete.addEventListener('click', deleteOperation);
    }
};
loadOperations();
