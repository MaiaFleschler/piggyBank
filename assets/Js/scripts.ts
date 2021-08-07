
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
    type: "spending"|"gain",
    category: string[],
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
