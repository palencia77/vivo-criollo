function Partner (id_partner, name, description,email, telephone, web_site,address,love_counter, id_avatar,id_promotional_photo, 
		status, id_cover, twitter,facebook, google_plus,avatar_src, cover_src, association) {

		var self = this;
		self.id_partner = id_partner;
		self.name = name;
		self.description = description;
		self.email = email;
		self.telephone = telephone;
		self.web_site = web_site;
		self.address = address;
		self.love_counter = love_counter;
		self.avatar = id_avatar;
		self.promotional_photo = id_promotional_photo;
		self.status = status;
		self.cover = id_cover;
		self.twitter = twitter;
		self.facebook = facebook;
		self.google_plus = google_plus;
		// To operate on the html view:
		self.avatar_src = ko.observable(avatar_src);
		self.cover_src = ko.observable(cover_src);
		self.association = association;
	}