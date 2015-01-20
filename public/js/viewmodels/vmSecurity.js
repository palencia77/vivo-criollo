// Social login with Google+:
function loginWithGooglePlus(google_access_token) {
    var form = document.getElementById('googleplus_login');
    var input_google_access_token = document.createElement("input");
    input_google_access_token.name="google_access_token";
    input_google_access_token.value=google_access_token;
    form.appendChild(input_google_access_token);
    document.body.appendChild(form);
    form.submit();
// end google+ login
};

// Social login with Facebook:
function loginFacebookSocialNetwork(id_social_network,email, full_name, gender){
    var form = document.getElementById('facebook_login');
    var input_id_social_network = document.createElement("input");
	var input_email = document.createElement("input");
	var input_full_name = document.createElement("input");
    var input_gender = document.createElement("input");
	input_id_social_network.name = "id_social_network";
	input_id_social_network.value = id_social_network;
	input_email.name = "email";
	input_email.value = email;
	input_full_name.name = "full_name";
	input_full_name.value = full_name;
    input_gender.name="gender";
    input_gender.value=gender;
    form.appendChild(input_id_social_network);
    form.appendChild(input_email);
    form.appendChild(input_full_name);
    form.appendChild(input_gender);
    document.body.appendChild(form);
    form.submit();
    // end facebook login
};

//Social login with Linkedin: (ARREGLAR PORQUE LAS COOKIES SE CREAN EN PYTHON POR ESTANDAR)
function loginLinkedinSocialNetwork(id_social_network, email, full_name, gender,image_url){
	var form = document.getElementById('login_linkedin');
    var input_id = document.createElement("input");
	var input_email = document.createElement("input");
	var input_fullName = document.createElement("input");
    var input_image_url =document.createElement("input");
	input_id.name = "id";
	input_id.value = id_social_network;
	input_email.name = "email";
	input_email.value = email;
	input_fullName.name = "fullName";
	input_fullName.value = full_name;
    input_image_url.name="image_url";
    input_image_url.value=image_url;
    form.appendChild(input_id);
    form.appendChild(input_email);
    form.appendChild(input_fullName);
    form.appendChild(input_image_url);
    document.body.appendChild(form);
    form.submit();
};

function desactivateAccount(){	
	alertify.confirm("¿Está seguro de querer desactivar su cuenta?", function (e) {
		if (e) {
//			$("#userModal").mask(loading);
			Dajaxice.security.dajax_user_update_status(desactivateAccountCallback, {'status': 'INACTIVE'});
		}
	});
};

// Dajaxice user_register callback
function desactivateAccountCallback(data) {
	console.log(data);
//	$("#userModal").unmask();
	if (data.error == "We have sent an email with a link that lets you deactivate your account") {
		alert("Te hemos enviado un correo electronico con un enlace con el que podrás desactivar tu cuenta.");
	}		
};

function SecurityViewModel(){

    pruebaViewModel = function(){
        alert("A presionado un boton bindeado del vmSecurity");
    };
};
//ko.applyBindings(new SecurityViewModel(), document.getElementById("SecurityViewModel"));