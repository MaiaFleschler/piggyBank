const param = new URLSearchParams(window.location.search);
const formEditCategory = document.getElementById('formEditCategory');
const inpName = document.getElementById('inpName');

const showCurrValues = () => {
    let storage: LocalStorage = getLocalStorage();
    storage.categories.forEach(element => {
        if(element.id == param.get("id")){
            (<HTMLInputElement>inpName).value= element.name;
        }
    });
}
showCurrValues();


const editCategory = (e) => {
    let storage: LocalStorage = getLocalStorage();
    const form = e.target;
    const newCategoryName: string = form.name.value;

    storage.categories.forEach(element => {
        if(element.id == param.get("id")){
            element.name = newCategoryName;
        }
    });
   localStorage.setItem('piggy-storage', JSON.stringify(storage));
}

formEditCategory.addEventListener('submit', editCategory);