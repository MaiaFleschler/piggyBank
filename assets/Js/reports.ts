// TABLES DOM
const resumeTable = document.getElementById('resumeTable');
const totalsByCategoryTable = document.getElementById('totalsByCategoryTable');
const totalsByMonthTable = document.getElementById('totalsByMonthTable');

// RESUME
const createResumeTable = (description, character, amount) => {
    const tr = document.createElement('tr');
    const tdDescription = document.createElement('td');
    const tdCharacter = document.createElement('td');
    const tdAmount = document.createElement('td');
    const textDescription = document.createTextNode(description);
    let textCharacter;
    if(character){
        textCharacter = document.createTextNode(character); 
    }else{
        textCharacter = document.createTextNode("-"); 
    }
    if(amount < 0){
        const textAmount = document.createTextNode(`-$${(Number(amount))*-1}`);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "red";
    }else if(amount === 0){
        const textAmount = document.createTextNode("-");
        tdAmount.appendChild(textAmount);
    }else{
        const textAmount = document.createTextNode(`+ $${amount}`);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "green";
    }
    tdDescription.appendChild(textDescription);
    tdCharacter.appendChild(textCharacter);

    tr.appendChild(tdDescription);
    tr.appendChild(tdCharacter);
    tr.appendChild(tdAmount);
        
    resumeTable.appendChild(tr);
}

const getBalance = (array) =>{
    let totalExp = 0;
    let totalInc = 0;
    array.forEach(element => {
        if(element.type == "Income"){
            totalInc += Number(element.amount);
        }else { 
            totalExp += (Number(element.amount))*-1;
        }
    });
    return totalInc + totalExp;
}

const getHigherIncome = (array) => {
    let higherIncome = 0;
    array.forEach(element => {
        if(element.type == "Income"){
            higherIncome += Number(element.amount); 
        } 
    });
    return higherIncome;
}

const getHigherExpense = (array) => {
    let higherExpense = 0;
    array.forEach(element => {
        if(element.type == "Expense"){
            higherExpense += Number(element.amount);
        }
    });
    return higherExpense;
}

const reportsResumeByCategory = () => {
    let storage: LocalStorage = getLocalStorage();
    let higherIncome = 0;
    let higherExpense = 0;
    let higherBalance = 0;
    let higherIncomeCategory;
    let higherExpenseCategory;
    let higherBalanceCategory;
    storage.categories.forEach(element=>{
        let byCategory = storage.operations.filter(item => item.category === element.name);
        if(getBalance(byCategory) > higherBalance){
            higherBalance = getBalance(byCategory);
            higherBalanceCategory = element.name;
        }
        if(getHigherIncome(byCategory) > higherIncome){
            higherIncome = getHigherIncome(byCategory);
            higherIncomeCategory = element.name;
        }
        if(getHigherExpense(byCategory) > higherExpense){
            higherExpense = getHigherExpense(byCategory);
            higherExpenseCategory = element.name;
        }
    })

    createResumeTable("Highest income category", higherIncomeCategory, higherIncome);
    createResumeTable("Highest expense category", higherExpenseCategory, (Number(higherExpense))*-1);
    createResumeTable("Highest balance category", higherBalanceCategory, higherBalance);
}

// TOTALS TABLE CREATION
const createTotalsTable = (principalCol, incomes, expenses, balance, domTable) =>{
    const tr = document.createElement('tr');
    const tdCategory = document.createElement('td');
    const tdIncomes = document.createElement('td');
    const tdExpenses = document.createElement('td');
    const tdBalance = document.createElement('td');
    const textCategory = document.createTextNode(principalCol);
    const textIncomes = document.createTextNode(`+ $${incomes}`); 
    const textExpenses = document.createTextNode(`- $${expenses}`); 
    const textBalance = document.createTextNode(`$${balance}`); 
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
}

//TOTALS BY CATEGORY
const reportsTotalsByCategory = () =>{
    let storage: LocalStorage = getLocalStorage();

    storage.categories.forEach(element=>{
        let byCategory = storage.operations.filter(item => item.category === element.name);
        let totalExp= 0;
        let totalInc= 0;
        byCategory.forEach(element => {
            if(element.type == "Income"){
                totalInc += Number(element.amount);
            } else { 
                totalExp += (Number(element.amount)
            }
        });
        let balance = getBalance(byCategory);
        createTotalsTable(element.name, totalInc, totalExp, balance, totalsByCategoryTable);
    }
};


// RESUME AND TOTALS BY MONTH
const getTotalsByDate = () => {
    let storage: LocalStorage = getLocalStorage();  
    let totalsOperations = {};
    let operations = storage.operations;

    operations.forEach( (operation) => {
        const date = new Date(operation.date);

        if(!totalsOperations[date.getFullYear()]) {
            totalsOperations[date.getFullYear()] = {};
        } 
        if(!totalsOperations[date.getFullYear()][date.getMonth()+1]){
            totalsOperations[date.getFullYear()][date.getMonth()+1] = [];
        }
        totalsOperations[date.getFullYear()][date.getMonth()+1].push(operation.type === "Expense" ? operation.amount * -1 : operation.amount);
    });
    return totalsOperations;
};

const reportsResumeByMonth =()=>{
    const totalsOperations = getTotalsByDate();
    let highestExpense = 0;
    let highestIncome = 0;
    let highestIncomeDate;
    let highestExpenseDate;
    let lastHighestIncome = 0;
    let lastHighestExpense = 0;
    let lastHighestIncomeDate;
    let lastHighestExpenseDate;

    for(let year in totalsOperations){
        let operationsByYear = totalsOperations[year];
        for(let month in operationsByYear){
            highestExpense = 0;
            highestIncome= 0;
            operationsByYear[month].forEach(amount => {
                if(amount < 0){
                    highestExpense += Number(amount);
                    highestExpenseDate = `${month}/${year}`;
                }else{
                    highestIncome += Number(amount);
                    highestIncomeDate = `${month}/${year}`;
                }
            });
            if(highestExpense < lastHighestExpense){
                lastHighestExpense = highestExpense;
                lastHighestExpenseDate = highestExpenseDate;
            }
            if(highestIncome > lastHighestIncome){
                lastHighestIncome = highestIncome;
                lastHighestIncomeDate = highestIncomeDate;
            }
        }
    }
    createResumeTable(`Highest income month`, lastHighestIncomeDate, lastHighestIncome);
    createResumeTable(`Highest expense month`, lastHighestExpenseDate, lastHighestExpense   );
}

const reportsTotalsByMonth = () => {
    const totalsOperations = getTotalsByDate();

    for (let year in totalsOperations){
        let totalExp = 0;
        let totalInc = 0;
        let balance = 0;
        for (let month in totalsOperations[year]){
            totalsOperations[year][month].forEach(element => {
                if(Number(element) < 0){
                   totalExp += Number(element);
                } else { 
                    totalInc += Number(element);
                }
            });
            balance = totalExp + totalInc;
            const date = `${month}/${year}`
            createTotalsTable(date, totalInc, (Number(totalExp))*-1, balance, totalsByMonthTable);
        };
    }
};

let storage: LocalStorage = getLocalStorage();

//CHECK OPERATIONS TO REPORTS START
const reportsImage = document.getElementById("reportsImage");
const reportsTables = document.getElementById("reportsTables");

if(storage.operations.length >= 3){
    reportsImage.classList.add("d-none");
    reportsResumeByCategory();
    reportsResumeByMonth();
    reportsTotalsByCategory();
    reportsTotalsByMonth();
}else{
    reportsTables.classList.add("d-none");
}
