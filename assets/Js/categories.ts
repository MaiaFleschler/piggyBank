const categoriesTable = document.getElementById('categoriesTable');

const deleteCategory = (e) => {
    const idCategory = e.target.dataset.id;
    let storage: LocalStorage = getLocalStorage();
    let updatedStorage = storage.categories.filter(item => item.id != idCategory);
    localStorage.setItem('piggy-storage', JSON.stringify({...storage, categories: updatedStorage}));
    loadCategories();
}

const loadCategories = () => {
    categoriesTable.innerHTML = "";
    let storage: LocalStorage = getLocalStorage();
    let categories = storage.categories;
    
    for(const category of categories){
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdEdit = document.createElement('td');
        const tdDelete = document.createElement('td');
        const btnEdit = document.createElement('button');
        btnEdit.classList.add('btn-action');
        btnEdit.setAttribute('onclick', `location.href="./categories-edit.html?id=${category.id}"`);
        const btnDelete = document.createElement('button');
        btnDelete.dataset.id = `${category.id}`;
        btnDelete.classList.add('btn-action');
        const textName = document.createTextNode(category.name) 
        const textEdit = document.createTextNode('Edit');
        const textDelete = document.createTextNode('Delete');
        
        tdName.appendChild(textName);
        btnEdit.appendChild(textEdit);
        btnDelete.appendChild(textDelete);
        tdEdit.appendChild(btnEdit);
        tdDelete.appendChild(btnDelete)
        tr.appendChild(tdName);
        tr.appendChild(tdEdit);
        tr.appendChild(tdDelete);
        
        btnDelete.addEventListener('click', deleteCategory);
        categoriesTable.appendChild(tr);
    }
}

const formNewCategory = document.getElementById("formNewCategory");

const addNewCategory = (e) =>{
    let storage: LocalStorage = getLocalStorage();
    console.log(storage, storage.categories);
    e.preventDefault();
    const form = e.target;
    const newCategoryName: string = form.name.value;
    const newCategory: Category = {
        id: getId(storage.categories),
        name: newCategoryName
    }
    storage.categories.push(newCategory);
    localStorage.setItem('piggy-storage', JSON.stringify(storage));
    loadCategories();
    console.log(storage);
}

loadCategories();
formNewCategory.addEventListener('submit', addNewCategory);


