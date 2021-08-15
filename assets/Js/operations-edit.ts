const param = new URLSearchParams(window.location.search);
const formEditOperation = document.getElementById('formEditOperation');
const inpDescription = document.getElementById('inpDescription');
const inpAmount = document.getElementById('inpAmount');
const selType = document.getElementById('selType');
const selCategory = document.getElementById('selCategory');
const inpDate = document.getElementById('inpDate');

const showCurrentValues = () => {
    let storage: LocalStorage = getLocalStorage();
    storage.operations.forEach(element => {
        if(element.id == param.get("id")){
            (<HTMLInputElement>inpDescription).value= element.description;
            (<HTMLInputElement>inpAmount).value= element.amount;
            (<HTMLInputElement>selType).value= element.type;
            (<HTMLInputElement>selCategory).value= element.category;
            (<HTMLInputElement>inpDate).value= element.date;
        }
    });
}
showCurrentValues();


const editOperation = (e) => {
    let storage: LocalStorage = getLocalStorage();
    
    const form = e.target;
    const newDescription: string = form.description.value;
    const newType: string = form.type.value;
    const newAmount: number = form.amount.value; 
    const newCategory: string = form.category.value;
    const newDate: string = form.date.value;

    storage.operations.forEach(element => {
        if(element.id == param.get("id")){
            element.description = newDescription;
            element.amount = newAmount;
            element.type = newType;
            element.category = newCategory;
            element.date = newDate;
        }
    });
   localStorage.setItem('piggy-storage', JSON.stringify(storage));
}

formEditOperation.addEventListener('submit', editOperation);