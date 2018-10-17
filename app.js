//Budget controller
var budgetController = (function() {

    // some code

})();


// UI controller
var UIControler = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// Global app controler
var controler = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function() {

        // 1. get the field input data
        var input = UIControler.getInput();
        console.log(input);
        // 2. add item to the budget controller
        // 3. add the item to UI
        // 4. calculate budget
        // 5 display the budget on the UI
    };

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) { // which for older browser
            ctrlAddItem();
        }
    });

})(budgetController, UIControler);