var avatars_person = ko.observableArray();
var id_bee_session;
var edit_profile_show_url_base = "/bee/edit_profile?id=";
/**
 * Find id_bee of session
 * */
findIdSessionBeeCallback = function(id_bee){
    id_bee_session = id_bee;
};

findIdBeeSession = function(){
    Dajaxice.bee.dajax_bee_get_id(findIdSessionBeeCallback);
}();

/**
 * End find id_bee of session
 * */

function PersonViewModel() {
	var self = this;
	self.selected_person = ko.observable();
	self.selected_person_profile = ko.observable();
	self.selected_edit_person = ko.observable();
	self.email_editable = ko.observable(true);
	self.email_editing = ko.observable(false);
	self.full_name_editable = ko.observable(true);
	self.full_name_editing = ko.observable(false);
	self.current_status_heybees_editable = ko.observable(true);
	self.current_status_heybees_editing = ko.observable(false);
	
	showPerson = function() {
		findBeeById(null, findPersonCallback, null, null);
	};
	
	showPerson();
	
	showPersonProfile= function(person){	
		self.selected_person_profile(new Person(person.id, person.email, person.full_name, person.parameters, null, null , person.gender, person.love_score, person.love_coin, person.current_status_heybees, true, false, null));
		
		// Validate if person have avatar:
		if(person.parameters.id_avatar != null && person.parameters.id_avatar != "") {
			findResourceAvatarById(person.parameters.id_avatar, findAvatarBeeProfileCallback);
		}else{
			self.selected_person_profile().avatar_src(default_avatar_large);
		}
		
		// Validate if person have cover:
		if(person.parameters.id_cover != null && person.parameters.id_cover != "") {
			findResourceCoverById(person.parameters.id_cover, findCoverBeeProfileCallback);
		}else{
			self.selected_person_profile().cover_src(default_cover_large);
		}
		postReciveIdBee(person.id);
	}
	
	editPersonProfile= function(person){
		self.selected_edit_person(new Person(person.id, person.email, person.full_name, person.parameters, null , null , person.gender, person.love_score, person.love_coin, person.current_status_heybees, true, false, null));
		
		// Validate if person have avatar:
		if(person.parameters.id_avatar != null && person.parameters.id_avatar != "") {
			findResourceAvatarById(person.parameters.id_avatar, findAvatarBeeEditProfileCallback);
		}else{
			self.selected_edit_person().avatar_src(default_avatar_large);
		}
		
		// Validate if person have cover:
		if(person.parameters.id_cover != null && person.parameters.id_cover != "") {
			findResourceCoverById(person.parameters.id_cover, findCoverBeeEditProfileCallback);
		}else{
			self.selected_edit_person().cover_src(default_cover_large);
		}
	}	
	
	// Find a resource by id Callback:
	function findPersonCallback(data){
		self.selected_person(new Person(data.id, data.email, data.full_name, data.parameters, null, null, data.gender, data.love_score, data.love_coin, data.current_status_heybees, true, false, null));
		
		// Validate if person have avatar:
		if(data.parameters.id_avatar != null && data.parameters.id_avatar != "") {
			findResourceAvatarBeeSession(0,data.parameters.id_avatar,200,200);
			findResourceAvatarBeeSession(1,data.parameters.id_avatar,40,40);
			findResourceAvatarBeeSession(2,data.parameters.id_avatar,30,30);
		}else{
			self.selected_person().avatar_src(default_avatar_large);
			$("#ImgAvatar").attr('src', default_avatar_small);
		}
		
		// Validate if person have cover:
		if(data.parameters.id_cover != null && data.parameters.id_cover != "") {
			findResourceCoverById(data.parameters.id_cover, findCoverBeeSessionCallback);
		}else{
			self.selected_person().cover_src(default_cover_large);			
		}
		$("#linkViewProfile").attr("href",edit_profile_show_url_base + data.id);
	};
	
	
	// Find a resource by id and type:
	findResourceAvatarBeeSession = function(index,id_resource,resource_width,resource_height){
		Dajaxice.resource.dajax_resource_find(findResourceAvatarBeeSessionCallback,
					{'id_resource' : id_resource, 'array_index': index,
					 'resource_width': resource_width, 'resource_height' : resource_height});
		
	};
	// Find a avatar by id Callback:
	function findResourceAvatarBeeSessionCallback(data){
		avatars_person()[data.array_index] = 'data:'+data.content_type+';base64,'+data.binary_content;
		if (data.array_index == 0){
			self.selected_person().avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
			$("#ImgAvatar").attr('src', self.selected_person().avatar_src());
			$("#image-avatar-wrapper").attr("src",self.selected_person().avatar_src());
		}
	};
	
	// Find a resource by id:
	findResourceAvatarById = function(id_resource, callback){
		Dajaxice.resource.dajax_resource_find(callback,
					{'id_resource' : id_resource, 'array_index': null,
					 'resource_width': 200, 'resource_height' : 200});
		
	};
	// Find a avatar by id Callback:
	function findAvatarBeeProfileCallback(data){
		self.selected_person_profile().avatar_src('data:'+data.content_type+';base64,'+data.binary_content);		
	};
	
	// Find a avatar by id Callback:
	function findAvatarBeeEditProfileCallback(data){
		self.selected_edit_person().avatar_src('data:'+data.content_type+';base64,'+data.binary_content);		
	};
	
	findResourceCoverById = function(id_resource, callback){
		Dajaxice.resource.dajax_resource_find(callback,
				{'id_resource' : id_resource, 'array_index': null,
				 'resource_width': null, 'resource_height' : null});
		
	};
	
	// Find a cover by id Callback:
	function findCoverBeeSessionCallback(data){
		self.selected_person().cover_src('data:'+data.content_type+';base64,'+data.binary_content);
		$("#image-cover-wrapper").attr("src",'data:'+data.content_type+';base64,'+data.binary_content);
	};
	
	function findCoverBeeProfileCallback(data){
		self.selected_person_profile().cover_src('data:'+data.content_type+';base64,'+data.binary_content);
	};
	
	function findCoverBeeEditProfileCallback(data){
		self.selected_edit_person().cover_src('data:'+data.content_type+';base64,'+data.binary_content);
	};
	
    editCurrentStatus = function() {
		clearGlobalsVariables();
		document.getElementById("p_currentStatus").style.display = "none";
		document.getElementById("inputCurrentStatus").hidden = false;
		$("#inputCurrentStatus").keyup(function(event){
		    if(event.keyCode == 13){
		    	document.getElementById("p_currentStatus").style.display = "inline";
		    	document.getElementById("inputCurrentStatus").hidden = true;
		    	console.log(document.getElementById("inputCurrentStatus").value);
		    	updateAttributePerson("current_status_heybees", document.getElementById("inputCurrentStatus").value);
		    }
		});
    };
	
    editEmailSeeTextbox = function(){
		self.email_editing(true);
    };
    
    editFullNameSeeTextbox = function(){
    	self.full_name_editing(true);
    	document.getElementById("inputFullName").focus();
    };
    
    editCurrentStatusHeybeesSeeTextbox = function(){
    	self.current_status_heybees_editing(true);
    	document.getElementById("inputCurrentStatusHeybees").focus();
    };
    
    editFullName = function(person, e){
    	if(e.keyCode == 13){    	
    		updateAttributePerson("full_name", person.full_name());
    		self.full_name_editing(false);
    		self.selected_person().full_name(person.full_name());
    	}
    	return true;
    };
    
    editCurrentStatusHeybees = function(person, e){
    	if(e.keyCode == 13){    	
    		updateAttributePerson("current_status_heybees", person.current_status_heybees());
    		self.current_status_heybees_editing(false);
    		self.selected_person().current_status_heybees(person.current_status_heybees());
    	}
    	return true;
    }; 
    
	updateAttributePerson = function(attribute, value){
		Dajaxice.bee.dajax_bee_update_attribute(updateAttributePersonCallback, 
					{'attribute' : attribute, 'value': value});
	};
	
	// Save an avatar the person
	updateAvatar = function() {
		$('#updateAvatar').mask("");
		var avatar = null;
		previewImage(document.getElementById("avatarInput"));
		setTimeout(function() {
			if (getFileName() != null) {
				var avatar = {
						'name' : getFileName(),
						'text' : 'Upload from frontend',
						'binary_content' : src_avatar_cropper, //parametro proviene de main.js src de avatar cortado
						'content_type' : getFileMimeType()
					};
				Dajaxice.bee.dajax_bee_avatar_update(updateAvatarPersonCallback, 
						{'resource' : avatar});
			}
    	}, 1000);
	}
	
	// Save an cover the person
	updateCover = function() {
		$('#updateCover').mask("");
		var cover = null;
		previewImage(document.getElementById("coverInput"));
		setTimeout(function() {
			if (getFileName() != null) {
				var cover = {
						'name' : getFileName(),
						'text' : 'Upload from frontend',
						'binary_content' : src_cover_cropper, //parametro proviene de main.js src de cover cortado
						'content_type' : getFileMimeType()
					};
				Dajaxice.bee.dajax_bee_cover_update(updateCoverPersonCallback, 
						{'resource' : cover});
			}
    	}, 1000);
	}
	
	// Update Attribute of Person Callback:
	function updateAttributePersonCallback(data){
		console.log(data);
	};
	
	// Update Avatar of Person Callback:
	function updateAvatarPersonCallback(data){
		$('#updateAvatar').unmask();
		if ('error' in data) {
			alert(data.error);
		}else{
		    if(location.href.indexOf("/bee/edit/profile") != -1){
		    	self.selected_edit_person().avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
		    }else{
		    	self.selected_person().avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
		    }
			editAvatarModal.modal('hide');
		}
	};
	
	// Update Cover of Person Callback:
	function updateCoverPersonCallback(data){
		$('#updateCover').unmask();
		if ('error' in data) {
			alert(data.error);
		}else{
			if(location.href.indexOf("/bee/edit_profile") != -1){
				self.selected_edit_person().cover_src('data:'+data.content_type+';base64,'+data.binary_content);
			}else{
				self.selected_person().cover_src('data:'+data.content_type+';base64,'+data.binary_content);
			}
			editCoverModal.modal('hide')
		}
	};
	
    // Update the Bee Person love_score and love_coin attributes to the View:
    // trigger: Love action
    personUpdateScoreAndCoinForView = function (love_score, love_coin){
        self.selected_person().love_score(love_score);
        self.selected_person().love_coin(love_coin);
    }
}
ko.applyBindings(PersonViewModel(), document.getElementById("divPersonViewModel"));