


const operationsTable = document.getElementById("operationsTable");

const loadOperations = () => {
    console.log("entró");
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
        const textAmount = document.createTextNode(`${operation.amount}`);  
        const textEdit = document.createTextNode('Edit');
        const textDelete = document.createTextNode('Delete');
        
        tdDescription.appendChild(textDescription);
        tdCategory.appendChild(textCategory);
        tdDate.appendChild(textDate);
        tdAmount.appendChild(textAmount);
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
    }
}

loadOperations();
