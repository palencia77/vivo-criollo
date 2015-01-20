$(function() {	
  $.getScript("http://platform.linkedin.com/in.js?async=true", function success() {
    IN.init({
      api_key: "78qg2y0ptfsk1s", //77rw6jyp42ba5i de localhost, 78qg2y0ptfsk1s del servidor
      authorize: false,
      lang:  "es_ES",
      onLoad: "onLinkedInLoad",
      //     credentials_cookie: true,
      //     credentials_cookie_crc: true
      scope: 'rw_nus r_fullprofile r_emailaddress r_contactinfo r_basicprofile'
    });
  });
  $('#linkedin').css({display:'none'});
});

//$(function(){
//	$('#linkedin').css({display:'none'});
//});

function onLinkedInLoad() {
	$('a[id*=li_ui_li_gen_]').html('<img src="/public/img/icon/icon_linkedin_mobile_32x32.png" height="32" width="32" border="0" />');
	IN.Event.on(IN, "auth", function() {onLinkedInLogin();});
	$('#linkedin').css({display:'block'});
	IN.Event.on(IN, "logout", function() {onLinkedInLogout();});
	IN.Event.on("shareAPI", "click", shareLinkedin);
}

function onLinkedInLogout() {
	setLoginBadge(false, null);
}

function onLinkedInLogin() {
	// we pass field selectors as a single parameter (array of strings)
	IN.API.Profile("me")	
		.fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl", "location", "positions","languages","phone-numbers","emailAddress","mainAddress"])
		.result(function(result) {
			setLoginBadge(result.values[0]);
		})
		.error(function(err) {
			alert(err);
		});
}

function setLoginBadge(profile) {
	if (!profile) {
		profHTML = "<p>You are not logged in</p>";
	}
	else 
	{
        var pictureUrl = profile.pictureUrl || "http://static02.linkedin.com/scds/common/u/img/icon/icon_no_photo_80x80.png";
		loginLinkedinSocialNetwork(profile.id, profile.emailAddress, profile.firstName + " " + profile.lastName, null,pictureUrl);
		//profHTML = "<p><a href=\"" + profile.publicProfileUrl + "\">";
		//profHTML = profHTML + "<img align=\"baseline\" src=\"" + pictureUrl + "\"></a>";      
		//profHTML = profHTML + "&nbsp; Welcome <a href=\"" + profile.publicProfileUrl + "\">";
		//profHTML = profHTML + profile.firstName + " " + profile.lastName + "</a>! <a href=\"#\" onclick=\"IN.User.logout(); return false;\">logout</a></p>";
	}
}

function shareLinkedin(object_type, array_index) {
	if(object_type=="BEE") {
		operationFly(self.selected_cause().id_cause, "BEE", causeFlyActionWithLinkedinCallback, array_index)  
	}
	else if(object_type=="POST"){
         operationFly(self.selected_post().id_post, "POST", postFlyActionWithLinkedinCallback, posts().indexOf(self.selected_post()))
	}
	else
	{
		 operationFly(awardSelected().id_award, "AWARD", awardFlyActionWithLinkedinCallback, awards().indexOf(awardSelected()))
	}	
	
//	document.getElementById("metaOGImageCause").setAttribute("content", "http://www.heybees.com:5000/resource/public/view?id_resource="+id_resource);
//	var metaDesc = document.getElementById("metaOGImageCause").getAttribute("content");
//	console.log(metaDesc);
//	window.open("http://www.linkedin.com/shareArticle?mini=true&url=http://www.heybees.com"+url,'_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=500, width=500, height=500');
//	bodyRequest = JSON.stringify({
//		   "content": {
//		      "title": name,
//		      "description": convertHtmlToText(text),
//		      "submittedUrl": url,
//		      "submittedImageUrl": 'www.heybees.com:5000/resource/public/view?id_resource='+id_resource
//		   },
//		    "visibility": {
//		      "code": "connections-only"
//		    }
//	})
//	
//    IN.API.Raw("people/~/shares")
//    .method("POST")
//    .body(bodyRequest)
//    .result(function(result) { console.log("Success") }).
//    error(function(result) {
//    	console.log(JSON.stringify(result));
//    });
//	IN.UI.Authorize().place()
//	IN.UI.Share().params({
//		  url: 'http://www.heybees.com'+ url,
//		  "title": name,
//		  "description": convertHtmlToText(text),
//		  "submitted-image-url": 'www.heybees.com:5000/resource/public/view?id_resource='+id_resource,
//		  "comment": "dd"
//	}).place()
}

//Fly Action Cause With Linkedin Callback 
function causeFlyActionWithLinkedinCallback(data){
    if ("error" in data){
        alert(data.error);
    }
    else{
        causes()[data.array_index].fly_counter(causes()[data.array_index].fly_counter() + 1);
    }
}

//Fly Action Post With Linkedin Callback 
function postFlyActionWithLinkedinCallback(data){
    if ("error" in data){
        alert(data.error);
    }
    else{
        posts()[data.array_index].fly_counter(posts()[data.array_index].fly_counter() + 1);
    }
}

//Fly Action Award With Linkedin Callback 
function awardFlyActionWithLinkedinCallback(data){
    if ("error" in data){
        alert(data.error);
    }
    else{
        awards()[data.array_index].fly_counter(awards()[data.array_index].fly_counter() + 1);
    }
}