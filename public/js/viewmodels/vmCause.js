//Variables Globales:
var causes = ko.observableArray([]);
var cause_show_url_base = "/causes/show?id=";
var object_type = "BEE"; //para compartir con twitter (por defecto objecto cause tipo "BEE")
	
function CauseViewModel() {
	var self = this;
	self.selected_cause = ko.observable();
	self.selected_partner = ko.observable();
	self.selected_celebrity = ko.observable();
	self.cause_page_number = 1;
	self.cause_page_size = 7;
	self.name_filter = ko.observable("");
	self.loveMeterPercentage = ko.observable(0);
	
	causeFindAll = function() {
		Dajaxice.cause.dajax_cause_find_all(causeFindAllCallback, {
			'name_filter' : self.name_filter(),
			'level_data' : 0,
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
			var cause_partner = {"id_partner" : "", "name" : "Disponible", "description" : "", "id_resource" : ""};
			var cause_celebrity = {"id_celebrity" : "", "name" : "Disponible", "description" : "", "id_resource" : ""};
			// Validate if cause have partner:
			if (cause.partners.length > 0) {
				//DEFINIR CRITERIO DE SELECCION DE PARTNER PARA MOSTRAR
				cause_partner.id_partner = cause.partners[0].id;
				cause_partner.name = cause.partners[0].name;
				cause_partner.description = cause.partners[0].description;
				cause_partner.id_resource = cause.partners[0].id_avatar;
			}
			// Validate if cause have celebrity:
			if (cause.celebrities.length > 0) {
				//DEFINIR CRITERIO DE SELECCION DE CELEBRITY PARA MOSTRAR
				cause_celebrity.id_celebrity = cause.celebrities[0].id;
				cause_celebrity.name = cause.celebrities[0].name;
				cause_celebrity.description = cause.celebrities[0].description;
				cause_celebrity.id_resource = cause.celebrities[0].id_avatar;
			}

			// Calculate love percentages:
			love_goal_percentage = (cause.love_counter * 100)/ cause.love_goal;
			love_goal_percentage = (love_goal_percentage.toFixed(2));
			
			// Definition of the cause url:
			show_url = cause_show_url_base + cause.id_cause;
			// Add cause on the cause array:
			causes.push(new Cause(cause.id_cause, cause.name,
					cause.description+"...", cause.goal,
					cause.id_subscope, cause.sub_scope,
					cause.love_counter, cause.fly_counter, cause.start_date,
					cause.closing_date, cause.love_meter,
					cause.love_goal, cause.beneficiary,
					cause.risk_classification,
					cause.url_promotional_video, cause_promotional_photo_src,
					cause.color, cause.partners, cause.celebrities, cause_partner, 
					cause_celebrity,cause.parameters,show_url,cause.love_refs,cause.short_url));

            // Visually determines whether it has already done the action love about this cause:
            if (cause.love_refs.indexOf(id_bee_session) != -1){
                causes()[causes().length-1].love_action_class("love");
            }

			// Validate if cause have avatar:
			if (cause.parameters.id_promotional_photo != null && cause.parameters.id_promotional_photo != "") {
				findResourceById(cause.parameters.id_promotional_photo, cause_index, "promotional_photo");
			}
			// Validate if cause partner have avatar:
			if (cause.partners.length > 0) {
				if (cause_partner.id_resource != ""){
					findResourceById(cause_partner.id_resource, cause_index, "partner_avatar");
				}
			}
			// Validate if cause celebrity have avatar:
			if (cause.celebrities.length > 0) {
				if (cause_celebrity.id_resource != ""){
					findResourceById(cause_celebrity.id_resource, cause_index, "celebrity_avatar");
				}
			}

	    	if(readCookie('bsdrwefge')!=null){
	    		for (var j = 0; j < causes()[cause_index].love_refs()[0].length; j++) {
	    			if (causes()[cause_index].love_refs()[0][j].id == readCookie('bsdrwefge')) {
	    				causes()[cause_index].status_love('love');
	    				break;
	    			}
	    		}	
	    	}
			// Increase the causes array index:
			cause_index++;
			});
	};

	// show cause:
	showCauseDetails = function(cause) {
		var cause_promotional_photo_src = default_promotional_photo_267x167;
		var cause_partner = {"id_partner" : "","name" : "Disponible","description" : "", "id_resource" : "", "avatar_src" : default_avatar_large};
		var cause_celebrity = {"id_celebrity" : "","name" : "Disponible","description" : "", "id_resource" : "", "avatar_src" : default_avatar_large};
		
		// Validate if cause have partner:
		if (cause.partners.length > 0) {
			//DEFINIR CRITERIO DE SELECCION DE PARTNER PARA MOSTRAR
			cause_partner.id_partner = cause.partners[0].id;
			cause_partner.name = cause.partners[0].name;
			cause_partner.description = cause.partners[0].description;
			cause_partner.id_resource = cause.partners[0].id_avatar;
		}
		// Validate if cause have celebrity:
		if (cause.celebrities.length > 0) {
			//DEFINIR CRITERIO DE SELECCION DE CELEBRITY PARA MOSTRAR
			cause_celebrity.id_celebrity = cause.celebrities[0].id;
			cause_celebrity.name = cause.celebrities[0].name;
			cause_celebrity.description = cause.celebrities[0].description;
			cause_celebrity.id_resource = cause.celebrities[0].id_avatar;
		}
		
		// Definition of the cause url:
		show_url = cause_show_url_base + cause.id_cause;
		
		// Save the cause:		
		self.selected_cause(new Cause(cause.id_cause, cause.name,
					cause.description+"...", cause.goal,
					cause.id_subscope, cause.sub_scope,
					cause.love_counter, cause.fly_counter, cause.start_date,
					cause.closing_date, cause.love_meter,
					cause.love_goal, cause.beneficiary,
					cause.risk_classification,
					cause.url_promotional_video, cause_promotional_photo_src,
					cause.color, cause.partners, cause.celebrities, cause_partner,
					cause_celebrity,cause.parameters,show_url,cause.love_refs,cause.short_url));

		// Visually determines whether it has already done the action love about this cause:
        if (self.selected_cause().love_refs.indexOf(id_bee_session) != -1){
            self.selected_cause().love_action_class("love");
        }

        // Visually determines whether it has already done the action love about this cause:
        /*if (cause.love_refs.indexOf(id_bee_session) != -1){
            causes()[causes().length-1].love_action_class("love");
        }*/
		
		// Validate if cause partner have avatar:
		if (cause.partners.length > 0) {
			if (cause_partner.id_resource != ""){
				findResourceById(cause_partner.id_resource, -1, "partner_avatar");
			}
		}
		// Validate if cause celebrity have avatar:
		if (cause.celebrities.length > 0) {
			if (cause_celebrity.id_resource != ""){
				findResourceById(cause_celebrity.id_resource, -1, "celebrity_avatar");
			}
		}
		//Progress bar
		self.loveMeterPercentage((self.selected_cause().love_meter() * 100)/self.selected_cause().love_goal());
		
		//Awards cause
		postReciveIdBee(cause.id_cause);
    	reciveBee(self.selected_cause());
	};
	
	// Find a resource by id:
	findResourceById = function(id_resource, cause_index, type){
		$('#'+id_resource).mask("");
		if (type == "promotional_photo"){

			Dajaxice.resource.dajax_resource_find(findCausePromotionalPhotoCallback, 
					{'id_resource' : id_resource, 'array_index': cause_index,
					 'resource_width': 240, 'resource_height' : 150});
		}else if (type == "partner_avatar"){
			Dajaxice.resource.dajax_resource_find(findCausePartnerAvatarCallback, 
					{'id_resource' : id_resource, 'array_index': cause_index,
					 'resource_width': 212, 'resource_height' : 242});
		}else if (type == "celebrity_avatar"){
			Dajaxice.resource.dajax_resource_find(findCauseCelebrityAvatarCallback, 
					{'id_resource' : id_resource, 'array_index': cause_index,
					 'resource_width': 212, 'resource_height' : 242});
		}
	};
	
	//FUNCION PARA PRUEBA DE TIEMPO FUERA
	var time_out = 1000;
	esperar = function(data){
		setTimeout(function() {
			findCauseCelebrityAvatarCallback(data);
		}, time_out);
		time_out+=1000;
	};
	//************************
	
	// Find a resource by id Callback:
	function findCausePromotionalPhotoCallback(data){
		if (data.array_index != -1){
			causes()[data.array_index].promotional_photo_src('data:'+data.content_type+';base64,'+data.binary_content);
		}else{
			self.selected_cause().promotional_photo_src('data:'+data.content_type+';base64,'+data.binary_content);
		}
		$('#'+data.id_resource).unmask();
	};
	
	// Find a resource by id Callback:
	function findCausePartnerAvatarCallback(data){
		if (data.array_index != -1){
			causes()[data.array_index].partner.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
		}else{
			self.selected_cause().partner.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
		}
		$('#'+data.id_resource).unmask();
	};
	// Find a resource by id Callback:
	function findCauseCelebrityAvatarCallback(data){
		if (data.array_index != -1){
			causes()[data.array_index].celebrity.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
		}else{
			self.selected_cause().celebrity.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
		}
		$('#'+data.id_resource).unmask();
	};
	
    // Function for selects a cause list to give fly action
    shareCause = function(cause) {
		self.selected_cause(cause);
    };

    // ##############################################################################################
    // ##################### CAUSE FLY ACTION WITH FACEBOOK #################################################
    // Function for make a FLY Action on a Cause with Facebook
    shareCauseWithFacebook = function(){
        showStream(self.selected_cause().name, self.selected_cause().description,self.selected_cause().parameters.id_promotional_photo, 'www.social.heybees.com' + self.selected_cause().show_url, self.selected_cause().id_cause, "BEE", causes.indexOf(self.selected_cause()));
    }
    
    shareCauseWithLinkedin = function() {
		shareLinkedin("BEE", causes.indexOf(self.selected_cause()));
    };
    
    shareCauseWithTwitter=function(){
       object_type = "BEE";
       var href="https://twitter.com/intent/tweet?text=Ayuda+a+esta+causa : "+self.selected_cause().name+"&url="+self.selected_cause().short_url;
       console.log(href);
       var a = document.getElementById('shareTwitterCause'); //or grab it by tagname etc
       a.href = href;
    };

    // #########################################################################################
    // ##################### CAUSE LOVE ACTION #################################################
    // Function for make a Love Action on a Cause
    causeLoveAction = function(cause) {
		self.selected_cause(cause);
        operationLoveAction(cause.id_cause,"BEE", causeLoveActionCallback, causes.indexOf(cause), null);
    };
    function causeLoveActionCallback(data){
        if ("error" in data){
            console.log(data.error);
        }
        else{
            // Update the visual attributes of the bee:
            personUpdateScoreAndCoinForView(data.bee_love_score, data.bee_love_coin);
            if (data.target_love_meter != ""){
                // Increment Cause love_meter if is necessary:
                causeUpdateLoveMeterForView(data.target_love_meter);
            }
            if (data.array_index_i != -1){
                causes()[data.array_index_i].love_counter(causes()[data.array_index_i].love_counter() + 1);
                causes()[data.array_index_i].love_action_class("love");
            }else{
                self.selected_cause().love_counter(self.selected_cause().love_counter() + 1);
                self.selected_cause().love_action_class("love");
            }

            //alert(causes()[data.array_index_i].partner.name() +" love too!");
        }
    }// end love action
    // ##############################################################################################

    //Function that increments the fly counter of a selected cause in sight
    increase_fly_cause_on_view = function() {
		self.selected_cause().fly_counter(self.selected_cause().fly_counter() + 1);
    };
    
    //Function that increments the love counter of a selected cause in sight
    increase_love_cause_on_view = function() {
		self.selected_cause().love_counter(self.selected_cause().love_counter() + 1);
		self.selected_cause().status_love('love');		
    };
    
    showCausesLocations = function(data) {
    	data.content.forEach(function(cause) {
    		locationReceived(cause.geographic_location[0],cause.geographic_location[1],cause.name, cause.description, cause.short_url,cause.parameters.id_avatar);
    	});
    	setTimeout('showMarkers()', 2000);
    }

    // Find basic information about the partner
    previewPartnerProfile = function(cause){
        self.selected_cause(cause);
        findBeeById(cause.partner.id_partner(), previewPartnerProfileCallback, causes.indexOf(cause), null);
    }

    // Find the bee
    function previewPartnerProfileCallback(partner){
    	self.selected_partner("");
    	self.selected_partner(new Partner (partner.id, partner.name, partner.description,null, null, null,null,partner.love_counter, null,null, 
    			partner.status, null, null,null, null,default_avatar_large, null, null));

        // find partner avatar:
		if (partner.parameters.avatar != "" && partner.parameters.avatar != null) {
			findAvatarResource(partner.parameters.avatar, 0, 60, 60);
		}else {
			self.selected_partner().avatar_src(default_avatar_large);
		}
        // find partner cover:
		if (partner.parameters.cover != "" && partner.parameters.cover != null) {
			findCoverResource(partner.parameters.cover, 0, 60, 60);
		}else {
			self.selected_partner().cover_src(default_cover_large);
		}			
    }
 // Find basic information about the partner
    previewCelebrityProfile = function(cause){
        self.selected_cause(cause);
        findBeeById(cause.celebrity.id_celebrity(), previewCelebrityProfileCallback, causes.indexOf(cause), null);
    }

    // Find the bee
    function previewCelebrityProfileCallback(celebrity){
    	self.selected_celebrity("");
    	self.selected_celebrity(new Celebrity (celebrity.id, celebrity.name, celebrity.description,null, null, null,null,null, null, 
    			null, null, default_avatar_large, default_cover_large, null));

        // find partner avatar:
		if (celebrity.parameters.id_avatar != "" && celebrity.parameters.id_avatar != null) {
			findAvatarResource(celebrity.parameters.id_avatar, 1, 60, 60);
		}else {
			self.selected_celebrity().avatar_src(default_avatar_large);
		}
        // find partner cover:
		if (celebrity.parameters.id_cover != "" && celebrity.parameters.id_cover != null) {
			findCoverResource(celebrity.parameters.id_cover, 1, 60, 60);
		}else {
			self.selected_celebrity().cover_src(default_cover_large);
		}			
    }
    
    // Find avatar resource for partner preview profile:
    findAvatarResource = function(id_avatar, array_index, resource_width, resource_height){
        Dajaxice.resource.dajax_resource_find(findAvatarResourceCallback,
                            {'id_resource': id_avatar, 'array_index': array_index,
                             'resource_width': resource_width,
                             'resource_height': resource_height});
    };
    
    // Find cover resource for partner preview profile:
    findCoverResource = function(id_cover, array_index, resource_width, resource_height){
        Dajaxice.resource.dajax_resource_find(findCoverResourceCallback,
                            {'id_resource': id_cover, 'array_index': array_index,
                             'resource_width': resource_width,
                             'resource_height': resource_height});
    };
    
	function findAvatarResourceCallback(data) {
		if(data.array_index == 0){
			self.selected_partner().avatar_src("data:" + data.content_type + ";base64," + data.binary_content);
		}else if(data.array_index == 1){
			self.selected_celebrity().avatar_src("data:" + data.content_type + ";base64," + data.binary_content);
		}
		
	}; // end
	
	function findCoverResourceCallback(data) {
		if(data.array_index == 0){
			self.selected_partner().cover_src("data:" + data.content_type + ";base64," + data.binary_content);
		}else if(data.array_index == 1){
			self.selected_celebrity().cover_src("data:" + data.content_type + ";base64," + data.binary_content);
		}
	}; // end
    
    if(location.href.indexOf("/show?id=") == -1){
    	causeFindAll();
    }

    // Update the Cause love_meter in the View:
    // trigger: Love action
    causeUpdateLoveMeterForView = function(love_meter){
        self.selected_cause().love_meter(love_meter);
    }
    
}
// ko.applyBindings(new CauseViewModel());
ko.applyBindings(CauseViewModel(), document.getElementById("divCauseViewModel"));