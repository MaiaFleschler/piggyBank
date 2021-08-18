const formNewOperation = document.getElementById("formNewOperation");
const inpDate = document.getElementById("inpDate");

(<HTMLInputElement>inpDate).valueAsDate = new Date();

const addNewOperation = (e) =>{
    let storage: LocalStorage = getLocalStorage();
    const form = e.target;
    const newDescription: string = form.description.value;
    const newType: string = form.type.value;
    const newAmount: number = form.amount.value; 

     const newOperationCategory: string = form.category.value;
     const newDate: string = form.date.value;
     const newOperation: Operation = {
         id: getId(storage.operations),
         description: newDescription,
         amount: newAmount,
         type: newType,
         category: newOperationCategory,
         date: newDate
     }
     storage.operations.push(newOperation);
     localStorage.setItem('piggy-storage', JSON.stringify(storage));
     console.log(storage);
 }
 
 formNewOperation.addEventListener('submit', addNewOperation);
 