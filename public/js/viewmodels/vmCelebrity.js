//Variables Globales:
var selected_celebrity = ko.observable();
	
function CelebrityViewModel() {
	var self = this;
	self.name_filter = ko.observable("");
	
	// show celebrity
	showCelebrity = function(celebrity) {
		// Definition of the ceelbrity url:
		selected_celebrity(new Celebrity(celebrity.id, celebrity.name,
							celebrity.description, null, celebrity.web_site, 
							celebrity.facebook, celebrity.twitter,
							celebrity.google_plus, celebrity.parameters.id_avatar,
							celebrity.parameters.id_promotional_photo, celebrity.parameters.id_cover, null, null, celebrity.short_url));
		// show avatar
		if (celebrity.parameters.id_avatar != "" || celebrity.parameters.id_avatar != null) {
			$('#'+celebrity.parameters.id_avatar).mask("");
			Dajaxice.resource.dajax_resource_find(resourceAvatarCallback,{'id_resource':selected_celebrity().id_avatar, 'array_index':null, 'resource_width':145, 'resource_height':167});
		} else {
			selected_celebrity().avatar_src(default_avatar_small);
		}
		
		// show cover
		if (celebrity.parameters.id_cover != "" || celebrity.parameters.id_cover != null) {
			$('#'+celebrity.parameters.id_avatar).mask("");
			Dajaxice.resource.dajax_resource_find(resourceCoverCallback, {'id_resource':selected_celebrity().id_cover, 'array_index':null, 'resource_width': 600, 'resource_height' : 210});
		} else {
			selected_celebrity().cover_src(default_cover_large);
		}	
		alert(celebrity.id);
		postReciveIdBee(celebrity.id);
		//reciveBeeOwner(self.selected_celebrity());
	};
	
	// callback resoure avatar
	function resourceAvatarCallback(data) {	
		selected_celebrity().avatar_src("data:" + data.content_type + ";base64,"+ data.binary_content);
		$('#'+data.id_resource).unmask();
	};
	
	function resourceCoverCallback(data) {
		selected_celebrity().cover_src("data:" + data.content_type + ";base64," + data.binary_content);
		$('#'+data.id_resource).unmask();
	};
	    
}
ko.applyBindings(CelebrityViewModel(), document.getElementById("divCelebrityViewModel"));