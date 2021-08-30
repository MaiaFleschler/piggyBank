const operationsTable = document.getElementById("operationsTable");
const operationsTableBody = document.getElementById("operationsTableBody");
const selectorType = document.getElementById("selType");
const selectorCategory = document.getElementById("selCategory");
const inputDate = document.getElementById("inpDate");
const selectorOrderBy = document.getElementById("selOrderBy");
const selOrderBy = document.getElementById("selOrderBy");
const mainImage = document.getElementById("mainImage");

// BALANCE
const incomeTotal = document.getElementById('incomeTotal');
const expenseTotal = document.getElementById('expenseTotal');
const balanceTotal = document.getElementById('total');

const showBalance = (operations) => {
    incomeTotal.innerText="";
    expenseTotal.innerText="";
    balanceTotal.innerText="";
    let totalExp = 0;
    let totalInc = 0;
    operations.forEach(element => {
        if(element.type == "Income"){
            totalInc += Number(element.amount);
        } else { 
            totalExp += Number(element.amount);
        }
    });
    const total = totalInc - totalExp;
    const textIncome = document.createTextNode(`+$${totalInc}`);
    const textExpense = document.createTextNode(`-$${totalExp}`);
    let textTotal;
    if(total>0){
        textTotal = document.createTextNode(`+$${total}`);
        balanceTotal.style.color = "green";
    }else if (total<0){
        textTotal = document.createTextNode(`-$${total*-1}`);
        balanceTotal.style.color = "red";
    } else{
        textTotal = document.createTextNode(`$${total}`);
    }
    incomeTotal.style.color = "green";
    expenseTotal.style.color = "red";
    incomeTotal.appendChild(textIncome);
    expenseTotal.appendChild(textExpense);
    balanceTotal.appendChild(textTotal);
}


(<HTMLInputElement>inputDate).valueAsDate = new Date();

const deleteOperation = (e) => {
    const idOperation = e.target.dataset.id;
    let storage: LocalStorage = getLocalStorage();
    let updatedStorage = storage.operations.filter(item => item.id != idOperation);
    localStorage.setItem('piggy-storage', JSON.stringify({...storage, operations: updatedStorage}));
    let newStorage: LocalStorage = getLocalStorage();
    showBalance(newStorage.operations);
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

const createRowTable = (operation) => {
    const tr = document.createElement('tr');
    const tdDescription = document.createElement('td');
    const tdCategory = document.createElement('td');
    const tdDate = document.createElement('td');
    const tdAmount = document.createElement('td');
    const tdActions = document.createElement('td');
    const btnEdit = document.createElement('button');
    btnEdit.setAttribute('onclick', `location.href="./operations-edit.html?id=${operation.id}"`);
    btnEdit.classList.add('btn-action');
    const btnDelete = document.createElement('button');
    btnDelete.dataset.id = `${operation.id}`;
    btnDelete.classList.add('btn-action');
    const textDescription = document.createTextNode(operation.description);
    const textCategory = document.createTextNode(operation.category); 
    const textDate = document.createTextNode(operation.date); 
    if(operation.type === "Expense"){
        const textAmount = document.createTextNode(`-$${operation.amount}`);
        tdAmount.appendChild(textAmount);
        tdAmount.style.color = "red";
    } else {
        const textAmount = document.createTextNode(`+$${operation.amount}`);
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
        
    operationsTableBody.appendChild(tr);
    btnDelete.addEventListener('click', deleteOperation);
}

const orderList = (operations) => {
    const selectorOrderByValue = (<HTMLInputElement>selOrderBy).value;
    if(selectorOrderByValue == "lessAmount"){
        operations.sort((a,b) => a.amount - b.amount);
    } else if(selectorOrderByValue == "biggerAmount"){
        operations.sort((a,b) => b.amount - a.amount);
    } else if(selectorOrderByValue == "az"){
        operations.sort((a,b)=>{let x = a.description.toUpperCase(), y = b.description.toUpperCase(); return x==y?0:x>y?1:-1;})
    } else if(selectorOrderByValue == "za"){
        operations.sort((a,b)=>{let x = b.description.toUpperCase(), y = a.description.toUpperCase(); return x==y?0:x>y?1:-1;})
    } else if(selectorOrderByValue == "lessRecent"){
        operations.sort((a,b) =>{let x = a.date, y = b.date; return x==y?0:x>y?1:-1;})
    }  else if(selectorOrderByValue == "moreRecent"){
        operations.sort((a,b) =>{let x = b.date, y = a.date; return x==y?0:x>y?1:-1;})
    }
}

const filterOperations = () => {
    let storage: LocalStorage = getLocalStorage();
    let operationsAll = storage.operations;
    const selectorTypeValue = (<HTMLInputElement>selectorType).value;
    const selectorCategoryValue = (<HTMLInputElement>selectorCategory).value;
    const selectorDateValue = new Date((<HTMLInputElement>inputDate).value);
       
    const operationsByType = operationsAll.filter(item => selectorTypeValue == "All" || item.type == selectorTypeValue);

    const operationsByCategory = operationsByType.filter(item => selectorCategoryValue == "All" || item.category == selectorCategoryValue);

    const operationsByDate = operationsByCategory.filter(item => selectorDateValue <= (new Date(item.date)));

    if(operationsByDate.length === 0){
        operationsTable.classList.add('d-none');
        mainImage.classList.remove('d-none');
    }else{
        operationsTable.classList.remove('d-none');
        mainImage.classList.add('d-none');
        operationsTableBody.innerHTML = "";
        orderList(operationsByDate);
        for(const operation of operationsByDate){
            createRowTable(operation);
        }
    }
    showBalance(operationsByDate);
}

const loadOperationsBeginning = () => {
    let storage: LocalStorage = getLocalStorage();
    let operationsAll = storage.operations;
    //Filter by date from today to start
    const operationsFromToday = operationsAll.filter(item => new Date() <= (new Date(item.date)));

    if(operationsFromToday.length === 0){
        operationsTable.classList.add('d-none');
        mainImage.classList.remove('d-none');
    }else{
        operationsTable.classList.remove('d-none');
        mainImage.classList.add('d-none');
        operationsTableBody.innerHTML = "";
        orderList(operationsFromToday);
        for(const operation of operationsFromToday){
            createRowTable(operation);
        }
    }
    showBalance(operationsFromToday);
}
const loadOperations = () => {
    filterOperations();
    //Filter Type
    selectorType.addEventListener('change', filterOperations);
    //Filter Category
    selectorCategory.addEventListener('change', filterOperations);
    //Filter Date
    inputDate.addEventListener('change', filterOperations);
    //Order By
    selOrderBy.addEventListener('change', filterOperations);
}

deleteOperationsWOCategory();
loadOperations();
loadOperationsBeginning();

// HIDE FILTERS
const filtersForm = document.getElementById("filtersForm");
const hideFilters = document.getElementById("hideFilters");
const showFilters = document.getElementById("showFilters");

hideFilters.addEventListener("click", ()=>{
    filtersForm.classList.add('d-none');
    hideFilters.classList.add('d-none');
    showFilters.classList.remove('d-none');
});
showFilters.addEventListener("click", ()=>{
    filtersForm.classList.remove('d-none');
    hideFilters.classList.remove('d-none');
    showFilters.classList.add('d-none');
});
