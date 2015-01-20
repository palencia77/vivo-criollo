var awards = ko.observableArray([]);
var awardResources = ko.observableArray([]);
var awardSelected = ko.observable();

function AwardViewModel(){
	var self = this;
	self.award_page_number = 1;
	self.award_page_size = 15;
	self.award_resource_page_number = 1;
	self.award_resource_page_size = 15;
	self.selectedAward = ko.observable();
	self.selectedBee = ko.observable();
	self.resourceList = ko.observable();
	self.selectedResource = ko.observable();
	self.resourceIndexList = 0;
	self.resourcePreview = ko.observable();
	self.resourcesToRemove = new Array(); // For update award operation
	self.resourcesToAdd = new Array(); // For update award operation
	var status = "ACTIVE";
	self.name_filter_award = ko.observable("");

	reciveBeeOwner = function(bee){
   		self.selectedBee(bee);
   		findAwardsByBeeOwner();   		
   	}
   	
    /* Find awards by bee Owner */
    findAwardsByBeeOwner = function(){
    	$("#awardListModal").mask(loading);
    	showModalAwardList();
    	if (self.selectedBee().id_cause != null){
    	Dajaxice.award.dajax_award_find_by_bee(awardFindByBeeOwnerCallback, {'page_number': self.award_page_number,
    																	 'page_size' : self.award_page_size,
    																	 'id_bee' : self.selectedBee().id_cause,
    																	 'status': status});
    	}else if (self.selectedBee().id_celebrity != null){
    		Dajaxice.award.dajax_award_find_by_bee(awardFindByBeeOwnerCallback, {'page_number': self.award_page_number,
				 'page_size' : self.award_page_size,
				 'id_bee' : self.selectedBee().id_celebrity, 'status': status });
   			
   		}else{
    		Dajaxice.award.dajax_award_find_by_bee(awardFindByBeeOwnerCallback, {'page_number': self.award_page_number,
				 'page_size' : self.award_page_size,
				 'id_bee' : self.selectedBee().id_partner, 'status':status });    		
    	}
    	defaultTab("tabDataAward");    	
    };
    
    function awardFindByBeeOwnerCallback(data){
		awards.removeAll();
		data.content.forEach(function(award) {
			awards.push(new Award(award.id_award, award.title, award.text, award.owner,
                        award.resource_refs, award.quantity, award.status, award.amount_love,
                        award.fly_counter, null,null,null));
		});
		$("#awardListModal").unmask();
	};
	/* End find awards by bee Owner */
       
    
    /* Awards by bee association */	
	reciveBee = function(bee){
		self.selectedBee(bee);
		findAwardsByBee();   		
	} 
		
	findAwardsByBee = function (){
		//$("#awardsByBee").mask(loading);
		if(self.selectedBee().id_cause != null){
		Dajaxice.award.dajax_award_bee_association_find(
				findAwardsByBeeCallback, {
					'id_bee' : self.selectedBee().id_cause,
					'associated': "True",
					'name_filter': self.name_filter_award(),
					'page_number': 1,
					'page_size': 1000										
				});
		}
	};		
	
	function findAwardsByBeeCallback(data) {
		//$("#awardsByBee").unmask();
		var awards_index=0;
		awards.removeAll();
		data.content.forEach(function(award) {
			awards.push(new Award(award.id_award, award.title,award.text,award.owner,
					null,award.resource_refs,null,null,award.fly_counter, null,null,null));
			findAwardPromotionalResource(awards_index,award);
			awards_index++;
		});
	};
	
	findAwardPromotionalResource = function(awards_index, award){
		if (award.resource_refs.length > 0){
			Dajaxice.resource.dajax_resource_find(findAwardPromotionalCallback, {'id_resource' : award.resource_refs[0], 'array_index': awards_index,
                                                                         'resource_width': 360, 'resource_height': 480});
		}
	};
	function findAwardPromotionalCallback(data){
		awards()[data.array_index].avatar_src('data:'+data.content_type+';base64,'+data.binary_content);		
	};	
	/* End awards by bee association */

    // Find awards by status
    findAwardsByStatus = function(){
        Dajaxice.award.dajax_award_find_by_status(
				findAwardsByStatusCallback, {
					'status' : status,
					'name_filter': self.name_filter_award(),
					'page_number': self.award_page_number,
					'page_size': self.award_page_size
				});
    }
    function findAwardsByStatusCallback(data){
        awards.removeAll();
        if (data.content.length > 0){
            data.content.forEach(function(award) {
                awards.push(new Award(award.id_award, award.title, award.text, award.owner,
                        award.resource_refs, award.quantity, award.status, award.amount_love,
                        award.fly_counter,null,null,null));
                findAwardPromotionalResource(awards().length-1,award);
                // find celebrity avatar:
                if (award.owner.id_avatar != "" || award.owner.id_avatar != null) {
                    findAvatarResource(award.owner.id_avatar, awards().length-1, 30, 30);
                }
            });
        }
    }

    // Find basic information about the bee
    previewBeeProfile = function(award){
        self.selectedAward(award);
        findBeeById(award.owner.id(), previewBeeProfileCallback, awards.indexOf(award), null);
    }

    // Find the bee
    function previewBeeProfileCallback(bee){
        self.selectedAward().selected_bee("");
        if (bee.bee_type == "Partner"){
            // Instantiate a bee Partner:
            self.selectedAward().selected_bee(new Celebrity(bee.id, bee.name, bee.description, null,
                                                bee.web_site, bee.facebook, bee.twitter, bee.google_plus,
                                                bee.parameters.id_avatar, bee.parameters.id_promotional_photo,
                                                bee.parameters.id_cover, null, null, bee.short_url));
        }else if (bee.bee_type == "Celebrity"){
            // Instantiate a bee Celebrity:
            self.selectedAward().selected_bee(new Partner(bee.id, bee.name, bee.description, null, null,
                                               null, null, bee.love_counter, bee.parameters.id_avatar,
                                               bee.parameters.id_promotional_photo, bee.status,
                                               bee.parameters.id_cover, null, null, null, null, null, null));
        }
        // find bee avatar:
		if (bee.parameters.id_avatar != "" || bee.parameters.id_avatar != null) {
			findBeeAvatarResource(bee.parameters.id_avatar, null, 60, 60);
		} else {
			self.selectedAward().selected_bee().avatar_src(default_avatar_small);
		}
		// find bee cover:
		if (bee.parameters.id_cover != "" || bee.parameters.id_cover != null) {
            findBeeCoverResource(bee.parameters.id_cover, null, 90, 40);
		} else {
			self.selectedAward().selected_bee().cover_src(default_cover_large);
		}
    }

    // Used from cause view model:
    findPostOwnerAvatar = function(posts_index, id_avatar){
		Dajaxice.resource.dajax_resource_find(findPostOwnerAvatarCallback, {'id_resource' : id_avatar, 'array_index': posts_index, 'resource_width': 40, 'resource_height': 40});
	};
	function findPostOwnerAvatarCallback(data){
		posts()[data.array_index].owner.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
	}; // end

    // Find avatar resource of the award list:
    findAvatarResource = function(id_avatar, array_index, resource_width, resource_height){
        Dajaxice.resource.dajax_resource_find(findAvatarResourceCallback,
                            {'id_resource': id_avatar, 'array_index': array_index,
                             'resource_width': resource_width,
                             'resource_height': resource_height});
    };
	function findAvatarResourceCallback(data) {
        if ("error" in data){
            alert(data.error);
        }else{
            awards()[data.array_index].owner.avatar_src("data:" + data.content_type + ";base64,"+ data.binary_content);
        }
	}; // end

    // Find avatar resource for celebrity preview profile:
    findBeeAvatarResource = function(id_avatar, array_index, resource_width, resource_height){
        Dajaxice.resource.dajax_resource_find(findBeeAvatarResourceCallback,
                            {'id_resource': id_avatar, 'array_index': array_index,
                             'resource_width': resource_width,
                             'resource_height': resource_height});
    };
	function findBeeAvatarResourceCallback(data) {
		self.selectedAward().selected_bee().avatar_src("data:" + data.content_type + ";base64," + data.binary_content);
	}; // end

    // Find cover resource for celebrity preview profile:
    findBeeCoverResource = function(id_cover, array_index, resource_width, resource_height){
       Dajaxice.resource.dajax_resource_find(findBeeCoverResourceCallback,
                          {'id_resource': id_cover,
                           'array_index': array_index, 'resource_width': resource_width,
                           'resource_height' : resource_height});
    };
	function findBeeCoverResourceCallback(data) {
		self.selectedAward().selected_bee().cover_src("data:" + data.content_type + ";base64," + data.binary_content);
	}; // end
	
	purchaseAward = function(award){
		$('#btnPurchaseAward').attr('disabled','disabled');
        self.selectedAward(award);
        Dajaxice.award.dajax_award_purchase(
        		purchaseAwardCallback, {
        			'id_award' : award.id_award
				});
    }
	
	function purchaseAwardCallback(data){
		console.log(data);
		if(data.message == "ok"){
			alert("El premio ha sido canjeado, te hemos enviado un correo con la información del mismo.");
		}
		else if(data.error == "Love coins insufficient for purchase"){
			alert("Lo sentimos, no tiene suficientes love coins para canjear este premio.")
		}
		$('#btnPurchaseAward').removeAttr('disabled');
	}

    // Function that hold the award selected from the list to be showed
	showAward = function(award) {
		self.selectedAward(award);
        self.selectedAward().resources_src.removeAll();
        findAwardReources(null, award);
	};
	
    // find all resources of an Award to show in Awards Detail Section
    findAwardReources = function(awards_index, award){
		for (var i= 0; i < award.resource_refs.length; i++){
			Dajaxice.resource.dajax_resource_find(findAwardResourcesCallback, {'id_resource' : award.resource_refs[i], 'array_index': awards_index,
                                                                               'resource_width': 360, 'resource_height': 480});
		}
	};
	function findAwardResourcesCallback(data){
        var carouselResource = {
            'src': 'data:'+data.content_type+';base64,'+data.binary_content,
            'alt': '',
            'content': ''};
        self.selectedAward().resources_src.push(carouselResource);
	}; // end
	
    // ##################### SHARE AWARD WITH SOCIAL NETWORKS #################################################
    shareAward = function(award) {
		self.selectedAward(award);
    };

    // ##############################################################################################
    // Function for make a FLY Action on a award with Facebook
    shareAwardWithFacebook = function(){
        showStream(self.selectedAward().title, self.selectedAward().text,self.selectedAward().resource_refs[0], "www.social.heybees.com/awards", self.selectedAward().id_award, "AWARD", awards.indexOf(self.selectedAward()));
    }
    
    // Function for make a FLY Action on a award with Linkedin
    shareAwardWithLinkedin = function() {
		shareLinkedin("AWARD", awards.indexOf(self.selectedAward()));
    };
    
    // Function for make a FLY Action on a award with Twitter
    shareAwardWithTwitter=function(){
       object_type = "AWARD";
       awardSelected(self.selectedAward());
       var href="https://twitter.com/intent/tweet?text=Haz compartido un premio : "+self.selectedAward().title +" , dale un vistazo aquí: &url=http://www.social.heybees.com/awards";
       var a = document.getElementById('shareTwitterAward'); //or grab it by tagname etc
       a.href = href;
    };
    // End FLY Action on the award
}
ko.applyBindings(new AwardViewModel(), document.getElementById("awardViewModel"));