//Variables Globales:
var selected_partner = ko.observable();
	
function PartnerViewModel() {
	var self = this;
	self.name_filter = ko.observable("");
	
	// show partner
	showPartner = function(partner) {
		selected_partner(new Partner(partner.id, partner.name,
				partner.description, null, null, partner.web_site,
				null, partner.love_counter, partner.parameters.id_avatar,
				partner.parameters.id_promotional_photo, partner.status,
				partner.parameters.id_cover, partner.facebook, partner.twitter, partner.google_plus, null, null, null));
		
		// show avatar partner
		if (partner.parameters.id_avatar != "" || partner.parameters.id_avatar != null) {
			$('#'+partner.parameters.id_avatar).mask("");
			Dajaxice.resource.dajax_resource_find(resourceAvatarPartnerCallback,{'id_resource':partner.parameters.id_avatar, 'array_index':null, 'resource_width':145, 'resource_height':167});
		} else {
			selected_partner().avatar_src(default_avatar_small);
		}
		
		// show cover partner
		if (partner.parameters.id_cover != "" || partner.parameters.id_cover != null) {
			$('#'+partner.parameters.id_avatar).mask("");
			Dajaxice.resource.dajax_resource_find(resourceCoverPartnerCallback, {'id_resource':partner.parameters.id_cover, 'array_index':null, 'resource_width': 600, 'resource_height' : 210});
		} else {
			selected_partner().cover_src(default_cover_large);
		}
		postReciveIdBee(partner.id);
		//reciveBeeOwner(self.selected_partner());
	};
	
	// callback resoure avatar partner
	function resourceAvatarPartnerCallback(data) {	
		selected_partner().avatar_src("data:" + data.content_type + ";base64,"+ data.binary_content);
		$('#'+data.id_resource).unmask();
	};
	
	// callback resoure cover partner
	function resourceCoverPartnerCallback(data) {
		selected_partner().cover_src("data:" + data.content_type + ";base64," + data.binary_content);
		$('#'+data.id_resource).unmask();
	};	    
}
ko.applyBindings(PartnerViewModel(), document.getElementById("divPartnerViewModel"));