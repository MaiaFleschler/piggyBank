
type LocalStorage = {
    categories?: Category[],
    operations?: Operation[]
}

type Category = {
	id: number,
	name: string,
}

type Operation = {
    id: number,
    description: string,
    amount: number,
    type: string,
    category: string,
    date: string
}


const getLocalStorage = (): LocalStorage =>{
    let storage: LocalStorage = JSON.parse(localStorage.getItem('piggy-storage'));

    if(!storage){
        storage ={
            categories: [],
            operations: []
        }
    }
    return storage;
}

const storage1: LocalStorage = getLocalStorage();

const getId = (storageArray) => {

    if(storageArray.length > 0) {
       const lastItem = storageArray[storageArray.length -1];
       return lastItem.id + 1;
    } 
 
    return 1;
 }
