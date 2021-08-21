// RESUME
var resumeTable = document.getElementById('resumeTable');
var createResumeTable = function (description, character, amount) {
    var tr = document.createElement('tr');
    var tdDescription = document.createElement('td');
    var tdCharacter = document.createElement('td');
    var tdAmount = document.createElement('td');
    var textDescription = document.createTextNode(description);
    var textCharacter = document.createTextNode(character);
    if (amount < 0) {
        var textAmount = document.createTextNode("" + amount);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "red";
    }
    else {
        var textAmount = document.createTextNode("" + amount);
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
        if (element.type == "Income" && element.amount >= higherIncome) {
            higherIncome = Number(element.amount);
        }
    });
    return higherIncome;
};
var getHigherExpense = function (array) {
    var higherExpense = 0;
    array.forEach(function (element) {
        if (element.type == "Expense" && element.amount > higherExpense) {
            higherExpense = Number(element.amount);
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
    createResumeTable("Highest earning category", higherIncomeCategory, higherIncome);
    createResumeTable("Highest spending category", higherExpenseCategory, (Number(higherExpense)) * -1);
    createResumeTable("Highest balance category", higherBalanceCategory, higherBalance);
};
// TOTAL BY CATEGORY
var totalsByCategoryTable = document.getElementById('totalsByCategoryTable');
var createTotalsTable = function (category, earnings, spendings, balance) {
    var tr = document.createElement('tr');
    var tdCategory = document.createElement('td');
    var tdEarnings = document.createElement('td');
    var tdSpendings = document.createElement('td');
    var tdBalance = document.createElement('td');
    var textCategory = document.createTextNode(category);
    var textEarnings = document.createTextNode("+ $" + earnings);
    var textSpendings = document.createTextNode("- $" + spendings);
    var textBalance = document.createTextNode("$" + balance);
    tdCategory.appendChild(textCategory);
    tdEarnings.appendChild(textEarnings);
    tdSpendings.appendChild(textSpendings);
    tdBalance.appendChild(textBalance);
    tdEarnings.style.color = "green";
    tdSpendings.style.color = "red";
    tr.appendChild(tdCategory);
    tr.appendChild(tdEarnings);
    tr.appendChild(tdSpendings);
    tr.appendChild(tdBalance);
    totalsByCategoryTable.appendChild(tr);
};
var reportsTotalByCategory = function () {
    var storage = getLocalStorage();
    storage.categories.forEach(function (element) {
        var byCategory = storage.operations.filter(function (item) { return item.category === element.name; });
        console.log("by category" + byCategory);
        console.log(storage);
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
        createTotalsTable(element.name, totalInc, totalExp, balance);
    });
};
var storage = getLocalStorage();
if (storage.operations.length > 3) {
    reportsResumeByCategory();
    reportsTotalByCategory();
}
else {
    console.log(storage.operations.length);
    alert('Not enough operations');
}