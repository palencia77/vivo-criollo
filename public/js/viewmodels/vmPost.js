// Globals variables:
var posts = ko.observableArray([]);
var URL_VIEW_POST = "http://www.social.heybees.com/post/show?id=";
var show_url_post = ko.observable("");

function PostViewModel() {
	var self = this;
	self.post_page_number = 1;
	self.post_page_size = 10;
	self.selected_post = ko.observable();
	self.selected_comment = ko.observable();
	self.resourcePreview = ko.observable();
	self.show_post = ko.observable();
	var id_bee = null;
	self.post_is_lastpage = ko.observable(true);
	
	postReciveIdBee = function (id){
		id_bee = id;
		showBeePosts();
	}
		
	showBeePosts = function(){
    	Dajaxice.post.dajax_post_find_by_bee(postFindByBeeCallback, {'page_number': self.post_page_number,
			 'page_size' : self.post_page_size,
			 'id_bee' : id_bee });
	};
	
	/**
	 * SHOW POST DETAILS
	 ** @param post
	 */
	showPost = function(post){
		self.show_post(new Post(post.id_post, post.title, post.text, post.owner, post.love_counter, post.love_refs,
				post.fly_refs, null, post.resource_refs, post.fly_counter,post.created_date, post.status,null,null,null,0,true,true,false));
		if(post.owner.id_avatar != "" && post.owner.id_avatar != null){
			findPostOwnerAvatar(null, post.owner.id_avatar, findPostShowOwnerAvatarCallback);
		}
		findPostsResources(null,post,findPostShowResourcesCallback);
		findCommentByPostShow();
	};
	
	findCommentByPostShow = function(){
		findCommentByPost(null,self.show_post(),commentPostShowCallBack);
	}
	

    function findPostShowResourcesCallback(data){
    	self.show_post().resources_src.push(new Resource(data.id_resource,('data:'+data.content_type+';base64,'+data.binary_content),null,null,null,null));
	};	
	
	function findPostShowOwnerAvatarCallback(data){
		self.show_post().owner.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
	};
	
	commentPostShowCallBack = function(data){		
    	if('error' in data){
    		alert(data.error);    		
    	}else{
    		comments_array = new Array();
    		data.content.forEach(function(comment) {
    		if(id_bee_session == comment.owner.id){
    			editable = true;
    		}else{
    			editable = false;
    		}
    		var comment_object = new Comment(comment.id_comment, comment.text, comment.owner, comment.love_counter, comment.love_refs, comment.created_date, comment.status, editable, comment.id_parent,false)
    		comments_array.unshift(comment_object);
    		self.show_post().comments.unshift(comment_object);    		
    		});
    		findCommentOwnerAvatarPostShow(comments_array, data.index);
    		self.show_post().comment_is_lastpage(data.last_page);     	    	
    	}
    };

	findCommentOwnerAvatarPostShow = function(comments_array){
		for (var i=0; i < comments_array.length; i++){
			if (comments_array[i].owner.id_avatar() != "" || comments_array.owner.id_avatar() != null){
				Dajaxice.resource.dajax_resource_find(findCommentOwnerAvatarPostShowCallback, {'id_resource': comments_array[i].owner.id_avatar(), 'array_index': i, 'resource_width': 30, 'resource_height': 30});
			}
		}; 		
 	};
 	
 	function findCommentOwnerAvatarPostShowCallback(data){
 		if('error' in data){
    		alert(data.error);
    	}else{
    		self.show_post().comments()[data.array_index].owner.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
     	}
 	};
	
	
	/**
	 * END SHOW POST DETAILS
	 * */
	
	
	/**
	 * FIND POSTS
	 * */
    
    // Dajaxice post_find_by_cause callback:
	function postFindByBeeCallback(data){
		var posts_index=0;
		self.post_page_number++;
		self.post_is_lastpage(data.last_page);
		data.content.forEach(function(post) {
			// Definition of the post url:
			posts.push(new Post(post.id_post, post.title, post.text, post.owner, post.love_counter, post.love_refs,
					post.fly_refs, post.postcomment_refs, post.resource_refs, post.fly_counter,
					post.created_date, post.status,null,null,null,0,true,false,false));
			findPostsResources(posts_index,post,findPostsResourcesCallback);
			findCommentByPost(posts().length-1,posts()[posts().length-1],findCommentByPostCallback);

            // Visually determines whether it has already done the action love about this cause:
            if (post.love_refs.indexOf(id_bee_session) != -1){
                posts()[posts().length-1].love_action_class("love");
            }

			if(post.owner.id == id_bee_session){
            	posts()[posts().length-1].editable(true);                	
            };
            if(post.owner.id_avatar != "" && post.owner.id_avatar != null){
        		if(post.owner.id == id_bee_session){
        			if(avatars_person().length > 0){
        				posts()[posts().length-1].owner.avatar_src(avatars_person()[1]);
        			}
        			else{
        				findPostOwnerAvatar(posts().length-1, post.owner.id_avatar, findPostOwnerAvatarCallback);
        			}
        		}else {
            		findPostOwnerAvatar(posts().length-1, post.owner.id_avatar, findPostOwnerAvatarCallback);
            	}
            };		
			posts_index++;
		});
	};
	
	findPostOwnerAvatar = function(posts_index, id_avatar, callback){
		Dajaxice.resource.dajax_resource_find(callback, {'id_resource' : id_avatar, 'array_index': posts_index, 'resource_width': 40, 'resource_height': 40});
	};
	
	function findPostOwnerAvatarCallback(data){
		posts()[data.array_index].owner.avatar_src('data:'+data.content_type+';base64,'+data.binary_content);
	};

	findPostsResources = function(posts_index, post, callback){
		if (post.resource_refs.length > 0){
			Dajaxice.resource.dajax_resource_find_id_of_post(callback, {'id_resource' : post.resource_refs[0], 'array_index': posts_index});
		}
	};
	
	function findPostsResourcesCallback(data){
		posts()[data.array_index].resources_src.push(new Resource(data.id_resource,('data:'+data.content_type+';base64,'+data.binary_content),null,null,null,null));
	};
	
	//Preview Image Post
	previewPostResource = function(resource){
		self.resourcePreview("");
    	Dajaxice.resource.dajax_resource_find(previewPostResourceCallback, {'id_resource': resource.id_resource, 'array_index': null, 'resource_width': null, 'resource_height': null});
   	};
   	previewPostResourceCallback = function(data){
   		self.resourcePreview(new Resource(data.id_resource, ('data:'+data.content_type+';base64,'+data.binary_content), null, null, null,null));
   	};
	/**
	 * END FIND POSTS
	 * **/
   	
   	/**
   	 * CRUD POST
   	 * **/
   	
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
    	if (data.message == "ok"){
   			alert("editado");	
		}else{
			alert(data.error);
		}
    }; 
    /**
   	 * END CRUD POST
   	 * **/
   	
    // Function for selects a cause list to give fly action
    sharePost = function(post) {
		self.selected_post(post);
		show_url_post(URL_VIEW_POST + self.selected_post().id_post);
    };
    
    sharePostWithFacebook = function(){
    	showStream(self.selected_post().title(), self.selected_post().text(), self.selected_post().resource_refs[0], show_url_post(), self.selected_post().id_post, "POST", posts.indexOf(self.selected_post()));
    };
    
    sharePostWithLinkedin = function() {
		shareLinkedin("POST", posts.indexOf(self.selected_post()));
    };
    
    sharePostWithTwitter=function(){
    	object_type = "POST";
    	href="https://twitter.com/intent/tweet?text="+ self.selected_post().text().slice(0,50)+"..."+"&url="+show_url_post();
        var a = document.getElementById('shareTwitterPost'); //or grab it by tagname etc
        a.href = href;
     };
    
    //Function that increments the fly counter of a selected post in sight
    increase_fly_post_on_view = function() {
		self.selected_post().fly_counter(self.selected_post().fly_counter() + 1);
    };
    
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
    	findCommentByPost(index,post,findCommentByPostCallback);
    };
    
    findCommentByPost = function(index,post,callback){    	
    	post.comment_pagenumber = post.comment_pagenumber + 1;
    	Dajaxice.comment.dajax_comment_find_by_post(callback, {'id_post': post.id_post,'index':index, 'page_number': post.comment_pagenumber, 'page_size':3})
    };
    
    findCommentByPostCallback = function (data){
    	var comments_array = new Array();
    	if('error' in data){
    		alert(data.error);
    	}else{
    		data.content.forEach(function(comment) {
    		if(id_bee_session == comment.owner.id){
    			editable = true;
    		}else{
    			editable = false;
    		}
    		var comment_object = new Comment(comment.id_comment, comment.text, comment.owner, comment.love_counter, comment.love_refs, comment.created_date, comment.status, editable, comment.id_parent,false)
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
    		alert(data.error)
    	}else{
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
    	if (data.message == "ok"){
   			alert("editado");	
		} else{
			alert(data.error);
		}
    };

    // ###################################################################################
    // ##################### LOVE ACTION #################################################
    // POST: Function for make Love Action on a Post
    postLoveAction = function(post) {
		self.selected_post(post);
        operationLoveAction(post.id_post,"POST", postLoveActionCallback, posts.indexOf(post), null);
    };
    function postLoveActionCallback(data){
        if ('error' in data){
            console.log(data.error);
        }
        else{
            // Update the visual attributes of the bee:
            personUpdateScoreAndCoinForView(data.bee_love_score, data.bee_love_coin);
            if (data.target_love_meter != ""){
                // Increment Cause love_meter if is necessary:
                causeUpdateLoveMeterForView(data.target_love_meter);
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
            console.log(data.error);
        }
        else{
            // Update the visual attributes of the bee:
            personUpdateScoreAndCoinForView(data.bee_love_score, data.bee_love_coin);
            if (data.target_love_meter != ""){
                // Increment Cause love_meter if is necessary:
                causeUpdateLoveMeterForView(data.target_love_meter);
            }
            posts()[data.array_index_i].comments()[data.array_index_j].love_counter(posts()[data.array_index_i].comments()[data.array_index_j].love_counter() + 1);
            posts()[data.array_index_i].comments()[data.array_index_j].love_action_class("love");
            //alert(posts()[data.array_index_i].owner.name() +" love too!");
        }
    }// end love action
    // ###################################################################################
    
    /**
     * End comment of a post
     * 
     **/
    
}
ko.applyBindings(PostViewModel(), document.getElementById("divPostViewModel"));