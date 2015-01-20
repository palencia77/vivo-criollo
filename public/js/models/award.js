function Award(id_award, title, text, owner,resource_refs, quantity, status,amount_love, fly_counter, avatar_src,association,selected_bee){
	this.id_award = id_award;
	this.title = title;
	this.text = text;
    this.quantity = quantity;
    this.resource_refs = resource_refs;
    this.status = status
    this.amount_love = amount_love;
    this.owner = {	"id" : ko.observable(owner.id),
                    "name" : ko.observable(owner.name),
                    "avatar_src" : ko.observable(default_avatar_small),
                    "id_avatar" : ko.observable(owner.id_avatar)
                 };
    // To operate on the html view:
    this.fly_counter = ko.observable(fly_counter);
    this.avatar_src = ko.observable(avatar_src);
    this.resources_src = ko.observableArray();
    this.association = association;//boolean: to determinate if have association with one cause
    this.selected_bee = ko.observable(selected_bee);
}