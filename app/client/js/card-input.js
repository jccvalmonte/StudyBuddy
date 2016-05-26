function addInput(divName){
	counter++;
	var newdiv = document.createElement('div');
	var newCardEntry = "<p class='lead'>" + " Card " +
	"<br><input ng-model='cardData[" + counter + "].front' class='form-control input-lg' type='text' name='myInputs[]' placeholder='Front'>\
	<input ng-model='cardData[" + counter + "].back' class='form-control input-lg' type='text' name='myInputs[]' placeholder='Back'></p>";
	newdiv.innerHTML = newCardEntry;
	document.getElementById(divName).appendChild(newdiv);
}