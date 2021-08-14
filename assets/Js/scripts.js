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
var storage1 = getLocalStorage();
var getId = function (storageArray) {
    if (storageArray.length > 0) {
        var lastItem = storageArray[storageArray.length - 1];
        return lastItem.id + 1;
    }
    return 1;
};
