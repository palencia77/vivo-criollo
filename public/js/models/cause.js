function Cause (id_cause, name, description, goal, id_subscope, sub_scope, love_counter,
				fly_counter, start_date, closing_date, love_meter,love_goal,beneficiary,risk_classification, 
				url_promotional_video, promotional_photo_src, color, partners, celebrities, partner, celebrity,
				parameters, show_url, love_refs,short_url) {
	
		var self = this;
		self.id_cause = id_cause;
		self.name = name;
		self.description = description;
		self.goal = goal;
		self.id_subscope = id_subscope;
		self.sub_scope = sub_scope;
		self.love_counter =  ko.observable(love_counter);
		self.fly_counter = ko.observable(fly_counter);
		self.start_date = start_date;
		self.closing_date = closing_date;
		self.love_meter = ko.observable(love_meter);
		self.love_goal = ko.observable(love_goal);
		self.beneficiary = beneficiary;
		self.risk_classification = risk_classification;
		self.url_promotional_video = url_promotional_video;
		self.color = color;
		self.partners = partners;
		self.celebrities = celebrities;
		self.partner = 	 {	"id_partner" : ko.observable(partner.id_partner),
							"name" : ko.observable(partner.name),
							"description" : ko.observable(partner.description),
							"avatar_src" : ko.observable(default_avatar_medium),
							"id_resource" : ko.observable(partner.id_resource)};
		self.celebrity = {	"id_celebrity" : ko.observable(celebrity.id_celebrity),
							"name" : ko.observable(celebrity.name),
							"description" : ko.observable(celebrity.description),
							"avatar_src" : ko.observable(default_avatar_medium),
							"id_resource" : ko.observable(celebrity.id_resource)};
		//self.partner = ko.observable(partner);
		//self.celebrity = ko.observable(celebrity);
		self.parameters = parameters;
		// To operate on the html view:
		self.promotional_photo_src = ko.observable(promotional_photo_src);
		self.show_url = show_url;
		self.love_refs = ko.observableArray(love_refs);
        self.short_url = short_url;
        self.love_action_class = ko.observable("unlove");
	}