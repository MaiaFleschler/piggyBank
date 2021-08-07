var getLocalStorage = function () {
    var storage = JSON.parse(localStorage.getItem('piggy-storage'));
    if (!storage) {
        storage = {
            categories: [],
            operations: []
        };
    }
    return storage;
};
