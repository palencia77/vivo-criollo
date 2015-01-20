function Comment(id_comment, text, owner, love_counter, love_refs, created_date, status,editable,id_parent,editing){
	this.id_comment = id_comment;
	this.text = ko.observable(text);
	this.owner = {	"id_owner" : ko.observable(owner.id),
			"name" : ko.observable(owner.name),
			"avatar_src" : ko.observable(default_avatar_small),
			"short_url": ko.observable(owner.short_url),
			"id_avatar" : ko.observable(owner.id_avatar)};
	this.love_counter = ko.observable(love_counter);
    this.love_refs = ko.observableArray([love_refs]);
	this.created_date = ko.observable(created_date);
	this.status = status;	
	this.id_parent = ko.observable(id_parent);
	// To operate on the html view:
	this.editable = ko.observable(editable);
	this.editing =  ko.observable(editing)
    this.love_action_class = ko.observable("unlove");
}