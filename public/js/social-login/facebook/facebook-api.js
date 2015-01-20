		// Facebook JS SDK initialization options
        // This is called with the results from from FB.getLoginStatus().
              function statusChangeCallback(response) {
                // The response object is returned with a status field that lets the
                // app know the current login status of the person.
                // Full docs on the response object can be found in the documentation
                // for FB.getLoginStatus().
                if (response.status === 'connected') {
                  // Logged into your app and Facebook.
                  //login();
                } else if (response.status === 'not_authorized') {
                  // The person is logged into Facebook, but not your app.
                  document.getElementById('status').innerHTML = 'Please log ' +
                    'into this app.';
                } else {
                  // The person is not logged into Facebook, so we're not sure if
                  // they are logged into this app or not.
                  login();
                  document.getElementById('status').innerHTML = 'Please log ' +
                    'into Facebook.';
                }
              }
              // This function is called when someone finishes with the Login
              // Button.  See the onlogin handler attached to it in the sample
              // code below.
              function checkLoginState() {
                FB.getLoginStatus(function(response) {
                  statusChangeCallback(response);
                });
              }

              window.fbAsyncInit = function() {
                  FB.init({
                      //1515044325375708-1483178255253699
                    appId      : '1483178255253699',
                    cookie     : false,  // enable cookies to allow the server to access
                    status	   : true,
                                        // the session
                    xfbml      : true,  // parse social plugins on this page
                    version    : 'v2.1' // use version 2.1
                  });

                  // Now that we've initialized the JavaScript SDK, we call
                  // FB.getLoginStatus().  This function gets the state of the
                  // person visiting this page and can return one of three states to
                  // the callback you provide.  They can be:
                  //
                  // 1. Logged into your app ('connected')
                  // 2. Logged into Facebook, but not your app ('not_authorized')
                  // 3. Not logged into Facebook and can't tell if they are logged into
                  //    your app or not.
                  //
                  // These three cases are handled in the callback function.

                  FB.getLoginStatus(function(response) {
                    statusChangeCallback(response);
                  });

              };

            (function() {
                var e = document.createElement('script');
                e.type = 'text/javascript';
                e.src = document.location.protocol + 'public/js/social-login/facebook/all.js';
                e.async = true;
            }());
         function facebooklogin(){
                FB.login(function(response) {
                   if (response.status === 'connected') {
                        statusChangeCallback(response);
                        login();
                        // Logged into your app and Facebook.
                       var json = eval(JSON.parse(Get('https://api.facebook.com/method/fql.query?format=json&query=select+email+,' +
                           '                          +name+,+sex+from+user+where+uid='+response.authResponse.userID+
                                                      '&access_token='+response.authResponse.accessToken)));
                   }
                   else if (response.status === 'not_authorized') {
                        statusChangeCallback(response);
                        // The person is logged into Facebook, but not your app.
                   }
                   else {
                        statusChangeCallback(response);
                        login();
                        // The person is not logged into Facebook, so we're not sure if
                        // they are logged into this app or not.
                   }
                },{scope:'email,user_birthday,status_update,publish_stream,user_about_me,publish_actions'});
          }
            //login of facebook
            function login(){
                FB.api('/me', function(response) {
                   if (response.id != null) {
                       console.log(response);
                       loginFacebookSocialNetwork(response.id, response.email, response.name, response.gender);
                   }
                   else{
                    	//clear_status_love_on_causes_and_posts();
                   }
                },{scope:'email,user_birthday,status_update,publish_stream,user_about_me,publish_actions'});
            }
            
            //logout method
            function logout(){
            	eraseCookie('bsdrwefge');
            	eraseCookie('wtgoykrveun');
            };

            //stream publish method
            function streamPublish(name, description, hrefLink, userPrompt, picture, id_destination, object_type, array_index){
            	if(id_destination != null){
                	FB.ui(
                            {
                                method: 'feed',
                    		    picture: picture,
                    		    name: name,
                    		    link: hrefLink,
                        		description: description,
                                message: '',
                                user_prompt_message: userPrompt
                            },
                            function(response) {
                                if (!response || response.error) {
                                }
                                else {
                                	if(object_type=="BEE")
                                		operationFly(id_destination, "BEE", causeFlyActionWithFacebookCallback, array_index)
                                	else if(object_type=="POST")
                                		operationFly(id_destination, "POST", postFlyActionWithFacebookCallback, array_index)
                                	else
                                		operationFly(id_destination, "AWARD", awardFlyActionWithFacebookCallback, array_index)
                                }
                            });
            	}
            }
            //Fly Action Cause With Facebook Callback 
            function causeFlyActionWithFacebookCallback(data){
                if ("error" in data){
                    alert(data.error);
                }
                else{
                    causes()[data.array_index].fly_counter(causes()[data.array_index].fly_counter() + 1);
                }
            }
            
            //Fly Action Post With Facebook Callback 
            function postFlyActionWithFacebookCallback(data){
                if ("error" in data){
                    alert(data.error);
                }
                else{
                    posts()[data.array_index].fly_counter(posts()[data.array_index].fly_counter() + 1);
                }
            }
            
            //Fly Action Award With Facebook Callback 
            function awardFlyActionWithFacebookCallback(data){
                if ("error" in data){
                    alert(data.error);
                }
                else{
                    awards()[data.array_index].fly_counter(awards()[data.array_index].fly_counter() + 1);
                }
            }
            
            function showStream(name,text,id_resource,url, id_destination, object_type, array_index){
                FB.login(function(response) {
                	if (response.status == 'connected') {
                    	streamPublish(name, convertHtmlToText(text), url, "Heybees Web",'www.social.heybees.com:5000/resource/public/view?id_resource='+id_resource, id_destination, object_type, array_index);
                    }
                }, {scope:'email,user_birthday,status_update,publish_stream,user_about_me,publish_actions'});
            }
            
            function loginGiveLove(id_bee_destination, id_post_destination){
            	if(id_bee_destination != null){
                	FB.login(function(response) {
                        if (response.status == 'connected') {
                        	setTimeout(function() {
                        		operationLoveActionCause(id_bee_destination);
                        	}, 5000);
                        }
                    },{scope:'email,user_birthday,status_update,publish_stream,user_about_me,publish_actions'});
            	}
            	else if(id_post_destination != null){
                	FB.login(function(response) {
                    	console.log(response);
                        if (response.status == 'connected') {                    	
                        	setTimeout(function() {
                        		operationLoveActionPost(id_post_destination);
                        	}, 5000);  
                        }
                    },{scope:'email,user_birthday,status_update,publish_stream,user_about_me,publish_actions'});
            	}
            }        
            
            function share(url){
                var share = {
                    method: 'stream.share',
                    u: url
                };
                FB.ui(share, function(response) { console.log(response); });
            }

            function graphStreamPublish(){
                var body = '';
                FB.api('/me/feed', 'post', { message: body }, function(response) {
                    if (!response || response.error) {
                        alert('Error occured');
                    } else {
                        alert('Post ID: ' + response.id);
                    }
                });
            };

            function fqlQuery(){
                FB.api('/me', function(response) {
                     var query = FB.Data.query('select uid, name, hometown_location, sex, pic_square from user where uid={0}', response.id);
                     query.wait(function(rows) { 
                       document.getElementById('name').innerHTML =
                         'Your name: ' + rows[0].name + "<br />" +
                         '<img src="' + rows[0].pic_square + '" alt="" />' + "<br />";
                     });
                });
            };

		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		 	 if (d.getElementById(id))
				 return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&appId=1483178255253699&version=v2.1";
			  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));