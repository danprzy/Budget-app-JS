//Budget controller
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

   // var allExpenses = [];
   // var allIncomes = [];
    // var totalExpenses = 0;
   // var totalIncomes = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

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

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) { // which for older browser
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function() {

        // 1. get the field input data
        var input = UIControler.getInput();
        console.log(input); 
        // 2. add item to the budget controller
        // 3. add the item to UI
        // 4. calculate budget
        // 5 display the budget on the UI
    };

    return {
        init: function() {
            console.log('aplikacja wystartowala');
            setupEventListeners();
        }
    };

})(budgetController, UIControler);

controler.init();