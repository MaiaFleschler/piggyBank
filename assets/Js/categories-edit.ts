const param = new URLSearchParams(window.location.search);
const formEditCategory = document.getElementById('formEditCategory');

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