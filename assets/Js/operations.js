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
var selectorType = document.getElementById("selType");
var selectorCategory = document.getElementById("selCategory");
var inputDate = document.getElementById("inpDate");
var selectorOrderBy = document.getElementById("selOrderBy");
inputDate.valueAsDate = new Date();
var deleteOperation = function (e) {
    var idOperation = e.target.dataset.id;
    var storage = getLocalStorage();
    var updatedStorage = storage.operations.filter(function (item) { return item.id != idOperation; });
    localStorage.setItem('piggy-storage', JSON.stringify(__assign(__assign({}, storage), { operations: updatedStorage })));
    loadOperations();
};
var deleteOperationsWOCategory = function () {
    var storage = getLocalStorage();
    var arrayCategorias = [];
    storage.categories.forEach(function (element) {
        arrayCategorias.push(element.name);
    });
    var updatedStorage = storage.operations.filter(function (item) { return arrayCategorias.includes(item.category); });
    localStorage.setItem('piggy-storage', JSON.stringify(__assign(__assign({}, storage), { operations: updatedStorage })));
};
var createRowTable = function (operation) {
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
    if (operation.type === "Expense") {
        var textAmount = document.createTextNode("" + (operation.amount) * -1);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "red";
    }
    else {
        var textAmount = document.createTextNode("" + operation.amount);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "green";
    }
    var textEdit = document.createTextNode('Edit');
    var textDelete = document.createTextNode('Delete');
    tdDescription.appendChild(textDescription);
    tdCategory.appendChild(textCategory);
    tdDate.appendChild(textDate);
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
};
var loadOperations = function () {
    var storage = getLocalStorage();
    var operationsAll = storage.operations;
    for (var _i = 0, operationsAll_1 = operationsAll; _i < operationsAll_1.length; _i++) {
        var operation = operationsAll_1[_i];
        createRowTable(operation);
    }
    //Filter Type
    var operationsIncome = storage.operations.filter(function (item) { return item.type == "Income"; });
    var operationsExpense = storage.operations.filter(function (item) { return item.type == "Expense"; });
    selectorType.addEventListener('change', function (event) {
        if (event.target.value == "all") {
            operationsTable.innerHTML = "";
            for (var _i = 0, operationsAll_3 = operationsAll; _i < operationsAll_3.length; _i++) {
                var operation = operationsAll_3[_i];
                createRowTable(operation);
            }
        }
        else if (event.target.value == "expense") {
            operationsTable.innerHTML = "";
            for (var _a = 0, operationsExpense_1 = operationsExpense; _a < operationsExpense_1.length; _a++) {
                var operation = operationsExpense_1[_a];
                createRowTable(operation);
            }
        }
        else if (event.target.value == "income") {
            operationsTable.innerHTML = "";
            for (var _b = 0, operationsIncome_1 = operationsIncome; _b < operationsIncome_1.length; _b++) {
                var operation = operationsIncome_1[_b];
                createRowTable(operation);
            }
        }
    });
    //Filter Category
    selectorCategory.addEventListener('change', function (event) {
        if (event.target.value == "all") {
            operationsTable.innerHTML = "";
            for (var _i = 0, operationsAll_4 = operationsAll; _i < operationsAll_4.length; _i++) {
                var operation = operationsAll_4[_i];
                createRowTable(operation);
            }
        }
        else {
            var operationsByCat = storage.operations.filter(function (item) { return item.category == selectorCategory.value; });
            operationsTable.innerHTML = "";
            for (var _a = 0, operationsByCat_1 = operationsByCat; _a < operationsByCat_1.length; _a++) {
                var operation = operationsByCat_1[_a];
                createRowTable(operation);
            }
        }
    });
    //Filter Date
    var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    var selectedDate = [year, month, day].join('-');
    operationsTable.innerHTML = "";
    for (var _a = 0, operationsAll_2 = operationsAll; _a < operationsAll_2.length; _a++) {
        var operation = operationsAll_2[_a];
        if (operation.date >= selectedDate) {
            createRowTable(operation);
        }
    }
    inputDate.addEventListener('change', function (event) {
        console.log(selectedDate);
        selectedDate = inputDate.value;
        console.log(selectedDate);
        operationsTable.innerHTML = "";
        for (var _i = 0, operationsAll_5 = operationsAll; _i < operationsAll_5.length; _i++) {
            var operation = operationsAll_5[_i];
            if (operation.date >= selectedDate) {
                createRowTable(operation);
            }
        }
    });
};
deleteOperationsWOCategory();
loadOperations();
var incomeTotal = document.getElementById('incomeTotal');
var expenseTotal = document.getElementById('expenseTotal');
var balanceTotal = document.getElementById('total');
var showBalance = function () {
    var storage = getLocalStorage();
    var totalExp = 0;
    var totalInc = 0;
    storage.operations.forEach(function (element) {
        if (element.type == "Income") {
            totalInc += Number(element.amount);
        }
        else {
            totalExp += (Number(element.amount)) * -1;
        }
    });
    var total = totalInc + totalExp;
    var pIncome = document.createElement('p');
    pIncome.style.color = "green";
    var pExpense = document.createElement('p');
    pExpense.style.color = "red";
    var pTotal = document.createElement('p');
    var textIncome = document.createTextNode("" + totalInc);
    var textExpense = document.createTextNode("" + totalExp);
    var textTotal = document.createTextNode("" + total);
    pIncome.appendChild(textIncome);
    pExpense.appendChild(textExpense);
    pTotal.appendChild(textTotal);
    incomeTotal.appendChild(pIncome);
    expenseTotal.appendChild(pExpense);
    balanceTotal.appendChild(pTotal);
};
showBalance();
