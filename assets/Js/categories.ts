
let storage: LocalStorage = getLocalStorage();
const formNewCategory = document.getElementById("formNewCategory");

const addNewCategory = (e) =>{
    e.preventDefault();
    const form = e.target;
    const newCategoryName: string = form.name.value;
    const newCategory: Category = {
        id: getId(storage.categories),
        name: newCategoryName
    }
    storage.categories.push(newCategory);
    localStorage.setItem('piggy-storage', JSON.stringify(storage));
    console.log(storage);
}

formNewCategory.addEventListener('submit', addNewCategory);
