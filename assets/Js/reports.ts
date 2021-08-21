// RESUME
const resumeTable = document.getElementById('resumeTable');

const createResumeTable = (description, character, amount) => {
    const tr = document.createElement('tr');
    const tdDescription = document.createElement('td');
    const tdCharacter = document.createElement('td');
    const tdAmount = document.createElement('td');
    const textDescription = document.createTextNode(description);
    const textCharacter = document.createTextNode(character); 
    if(amount < 0){
        const textAmount = document.createTextNode(`${amount}`);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "red";
    } else{
        const textAmount = document.createTextNode(`${amount}`);
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
        } else { 
            totalExp += (Number(element.amount))*-1;
        }
    });
    return totalInc + totalExp;
}

const getHigherIncome = (array) => {
    let higherIncome = 0;
    array.forEach(element => {
        if(element.type == "Income" && element.amount >= higherIncome){
            higherIncome = Number(element.amount); 
        } 
    });
    return higherIncome;
}

const getHigherExpense = (array) => {
    let higherExpense = 0;
    array.forEach(element => {
        if(element.type == "Expense" && element.amount > higherExpense){
            higherExpense = Number(element.amount);
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

    createResumeTable("Highest earning category", higherIncomeCategory, higherIncome);
    createResumeTable("Highest spending category", higherExpenseCategory, (Number(higherExpense))*-1);
    createResumeTable("Highest balance category", higherBalanceCategory, higherBalance);
}

// TOTAL BY CATEGORY
const totalsByCategoryTable = document.getElementById('totalsByCategoryTable');

const createTotalsTable = (category, earnings, spendings, balance) =>{
    const tr = document.createElement('tr');
    const tdCategory = document.createElement('td');
    const tdEarnings = document.createElement('td');
    const tdSpendings = document.createElement('td');
    const tdBalance = document.createElement('td');
    const textCategory = document.createTextNode(category);
    const textEarnings = document.createTextNode(`+ $${earnings}`); 
    const textSpendings = document.createTextNode(`- $${spendings}`); 
    const textBalance = document.createTextNode(`$${balance}`); 
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
}

const reportsTotalByCategory = () =>{
    let storage: LocalStorage = getLocalStorage();

    storage.categories.forEach(element=>{
        let byCategory = storage.operations.filter(item => item.category === element.name);
        console.log(`by category${byCategory}`)
        console.log(storage)
        let totalExp= 0;
        let totalInc= 0;
        byCategory.forEach(element => {
            
            if(element.type == "Income"){
                totalInc += Number(element.amount);
            } else { 
                totalExp += (Number(element.amount);
            }
        });
        let balance = getBalance(byCategory)
        createTotalsTable(element.name, totalInc, totalExp, balance);
    }
};

let storage: LocalStorage = getLocalStorage();
if(storage.operations.length > 3){
    reportsResumeByCategory();
    reportsTotalByCategory();
}else{
    console.log(storage.operations.length)
    alert('Not enough operations');
}
