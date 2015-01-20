// Globals variables:
var posts = ko.observableArray([]);
var URL_VIEW_POST = "http://www.social.heybees.com/post/show?id=";
var show_url_post = ko.observable("");

function TimelineViewModel() {
	var self = this;
	self.timeline_page_number = 1;
	self.timeline_page_size = 10;
	self.selected_post = ko.observable();
	self.new_post = ko.observable();
	self.post_selected_cause = ko.observable(); // Para fly (eliminar si no se llega a user)
	self.selected_comment = ko.observable();
	self.id_bee_session = "";
	self.resourcePreview = ko.observable();
	self.post_is_lastpage = ko.observable(true);
	
	/**
	 * Find id_bee of session
	 * */
	findIdSessionBeeCallback = function(id_bee){
		self.id_bee_session = id_bee;
	};
	
	findIdBeeSession = function(){
		Dajaxice.bee.dajax_bee_get_id(findIdSessionBeeCallback);
	}();
	//findIdBeeSession();
    /**
	 * End find id_bee of session
	 * */
	
	
	/**
	 *Crud Post 
	 */
	uploadImage = function(input) {
		//Initialization:
		typeExtension = "image";
		inputName = input.name;
		element = encodeURIComponent(document.getElementsByName(inputName)[0].value);
		
		if (!checkFileExtension(element, typeExtension, inputName, null)) {
			return false;
		}
		if (input.files && input.files[0]) {			
//			if (input.files[0].size > 1024 * 1024)
//			      fileSize = (Math.round(input.files[0].size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
//			    else
//			      fileSize = (Math.round(input.files[0].size * 100 / 1024) / 100).toString() + 'KB';
			
			var reader = new FileReader();
			reader.onload = function(e) {
				self.new_post().resources_src.removeAll();
				src = e.target.result;
				//binary content
				binaryContent = src.substr(src.indexOf(',') + 1);
				//content type
				var auxFileMimeType = src.substr(0, src.indexOf(';'));
				contentType = auxFileMimeType.substr(auxFileMimeType.indexOf(':') + 1);
				//file name
				var auxFileName = (document.getElementsByName(inputName)[0].value).split('\\');
				fileName = auxFileName[auxFileName.length - 1];				
				self.new_post().resources_src.push(new Resource(null,src,binaryContent,contentType,"Post resource",fileName));
		        document.getElementsByName(inputName)[0].value = '';
				
			};
			reader.readAsDataURL(input.files[0]);
		}
		
	};
	
	newPost = function(){
		var owner = {"id_owner" : "", "name" : "", "id_avatar" : ""};
		self.new_post(new Post(null, null, null, owner, null, null,null, null, null, null,null, null,null,null,null,0,false,false,false));
	};
	
	createPost = function(post){
		with_resource = "False";	
		if (post.resources_src().length > 0) {
			with_resource = "True";
			post.resources_src()[0].src = "";
		};
		if(self.new_post().text() == null){
			self.new_post().text("");
		}
		
		if(self.new_post().text() != "" ||  with_resource != "False"){
			$("#newPost").mask("");
			Dajaxice.post.dajax_post_create(createPostCallback, {'title':'', 'text': self.new_post().text(), 'with_resource':with_resource, 'resources':post.resources_src()});
		}
	};
		
	createPostCallback = function(data){
		if(data.message == "ok"){
			self.selected_post(new Post(data.id_post, data.title, data.text, data.owner, data.love_counter, data.love_refs,
					data.fly_refs, null, data.resource_refs, data.fly_counter,data.created_date, data.status,null,null,null,0,true,true,false));
			if(avatars_person().length > 0){
				self.selected_post().owner.avatar_src(avatars_person()[1]);
			}	
			posts.unshift(self.selected_post());
			newPost();
			index = posts.indexOf(self.selected_post());
			findPostsResources(index, self.selected_post());
			clearGlobalsVariables();
			$("#newPost").unmask();
		}else{
			alert(data.error);
		}
	};
	
	clearResource = function(resource){
		self.new_post().resources_src.removeAll();			
	};

	deletePost = function(post){
		alertify.confirm("¿Desea eliminar la publicación?", function (e) {
			if (e) {
				self.selected_post(post);
				Dajaxice.post.dajax_post_delete(deletePostCallback, {'id_post':post.id_post});
			}
		});
    };
    
    deletePostCallback = function(data){
    	if (data.message == "ok"){   			
   			posts.remove(self.selected_post());
		}else{
			alert(data.error);
		}
    };
    
    editPostSeeTextbox = function(post){
    	post.editing(true);
    };
    
    editPost= function(post, e){
    	if(e.keyCode == 13){
    		if(post.text() == null){
    			post.text("");
    		}
    		if(post.text() == "" && post.resource_src() == null){
    			deletePost(post);    					
    		}else{
    			Dajaxice.post.dajax_post_update(editPostCallback, {'id_post':post.id_post, 'text': post.text()});
    			post.editing(false);
    		}    		
    	}
    	return true;
    };
    
    editPostCallback = function(data){
    	if ('error' in data){
   			alert(data.error);
		}
    }; 
	
	/**
	 *End crud Post 
	 */
	
	/**
	 * Show timeline posts 
	 * */
	showTimelinePosts = function(){
    	Dajaxice.bee.dajax_bee_timeline(beeTimelineCallback, {'page_number': self.timeline_page_number,
			                                                   'page_size' : self.timeline_page_size});
	};
	function beeTimelineCallback(data){
        if ('error' in data) {
            alert(data.error);
        }else{
            self.timeline_page_number++;
            self.post_is_lastpage(data.last_page);
            data.content.forEach(function (post) {
                posts.push(new Post(post.id_post, post.title, post.text, post.owner, post.love_counter, post.love_refs,
    					post.fly_refs, post.postcomment_refs, post.resource_refs, post.fly_counter,
    					post.created_date, post.status,null,null,null,0,true,false,false));
                findPostsResources(posts().length-1, post);
                findCommentByPost(posts().length-1,posts()[posts().length-1]);
                
                if(post.owner.id == self.id_bee_session){
                	posts()[posts().length-1].editable(true);
                    posts()[posts().length-1].editable(true);
                };
                
                // Visually determines whether it has already done the action love about this publication:
                if (post.love_refs.indexOf(self.id_bee_session) != -1){
                    posts()[posts().length-1].love_action_class("love");
                }
                	                               	
                if(post.owner.id_avatar != "" && post.owner.id_avatar != null){
            		if(post.owner.id == self.id_bee_session){
            			if(avatars_person().length > 0){
            				posts()[posts().length-1].owner.avatar_src(avatars_person()[1]);
            			}
            			else{
            				findPostOwnerAvatar(posts().length-1, post.owner.id_avatar);
            			}
            		}else {
                		findPostOwnerAvatar(posts().length-1, post.owner.id_avatar);
                	}
                };
               
            });
        }
	};
	
	findPostOwnerAvatar = function(posts_index, id_avatar){
		Dajaxice.resource.dajax_resource_find(findPostOwnerAvatarCallback, {'id_resource' : id_avatar, 'array_index': posts_index, 'resource_width': 40, 'resource_height': 40});
	};
	
	function findPostOwnerAvatarCallback(data){
		posts()[data.array_index].owner.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
	};
		
	findPostsResources = function(posts_index, post){
		if (post.resource_refs.length > 0){
			Dajaxice.resource.dajax_resource_find_id_of_post(resourceFindCallback, {'id_resource' : post.resource_refs[0], 'array_index': posts_index });
		}
	};
	
	function resourceFindCallback(data){
		posts()[data.array_index].resources_src.push(new Resource(data.id_resource,('data:'+data.content_type+';base64,'+data.binary_content),null,null,null,null));
	};
	
	//Preview Image Post
	previewPostResource = function(resource){
		self.resourcePreview("");
    	Dajaxice.resource.dajax_resource_find(previewPostResourceCallback, {'id_resource': resource.id_resource, 'array_index': null,'resource_width': null, 'resource_height': null});
   	};
   	previewPostResourceCallback = function(data){
   		self.resourcePreview(new Resource(data.id_resource, ('data:'+data.content_type+';base64,'+data.binary_content), null, null, null,null));
   	};
	
	/**
	 * End show timeline posts 
	 * */

	/**
     * Comment of a post
     * 
     **/
    createComment = function(post,e){
		if(e.keyCode == 13){
			if(post.new_comment() != null && post.new_comment() != ""){
				self.selected_post(post);
				Dajaxice.comment.dajax_comment_create(createCommentCallback, {'id_post': post.id_post, 'text': post.new_comment()})
			}
				
		}
		return true;
	};	
    
    createCommentCallback = function(data){
   		if (data.message == "ok"){
   			self.selected_post().new_comment(null);
   			if (data.owner.id_avatar != null && data.owner.id_avatar != ""){
   				avatar_owner = avatars_person()[2];
   			}else{
   				avatar_owner = default_avatar_medium;
   			}		
   			var comment = new Comment(data.id_comment, data.text, data.owner, data.love_counter, data.love_refs, data.created_date, data.status,true, data.id_parent,false)
   			self.selected_post().comments.push(comment);
   			var index = self.selected_post().comments.indexOf(comment);
   			self.selected_post().comments()[index].owner.avatar_src(avatar_owner);
   			
		} else{
			alert(data.error);
		}
    };
    
    getIndexPost = function(post) {
    	var index = posts.indexOf(post);
    	findCommentByPost(index,post);
    };
    
    findCommentByPost = function(index,post){ 
    	self.selected_post(post);
    	self.selected_post().comment_pagenumber = self.selected_post().comment_pagenumber + 1;
    	Dajaxice.comment.dajax_comment_find_by_post(findCommentByPostCallback, {'id_post': post.id_post,'index':index, 'page_number': self.selected_post().comment_pagenumber, 'page_size':3})
    };
    
    findCommentByPostCallback = function (data){
    	var comments_array = new Array();
    	if('error' in data){
    		alert(data.error)
    	}else{
    		data.content.forEach(function(comment) {
                if(self.id_bee_session == comment.owner.id){
                    editable = true;
                }else{
                    editable = false;
                }
                var comment_object = new Comment(comment.id_comment, comment.text, comment.owner,comment.love_counter, comment.love_refs, comment.created_date, comment.status, editable, comment.id_parent,false);
                // Visually determines whether it has already done the action love about this publication:
                if (comment.love_refs.indexOf(self.id_bee_session) != -1){
                    comment_object.love_action_class("love");
                }
                comments_array.unshift(comment_object);
                posts()[data.index].comments.unshift(comment_object);
    		});
    		findCommentOwnerAvatar(comments_array, data.index);
    		posts()[data.index].comment_is_lastpage(data.last_page);    	    	
    	}
    };  
    
     findCommentOwnerAvatar = function(comments, post_index){
    	 for(var i=0; i < comments.length; i++){
    		 if(comments[i].owner.id_avatar() != ""){
    			 findCommentOwnerAvatarDajax(comments[i].owner.id_avatar(),post_index, i);
    		 }
    		    		
    	 }    	 
     };
     
     findCommentOwnerAvatarDajax = function(id_avatar,post_index, comment_index){   
 		Dajaxice.resource.dajax_resource_find_two_index(findAvatarCommentOwnerCallback, {'id_resource': id_avatar, 'index_one': post_index, 'index_two': comment_index, 'resource_width': 30, 'resource_height': 30});
 	};
 	
 	function findAvatarCommentOwnerCallback(data){
 		if('error' in data){
    		alert(data.error);
    	}else{
    		//alert(posts()[data.index_one].comments()[data.index_two].owner_name());
    		posts()[data.index_one].comments()[data.index_two].owner.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
     	}
 	};
    
    
    deleteComment = function(comment){    	
    	alertify.confirm("¿Desea eliminar el comentario?", function (e) {
			if (e) {    	
		    	self.selected_comment(comment);
		    	Dajaxice.comment.dajax_comment_delete(deleteCommentCallback, {'id_comment': comment.id_comment});
			}
    	});
    };
    
    deleteCommentCallback = function(data){
    	if (data.message == "ok"){
   			for (var i=0; i< posts().length; i++){
   	    		if (posts()[i].id_post == self.selected_comment().id_parent()){
   	    			posts()[i].comments.remove(self.selected_comment());
   	    			break;   	    				
   	    		}
   	    	}  		
   		}else{
   			alert(data.error);
   		}
    };
    
    editCommentSeeTextbox = function(comment){
    	comment.editing(true);
    };
    
    editComment = function(comment, e){ 
    	if(e.keyCode == 13){
    		if(comment.text() == "" || comment.text() == null){
    			deleteComment(comment);
    		}else{   		    		
    			self.selected_comment(comment);    	
    			Dajaxice.comment.dajax_comment_edit(editCommentCallback, {'id_comment': comment.id_comment, 'text':comment.text()});
    			comment.editing(false);
    		}
    	}
    	return true;
    };
    
    editCommentCallback = function(data){
    	if ('error' in data){
   			alert(data.error);
		}
    };
    /**
     * End comment of a post
     * 
     **/


    /**
     * Function to show popover of preview Bee Profile
     */
    // Find basic information about the bee
    previewBeeProfile = function(post){
        self.selected_post(post);
        findBeeById(post.owner.id_owner(), previewBeeProfileCallback, posts.indexOf(post), null);
    }
    // Find the bee
    function previewBeeProfileCallback(bee){
        self.selected_post().selected_bee("");
        if (bee.bee_type == "Partner"){
            // Instantiate a bee Partner:
            self.selected_post().selected_bee(new Celebrity(bee.id, bee.name, bee.description, null,
                                                bee.web_site, bee.facebook, bee.twitter, bee.google_plus,
                                                bee.parameters.id_avatar, bee.parameters.id_promotional_photo,
                                                bee.parameters.id_cover, null, null, bee.short_url));
        }else if (bee.bee_type == "Celebrity"){
            // Instantiate a bee Celebrity:
            self.selected_post().selected_bee(new Partner(bee.id, bee.name, bee.description, null, null,
                                               null, null, bee.love_counter, bee.parameters.id_avatar,
                                               bee.parameters.id_promotional_photo, bee.status,
                                               bee.parameters.id_cover, null, null, null, null, null, null));
        }else if (bee.bee_type == "Person"){
            // Instantiate a bee Person:
            self.selected_post().selected_bee(new Person(bee.email, bee.full_name, bee.parameters, null, null,
                                               bee.gender, bee.love_score, bee.love_coin, bee.current_status_heybees, null));
        }
        // find bee avatar:
		if (bee.parameters.id_avatar != "" || bee.parameters.id_avatar != null) {
			findBeeAvatarResource(bee.parameters.id_avatar, null, 60, 60);
		} else {
			self.selected_post().selected_bee().avatar_src(default_avatar_small);
		}
		// find bee cover:
		if (bee.parameters.id_cover != "" || bee.parameters.id_cover != null) {
            findBeeCoverResource(bee.parameters.id_cover, null, 90, 40);
		} else {
			self.selected_post().selected_bee().cover_src(default_cover_large);
		}
    }

    // Find avatar resource for celebrity preview profile:
    findBeeAvatarResource = function(id_avatar, array_index, resource_width, resource_height){
        Dajaxice.resource.dajax_resource_find(findBeeAvatarResourceCallback,
                            {'id_resource': id_avatar, 'array_index': array_index,
                             'resource_width': resource_width,
                             'resource_height': resource_height});
    };
	function findBeeAvatarResourceCallback(data) {
		self.selected_post().selected_bee().avatar_src("data:" + data.content_type + ";base64," + data.binary_content);
	}; // end

    // Find cover resource for celebrity preview profile:
    findBeeCoverResource = function(id_cover, array_index, resource_width, resource_height){
       Dajaxice.resource.dajax_resource_find(findBeeCoverResourceCallback,
                          {'id_resource': id_cover,
                           'array_index': array_index, 'resource_width': resource_width,
                           'resource_height' : resource_height});
    };
	function findBeeCoverResourceCallback(data) {
		self.selected_post().selected_bee().cover_src("data:" + data.content_type + ";base64," + data.binary_content);
	}; // end
    /**
     * End popover preview Bee Profile
     */




    /**
     * FUNCTIONS TO OPERATIONS
     * */
    // #################################################################
    // ######################## LOVE ACTION ############################
    // POST: Function for make Love Action on a Post
    postLoveAction = function(post) {
		self.selected_post(post);
        operationLoveAction(post.id_post,"POST", postLoveActionCallback, posts.indexOf(post), null);
    };
    function postLoveActionCallback(data){
        if ('error' in data){
            // The user already has performed this action
            console.log(data.error);
        }
        else{
            // Update the visual attributes of the bee:
            personUpdateScoreAndCoinForView(data.bee_love_score, data.bee_love_coin);
            if (data.target_love_meter != ""){
                // Increment Cause love_meter if is necessary:
            }
            posts()[data.array_index_i].love_counter(posts()[data.array_index_i].love_counter() + 1);
            posts()[data.array_index_i].love_action_class("love");
            //alert(posts()[data.array_index_i].owner.name() +" love too!");
        }
    }// end love action

    // COMMENT: Function for make Love Action on a Comment
    commentLoveAction = function(comment) {
		self.selected_comment(comment);
        // Find the position of the comment on post array:
        for (var i=0; i< posts().length; i++){
   	    		if (posts()[i].id_post == self.selected_comment().id_parent()){
                    operationLoveAction(comment.id_comment,"COMMENT", commentLoveActionCallback, i, posts()[i].comments.indexOf(comment));
   	    			break;
   	    		}
   	    }
    };
    function commentLoveActionCallback(data){
        if ('error' in data){
            // The user already has performed this action
            console.log(data.error);
        }
        else{
            // Update the visual attributes of the bee:
            personUpdateScoreAndCoinForView(data.bee_love_score, data.bee_love_coin);
            if (data.target_love_meter != ""){
                // Increment Cause love_meter if is necessary:
            }
            posts()[data.array_index_i].comments()[data.array_index_j].love_counter(posts()[data.array_index_i].comments()[data.array_index_j].love_counter() + 1);
            posts()[data.array_index_i].comments()[data.array_index_j].love_action_class("love");
            //alert(posts()[data.array_index_i].owner.name() +" love too!");
        }
    }// end Love action

    // #################################################################
    // ######################## FLY ACTION #############################
    // Function for selects a cause list to give fly action
    sharePost = function(post) {
		self.selected_post(post);
		show_url_post(URL_VIEW_POST + self.selected_post().id_post);
    };
    // end Fly action
    
    sharePostWithFacebook = function(){
    	showStream(self.selected_post().title(), self.selected_post().text(), self.selected_post().resource_refs[0], show_url_post(), self.selected_post().id_post, "POST", posts.indexOf(self.selected_post()));
    };
    
    sharePostWithLinkedin = function() {
		shareLinkedin("POST", posts.indexOf(self.selected_post()));
    };
    
    sharePostWithTwitter=function(){
    	object_type = "POST";
        var href="https://twitter.com/intent/tweet?text="+ self.selected_post().text().slice(0,50)+"..."+"&url="+show_url_post();
        var a = document.getElementById('shareTwitterPost'); //or grab it by tagname etc
        a.href = href;
     };
    /**
     * End functions to operations
     * */
}
ko.applyBindings(TimelineViewModel(), document.getElementById("divTimelineViewModel"));;