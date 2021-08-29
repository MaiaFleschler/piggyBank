// TABLES DOM
var resumeTable = document.getElementById('resumeTable');
var totalsByCategoryTable = document.getElementById('totalsByCategoryTable');
var totalsByMonthTable = document.getElementById('totalsByMonthTable');
// RESUME
var createResumeTable = function (description, character, amount) {
    var tr = document.createElement('tr');
    var tdDescription = document.createElement('td');
    var tdCharacter = document.createElement('td');
    var tdAmount = document.createElement('td');
    var textDescription = document.createTextNode(description);
    var textCharacter;
    if (character) {
        textCharacter = document.createTextNode(character);
    }
    else {
        textCharacter = document.createTextNode("-");
    }
    if (amount < 0) {
        var textAmount = document.createTextNode("-$" + (Number(amount)) * -1);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "red";
    }
    else if (amount === 0) {
        var textAmount = document.createTextNode("-");
        tdAmount.appendChild(textAmount);
    }
    else {
        var textAmount = document.createTextNode("+ $" + amount);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "green";
    }
    tdDescription.appendChild(textDescription);
    tdCharacter.appendChild(textCharacter);
    tr.appendChild(tdDescription);
    tr.appendChild(tdCharacter);
    tr.appendChild(tdAmount);
    resumeTable.appendChild(tr);
};
var getBalance = function (array) {
    var totalExp = 0;
    var totalInc = 0;
    array.forEach(function (element) {
        if (element.type == "Income") {
            totalInc += Number(element.amount);
        }
        else {
            totalExp += (Number(element.amount)) * -1;
        }
    });
    return totalInc + totalExp;
};
var getHigherIncome = function (array) {
    var higherIncome = 0;
    array.forEach(function (element) {
        if (element.type == "Income") {
            higherIncome += Number(element.amount);
        }
    });
    return higherIncome;
};
var getHigherExpense = function (array) {
    var higherExpense = 0;
    array.forEach(function (element) {
        if (element.type == "Expense") {
            higherExpense += Number(element.amount);
        }
    });
    return higherExpense;
};
var reportsResumeByCategory = function () {
    var storage = getLocalStorage();
    var higherIncome = 0;
    var higherExpense = 0;
    var higherBalance = 0;
    var higherIncomeCategory;
    var higherExpenseCategory;
    var higherBalanceCategory;
    storage.categories.forEach(function (element) {
        var byCategory = storage.operations.filter(function (item) { return item.category === element.name; });
        if (getBalance(byCategory) > higherBalance) {
            higherBalance = getBalance(byCategory);
            higherBalanceCategory = element.name;
        }
        if (getHigherIncome(byCategory) > higherIncome) {
            higherIncome = getHigherIncome(byCategory);
            higherIncomeCategory = element.name;
        }
        if (getHigherExpense(byCategory) > higherExpense) {
            higherExpense = getHigherExpense(byCategory);
            higherExpenseCategory = element.name;
        }
    });
    createResumeTable("Highest income category", higherIncomeCategory, higherIncome);
    createResumeTable("Highest expense category", higherExpenseCategory, (Number(higherExpense)) * -1);
    createResumeTable("Highest balance category", higherBalanceCategory, higherBalance);
};
// TOTALS TABLE CREATION
var createTotalsTable = function (principalCol, incomes, expenses, balance, domTable) {
    var tr = document.createElement('tr');
    var tdCategory = document.createElement('td');
    var tdIncomes = document.createElement('td');
    var tdExpenses = document.createElement('td');
    var tdBalance = document.createElement('td');
    var textCategory = document.createTextNode(principalCol);
    var textIncomes = document.createTextNode("+ $" + incomes);
    var textExpenses = document.createTextNode("- $" + expenses);
    var textBalance = document.createTextNode("$" + balance);
    tdCategory.appendChild(textCategory);
    tdIncomes.appendChild(textIncomes);
    tdExpenses.appendChild(textExpenses);
    tdBalance.appendChild(textBalance);
    tdIncomes.style.color = "green";
    tdExpenses.style.color = "red";
    tr.appendChild(tdCategory);
    tr.appendChild(tdIncomes);
    tr.appendChild(tdExpenses);
    tr.appendChild(tdBalance);
    domTable.appendChild(tr);
};
//TOTALS BY CATEGORY
var reportsTotalsByCategory = function () {
    var storage = getLocalStorage();
    storage.categories.forEach(function (element) {
        var byCategory = storage.operations.filter(function (item) { return item.category === element.name; });
        var totalExp = 0;
        var totalInc = 0;
        byCategory.forEach(function (element) {
            if (element.type == "Income") {
                totalInc += Number(element.amount);
            }
            else {
                totalExp += (Number(element.amount));
            }
        });
        var balance = getBalance(byCategory);
        createTotalsTable(element.name, totalInc, totalExp, balance, totalsByCategoryTable);
    });
};
// RESUME AND TOTALS BY MONTH
var getTotalsByDate = function () {
    var storage = getLocalStorage();
    var totalsOperations = {};
    var operations = storage.operations;
    operations.forEach(function (operation) {
        var date = new Date(operation.date);
        if (!totalsOperations[date.getFullYear()]) {
            totalsOperations[date.getFullYear()] = {};
        }
        if (!totalsOperations[date.getFullYear()][date.getMonth() + 1]) {
            totalsOperations[date.getFullYear()][date.getMonth() + 1] = [];
        }
        totalsOperations[date.getFullYear()][date.getMonth() + 1].push(operation.type === "Expense" ? operation.amount * -1 : operation.amount);
    });
    return totalsOperations;
};
var reportsResumeByMonth = function () {
    var totalsOperations = getTotalsByDate();
    var highestExpense = 0;
    var highestIncome = 0;
    var highestIncomeDate;
    var highestExpenseDate;
    var lastHighestIncome = 0;
    var lastHighestExpense = 0;
    var lastHighestIncomeDate;
    var lastHighestExpenseDate;
    var _loop_1 = function (year) {
        var operationsByYear = totalsOperations[year];
        var _loop_2 = function (month) {
            highestExpense = 0;
            highestIncome = 0;
            operationsByYear[month].forEach(function (amount) {
                if (amount < 0) {
                    highestExpense += Number(amount);
                    highestExpenseDate = month + "/" + year;
                }
                else {
                    highestIncome += Number(amount);
                    highestIncomeDate = month + "/" + year;
                }
            });
            if (highestExpense < lastHighestExpense) {
                lastHighestExpense = highestExpense;
                lastHighestExpenseDate = highestExpenseDate;
            }
            if (highestIncome > lastHighestIncome) {
                lastHighestIncome = highestIncome;
                lastHighestIncomeDate = highestIncomeDate;
            }
        };
        for (var month in operationsByYear) {
            _loop_2(month);
        }
    };
    for (var year in totalsOperations) {
        _loop_1(year);
    }
    createResumeTable("Highest income month", lastHighestIncomeDate, lastHighestIncome);
    createResumeTable("Highest expense month", lastHighestExpenseDate, lastHighestExpense);
};
var reportsTotalsByMonth = function () {
    var totalsOperations = getTotalsByDate();
    var _loop_3 = function (year) {
        var totalExp = 0;
        var totalInc = 0;
        var balance = 0;
        for (var month in totalsOperations[year]) {
            totalsOperations[year][month].forEach(function (element) {
                if (Number(element) < 0) {
                    totalExp += Number(element);
                }
                else {
                    totalInc += Number(element);
                }
            });
            balance = totalExp + totalInc;
            var date = month + "/" + year;
            createTotalsTable(date, totalInc, (Number(totalExp)) * -1, balance, totalsByMonthTable);
        }
        ;
    };
    for (var year in totalsOperations) {
        _loop_3(year);
    }
};
var storage = getLocalStorage();
//CHECK OPERATIONS TO REPORTS START
var reportsImage = document.getElementById("reportsImage");
var reportsTables = document.getElementById("reportsTables");
if (storage.operations.length >= 3) {
    reportsImage.classList.add("d-none");
    reportsResumeByCategory();
    reportsResumeByMonth();
    reportsTotalsByCategory();
    reportsTotalsByMonth();
}
else {
    reportsTables.classList.add("d-none");
}
