//Budget controller
// MVC - Model (budgetController) stores and manage the data
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }

    };

    Expense.prototype.getPercantage = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // var allExpenses = [];
    // var allIncomes = [];
    // var totalExpenses = 0;
    // var totalIncomes = 0;

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };



    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // create new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                // ID = last ID + 1   
            } else {
                ID = 0;
            }


            //create new item
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // push into data structure
            data.allItems[type].push(newItem);

            // return new element
            return newItem;
        },

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(current) {
                return current.id
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1)
            }

        },
        /**/
        calculateBudget: function() {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate budget: income - expences
            data.budget = data.totals.inc - data.totals.exp;

            // calculete the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

            //   console.log(data.allItems);
        },

        calculatePercentages: function() {
            // a=20, b=10, c=40 income  = 100
            //a = 20/100 = 20%
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });

        },

        getPercantages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercantage();
            });
            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function() {
            console.log(data);
        }
    };

})();


// UI controller
// MVC - View (UIController) displays UI and manage DOM manipulation.
var UIControler = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expencesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expencesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };


    var formatNumber = function(num, type) {
        var numSplit, int, dec;

        // 2 decimal 
        num = Math.abs(num);
        num = num.toFixed(2);

        // comma separating thousans
        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // input 1000, output 1,000
        }
        dec = numSplit[1];

        // + or -
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };


    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml;
            // create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }
            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTM<L into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        // selectorID = itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;//income-0
        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearField: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            // querySelectorAll give us list, which we want change to array
            fieldsArr = Array.prototype.slice.call(fields);

            // loop over array to clear fields. Callback function is applied to each of the elements in the array
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expencesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';
            }
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expencesPercLabel);

            var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }

            };

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                    console.log(percentages);
                } else {
                    current.textContent = '---';
                }
            });

        },
        displayMonth: function() {
            var now, year, month;
            var now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// Global app controler
// MVC - Controller (controller) provide event handlers and updates view and model.
var controler = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) { // which for older browser
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function() {
        // 1. calculate budget
        budgetCtrl.calculateBudget();
        // 2. return budget
        var budget = budgetCtrl.getBudget();
        // 3. displaythe budget on the UI   
        UICtrl.displayBudget(budget);
    }

    var updatePercentages = function() {
        // calculate percentages
        budgetCtrl.calculatePercentages();
        // read from  budget controller
        var percentages = budgetCtrl.getPercantages();
        // update UI
        UICtrl.displayPercentages(percentages);
        console.log(percentages);
    }

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. get the field input data
        input = UIControler.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            // 2. add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the item to UI
            UIControler.addListItem(newItem, input.type);

            // 4. clear fields
            UICtrl.clearField();

            //5. calculate and update budget
            updateBudget();

            //6. calculate and updater percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        // DOM treversing
        // event.target - i.ion-ios-close-outline
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            // inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // delate item from data structure
            budgetCtrl.deleteItem(type, ID);
            // delete item from UI
            UICtrl.deleteListItem(itemID);
            // update and show new budget
            updateBudget();

            // calculate and updater percentages
            updatePercentages();
        }
        console.log(event);
    };

    return {
        init: function() {
            console.log('aplikacja wystartowala');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetController, UIControler);

controler.init();