function Celebrity (id_celebrity, name, description, telephone, web_site,
					facebook, twitter, google_plus, id_avatar, id_promotional_photo,
					id_cover, avatar_src, cover_src, show_url) {
						
		var self = this;
		self.id_celebrity = id_celebrity;
		self.name = name;
		self.description = description;
		self.telephone = telephone;
		self.web_site = web_site;
		self.facebook = facebook;
		self.twitter = twitter;
		self.google_plus = google_plus;
		self.id_avatar = id_avatar;
		self.id_promotional_photo = id_promotional_photo;
		self.id_cover = id_cover;
		// To operate on the html view:
		self.avatar_src = ko.observable(avatar_src);
		self.cover_src = ko.observable(cover_src);
		self.show_url = show_url;
	}