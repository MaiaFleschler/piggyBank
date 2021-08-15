const operationsTable = document.getElementById("operationsTable");

const deleteOperation = (e) => {
    const idOperation = e.target.dataset.id;
    let storage: LocalStorage = getLocalStorage();
    let updatedStorage = storage.operations.filter(item => item.id != idOperation);
    localStorage.setItem('piggy-storage', JSON.stringify({...storage, operations: updatedStorage}));
    loadOperations();
}

const deleteOperationsWOCategory = () => {
    let storage: LocalStorage = getLocalStorage();
    const arrayCategorias = [];
    storage.categories.forEach(element => {
        arrayCategorias.push(element.name);
    });
    
    let updatedStorage = storage.operations.filter(item => arrayCategorias.includes(item.category));
    localStorage.setItem('piggy-storage', JSON.stringify({...storage, operations: updatedStorage}));
}

const loadOperations = () => {
    operationsTable.innerHTML = "";
    let storage: LocalStorage = getLocalStorage();
    let operations = storage.operations;
    
    for(const operation of operations){
        const tr = document.createElement('tr');
        const tdDescription = document.createElement('td');
        const tdCategory = document.createElement('td');
        const tdDate = document.createElement('td');
        const tdAmount = document.createElement('td');
        const tdActions = document.createElement('td');
        const btnEdit = document.createElement('button');
        btnEdit.setAttribute('onclick', `location.href="./operations-edit.html?id=${operation.id}"`);
        const btnDelete = document.createElement('button');
        btnDelete.dataset.id = `${operation.id}`;
        const textDescription = document.createTextNode(operation.description);
        const textCategory = document.createTextNode(operation.category); 
        const textDate = document.createTextNode(operation.date); 
        if(operation.type === "Expense"){
            const textAmount = document.createTextNode(`${(operation.amount)*-1}`);
            tdAmount.appendChild(textAmount);
            tdAmount.style.color = "red";
        } else {
            const textAmount = document.createTextNode(`${operation.amount}`);
            tdAmount.appendChild(textAmount);
            tdAmount.style.color = "green";
        }
        const textEdit = document.createTextNode('Edit');
        const textDelete = document.createTextNode('Delete');
        
        tdDescription.appendChild(textDescription);
        tdCategory.appendChild(textCategory);
        tdDate.appendChild(textDate);
        
        btnEdit.appendChild(textEdit);
        btnDelete.appendChild(textDelete);
        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete)
        tr.appendChild(tdDescription);
        tr.appendChild(tdCategory);
        tr.appendChild(tdDate);
        tr.appendChild(tdAmount);
        tr.appendChild(tdActions);
        
        operationsTable.appendChild(tr);
        btnDelete.addEventListener('click', deleteOperation);
    }
}
deleteOperationsWOCategory();
loadOperations();

const incomeTotal = document.getElementById('incomeTotal');
const expenseTotal = document.getElementById('expenseTotal');
const balanceTotal = document.getElementById('total');

const showBalance = () => {
    let storage: LocalStorage = getLocalStorage();
    let totalExp = 0;
    let totalInc = 0;
    storage.operations.forEach(element => {
        if(element.type == "Income"){
            totalInc += Number(element.amount);
        } else { 
            totalExp += (Number(element.amount))*-1;
        }
    });
    const total = totalInc + totalExp;
    const pIncome = document.createElement('p');
    pIncome.style.color = "green";
    const pExpense = document.createElement('p');
    pExpense.style.color = "red";
    const pTotal = document.createElement('p');
    const textIncome = document.createTextNode(`${totalInc}`);
    const textExpense = document.createTextNode(`${totalExp}`);
    const textTotal = document.createTextNode(`${total}`);
    pIncome.appendChild(textIncome);
    pExpense.appendChild(textExpense);
    pTotal.appendChild(textTotal);
    incomeTotal.appendChild(pIncome);
    expenseTotal.appendChild(pExpense);
    balanceTotal.appendChild(pTotal);
}
showBalance();
