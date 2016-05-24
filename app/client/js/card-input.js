function addInput(divName){
	var newdiv = document.createElement('div');
	var newCardEntry = "<p class='lead'>" + " Card " +
	"<br><input class='form-control input-lg' type='text' name='myInputs[]' placeholder='Front'>\
	<input ng-model='' class='form-control input-lg' type='text' name='myInputs[]' placeholder='Back'></p>";
	newdiv.innerHTML = newCardEntry;
	document.getElementById(divName).appendChild(newdiv);
	counter++;
}