var causes = ko.observableArray([]);

function PreferencesViewModel() {
	var self = this;
	self.selected_cause = ko.observable();
	self.cause_page_number = 1;
	self.cause_page_size = 7;
	self.name_filter = ko.observable("");
	self.selectedCauses = ko.observableArray([]);
	
	causeFindAll = function() {
		Dajaxice.cause.dajax_cause_find_all_by_status(causeFindAllCallback, {
			'status' : "ACTIVE",
			'name_filter' : self.name_filter(),
			'page_number' : self.cause_page_number,
			'page_size' : self.cause_page_size
		});
	};	

	// Dajaxice cause_find_all callback
	function causeFindAllCallback(data) {
		causes.removeAll();		
		var cause_index=0;
		data.content.forEach(function(cause) {
			var cause_promotional_photo_src = default_promotional_photo_267x167;
			causes.push(new Cause(cause.id_cause, cause.name,
					cause.description+"...", null,
					null, null, null, null, null,
					null, null, null, null,
					null, null, cause_promotional_photo_src,
					cause.color,null, 
					null,null,null,null));
			if (cause.parameters.id_promotional_photo != null && cause.parameters.id_promotional_photo != "") {
				findPromotionalPhotoById(cause.parameters.id_promotional_photo,cause_index, "cause");
			}
			cause_index++;
		});
	};
	
	// Find a resource by id:
	findPromotionalPhotoById = function(id_resource, cause_index, object){
		$('#'+id_resource).mask("");
		if (object == "cause"){
			Dajaxice.resource.dajax_resource_find(findCausePromotionalPhotoCallback, 
					{'id_resource' : id_resource, 'array_index': cause_index,
					 'resource_width': 240, 'resource_height' : 150});
		}
	};
	// Find a resource by id Callback:
	function findCausePromotionalPhotoCallback(data){
		causes()[data.array_index].promotional_photo_src('data:'+data.content_type+';base64,'+data.binary_content);
		$('#'+data.id_resource).unmask();
	};
	
	
	// Function that hold the post selected from the list:
    selectionCauses = function(cause) {
    	self.selectedCauses.push(cause);
    };
    
    deselectCauses = function(cause) {
    	for (var i = 0; i < self.selectedCauses().length; i++) {
			if ((self.selectedCauses()[i]) == cause) {
				self.selectedCauses.splice(i, 1);
				i = self.selectedCauses().length;

			}
		}
    };
	
}
ko.applyBindings(PreferencesViewModel(), document.getElementById("divPreferencesViewModelViewModel"));