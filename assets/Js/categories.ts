
let storage: LocalStorage = getLocalStorage();

const categoriesTable = document.getElementById('categoriesTable');

const loadCategories = () => {
    console.log('entró');
    categoriesTable.innerHTML = "";
   // let storage: LocalStorage = getLocalStorage();
    let categories = storage.categories;
    

    for(const category of categories){
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdEdit = document.createElement('td');
        const tdDelete = document.createElement('td');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        btnEdit.dataset.id = `${category.id}`;
        btnDelete.dataset.id = `${category.id}`;
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
        
        categoriesTable.appendChild(tr);
    }

}
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
    loadCategories();
    console.log(storage);
}

formNewCategory.addEventListener('submit', addNewCategory);

