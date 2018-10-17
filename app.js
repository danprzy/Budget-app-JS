
//Budget controller
var budgetController = (function() {

 // some code

})();


// UI controller
var UIControler = (function() {

    // some code

})();


// Global app controler
var controler = (function(budgetCtrl, UICtrl) {

var ctrlAddItem = function() {
console.log('działa');
	// 1. get the field input data
 	// 2. add item to the budget controller
 	// 3. add the item to UI
 	// 4. calculate budget
 	// 5 display the budget on the UI

}

 document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

document.addEventListener('keypress', function(event) {
 	if (event.keyCode === 13 || event.which === 13) { // which for older browser
 		ctrlAddItem();
 	}
 });

})(budgetController, UIControler);