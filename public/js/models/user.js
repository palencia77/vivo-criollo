function User (id_social_network, email, access_token, full_name, id_bee, parameters,avatar_src , cover_src , gender) {
		var self = this;
		self.id_social_network = id_social_network;
		self.email = email;
		self.access_token = access_token;
		self.full_name = full_name;
		self.id_bee = id_bee;
		self.parameters = parameters;
		self.avatar_src = ko.observable(avatar_src);
		self.cover_src = ko.observable(cover_src);
		self.gender = gender;
}