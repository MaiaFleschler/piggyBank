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
var operationsTableBody = document.getElementById("operationsTableBody");
var selectorType = document.getElementById("selType");
var selectorCategory = document.getElementById("selCategory");
var inputDate = document.getElementById("inpDate");
var selectorOrderBy = document.getElementById("selOrderBy");
var selOrderBy = document.getElementById("selOrderBy");
var mainImage = document.getElementById("mainImage");
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
    btnEdit.classList.add('btn-action');
    var btnDelete = document.createElement('button');
    btnDelete.dataset.id = "" + operation.id;
    btnDelete.classList.add('btn-action');
    var textDescription = document.createTextNode(operation.description);
    var textCategory = document.createTextNode(operation.category);
    var textDate = document.createTextNode(operation.date);
    if (operation.type === "Expense") {
        var textAmount = document.createTextNode("-$" + operation.amount);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "red";
    }
    else {
        var textAmount = document.createTextNode("+$" + operation.amount);
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
    operationsTableBody.appendChild(tr);
    btnDelete.addEventListener('click', deleteOperation);
};
var orderList = function (operations) {
    var selectorOrderByValue = selOrderBy.value;
    if (selectorOrderByValue == "lessAmount") {
        operations.sort(function (a, b) { return a.amount - b.amount; });
    }
    else if (selectorOrderByValue == "biggerAmount") {
        operations.sort(function (a, b) { return b.amount - a.amount; });
    }
    else if (selectorOrderByValue == "az") {
        operations.sort(function (a, b) { var x = a.description.toUpperCase(), y = b.description.toUpperCase(); return x == y ? 0 : x > y ? 1 : -1; });
    }
    else if (selectorOrderByValue == "za") {
        operations.sort(function (a, b) { var x = b.description.toUpperCase(), y = a.description.toUpperCase(); return x == y ? 0 : x > y ? 1 : -1; });
    }
    else if (selectorOrderByValue == "lessRecent") {
        operations.sort(function (a, b) { var x = a.date, y = b.date; return x == y ? 0 : x > y ? 1 : -1; });
    }
    else if (selectorOrderByValue == "moreRecent") {
        operations.sort(function (a, b) { var x = b.date, y = a.date; return x == y ? 0 : x > y ? 1 : -1; });
    }
};
var filterOperations = function () {
    var storage = getLocalStorage();
    var operationsAll = storage.operations;
    var selectorTypeValue = selectorType.value;
    var selectorCategoryValue = selectorCategory.value;
    var selectorDateValue = new Date(inputDate.value);
    var operationsByType = operationsAll.filter(function (item) { return selectorTypeValue == "All" || item.type == selectorTypeValue; });
    var operationsByCategory = operationsByType.filter(function (item) { return selectorCategoryValue == "All" || item.category == selectorCategoryValue; });
    var operationsByDate = operationsByCategory.filter(function (item) { return selectorDateValue <= (new Date(item.date)); });
    if (operationsByDate.length === 0) {
        operationsTable.classList.add('d-none');
        mainImage.classList.remove('d-none');
    }
    else {
        operationsTable.classList.remove('d-none');
        mainImage.classList.add('d-none');
        operationsTableBody.innerHTML = "";
        orderList(operationsByDate);
        for (var _i = 0, operationsByDate_1 = operationsByDate; _i < operationsByDate_1.length; _i++) {
            var operation = operationsByDate_1[_i];
            createRowTable(operation);
        }
    }
};
var loadOperationsBeginning = function () {
    var storage = getLocalStorage();
    var operationsAll = storage.operations;
    //Filter by date from today to start
    var operationsFromToday = operationsAll.filter(function (item) { return new Date() <= (new Date(item.date)); });
    if (operationsFromToday.length === 0) {
        operationsTable.classList.add('d-none');
        mainImage.classList.remove('d-none');
    }
    else {
        operationsTable.classList.remove('d-none');
        mainImage.classList.add('d-none');
        operationsTableBody.innerHTML = "";
        orderList(operationsFromToday);
        for (var _i = 0, operationsFromToday_1 = operationsFromToday; _i < operationsFromToday_1.length; _i++) {
            var operation = operationsFromToday_1[_i];
            createRowTable(operation);
        }
    }
};
var loadOperations = function () {
    filterOperations();
    //Filter Type
    selectorType.addEventListener('change', filterOperations);
    //Filter Category
    selectorCategory.addEventListener('change', filterOperations);
    //Filter Date
    inputDate.addEventListener('change', filterOperations);
    //Order By
    selOrderBy.addEventListener('change', filterOperations);
};
deleteOperationsWOCategory();
loadOperations();
loadOperationsBeginning();
// BALANCE
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
    var textIncome = document.createTextNode("+$" + totalInc);
    var textExpense = document.createTextNode("-$" + (Number(totalExp)) * -1);
    var textTotal;
    if (total) {
        textTotal = document.createTextNode("+$" + total);
        pTotal.style.color = "green";
    }
    else {
        textTotal = document.createTextNode("-$" + total);
        pTotal.style.color = "red";
    }
    pIncome.appendChild(textIncome);
    pExpense.appendChild(textExpense);
    pTotal.appendChild(textTotal);
    incomeTotal.appendChild(pIncome);
    expenseTotal.appendChild(pExpense);
    balanceTotal.appendChild(pTotal);
};
showBalance();
// HIDE FILTERS
var filtersForm = document.getElementById("filtersForm");
var hideFilters = document.getElementById("hideFilters");
var showFilters = document.getElementById("showFilters");
hideFilters.addEventListener("click", function () {
    filtersForm.classList.add('d-none');
    hideFilters.classList.add('d-none');
    showFilters.classList.remove('d-none');
});
showFilters.addEventListener("click", function () {
    filtersForm.classList.remove('d-none');
    hideFilters.classList.remove('d-none');
    showFilters.classList.add('d-none');
});
