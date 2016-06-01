var counter = 4;

function addInput(divName){
	var newdiv = document.createElement('div');
	var newCardEntry = "<p class='lead'>" + " Card " +
	"<br><input ng-model='card" + counter + ".front' class='form-control input-lg' type='text' name='myInputs[]' placeholder='Front'>\
	<input ng-model='card" + counter + ".back' class='form-control input-lg' type='text' name='myInputs[]' placeholder='Back'></p>";
	newdiv.innerHTML = newCardEntry;
	document.getElementById(divName).appendChild(newdiv);
	counter++;
}