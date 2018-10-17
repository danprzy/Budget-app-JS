var budgetController = (function() {

    var x = 23;

    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            return add(b);
        }
    }
})();


var UIControler = (function() {


// some code


})();



var controler = (function(budgetCtrl, UICtrl) {

var z = budgetCtrl.publicTest(5);
// some code

return {
anotherPublic: function() {
	console.log(z);
}

}

})(budgetController, UIControler);