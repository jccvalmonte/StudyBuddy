$(document).ready(function() {
	if ($.cookie("validation") == null) {
		$(".form-popup").modal({show: true, backdrop: 'static', keyboard: false})
		$.cookie("validation", "1"); // cookie will expire in 1 day
	}
});