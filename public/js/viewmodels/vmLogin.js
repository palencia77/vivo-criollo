var causesLogin = ko.observableArray([]);

function loginViewModel() {
	
	self.cause_page_number = 1;
	self.cause_page_size = 3;
	self.causeOne = ko.observable();
	self.causeTwo= ko.observable();
	self.causeThree = ko.observable();

	causeFindAll = function() {
		Dajaxice.cause.dajax_cause_find_all(causeFindAllCallback, {
			'name_filter' : "",
			'level_data' : 0,
			'page_number' : self.cause_page_number,
			'page_size' : self.cause_page_size
		});
	};
	causeFindAll();
	
	// Dajaxice cause_find_all callback
	function causeFindAllCallback(data) {
		causesLogin.removeAll();
		var cause_partner = {"id_partner" : "", "name" : "Disponible", "description" : "", "id_resource" : ""};
		var cause_celebrity = {"id_celebrity" : "", "name" : "Disponible", "description" : "", "id_resource" : ""};
		data.content.forEach(function(cause) {
			causesLogin.push(new Cause(cause.id_cause, cause.name,
						cause.description+"...", null,null, null,
						null, null, null,null, cause.love_meter,
						cause.love_goal, null,null,null, null,
						null, null, null, cause_partner, cause_partner,cause.parameters,null,null,cause.short_url));
//				if (cause.parameters.id_promotional_photo != null && cause.parameters.id_promotional_photo != "") {
//					findResourceById(cause.parameters.id_promotional_photo, causesLogin().length-1, "promotional_photo");
//				}
	});
		$("#nameCauseOne").text(causesLogin()[0].name);		
		$("#urlCauseOne").attr('href', causesLogin()[0].short_url);
		url1= 'http://www.heybees.com:5001/resource/public/view?id_resource='+causesLogin()[0].parameters.id_promotional_photo;
		document.getElementById("imgCauseOne").style.backgroundImage="url("+url1+")";
		$("#nameCauseTwo").text(causesLogin()[1].name);
		$("#urlCauseTwo").attr('href', causesLogin()[1].short_url);
		url2= 'http://www.heybees.com:5001/resource/public/view?id_resource='+causesLogin()[1].parameters.id_promotional_photo;
		document.getElementById("imgCauseTwo").style.backgroundImage="url("+url2+")";
		$("#nameCauseThree").text(causesLogin()[2].name);
		$("#urlCauseThree").attr('href', causesLogin()[2].short_url);
		url3= 'http://www.heybees.com:5001/resource/public/view?id_resource='+causesLogin()[2].parameters.id_promotional_photo;;
		document.getElementById("imgCauseThree").style.backgroundImage="url("+url3+")";
				
	};	
	
}
ko.applyBindings(new loginViewModel());
//ko.applyBindings(loginViewModel(), document.getElementById("divLoginViewModel"));