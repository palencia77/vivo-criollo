function Person (id_person, email, full_name, parameters, avatar_src , cover_src , gender, love_score, love_coin, current_status_heybees, short_url) {
		var self = this;
		self.id_person = id_person;
		self.email = ko.observable(email);
		self.full_name = ko.observable(full_name);;
		self.parameters = parameters;
		self.avatar_src = ko.observable(avatar_src);
		self.cover_src = ko.observable(cover_src);
		self.gender = ko.observable(gender);
		self.love_score = ko.observable(love_score);
		self.love_coin = ko.observable(love_coin);
		self.current_status_heybees = ko.observable(current_status_heybees);
		self.short_url = ko.observable(short_url);
}