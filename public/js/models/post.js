function Post(id_post, title, text, owner, love_counter, love_refs, fly_refs,
              postcomment_refs, resource_refs, fly_counter, created_date, status,
              resource_src, comments, new_comment, comment_pagenumber,
              comment_is_lastpage,editable,editing){
	this.id_post = id_post;
	this.title = ko.observable(title);
	this.text = ko.observable(text);
    this.love_counter = ko.observable(love_counter);
    this.fly_refs = fly_refs;
    this.postcomment_refs = postcomment_refs;
    this.resource_refs = resource_refs;
    this.fly_counter = ko.observable(fly_counter);
    this.created_date = ko.observable(created_date);
    this.status = status;
    this.resources_src = ko.observableArray(resource_src);
    this.love_refs = ko.observableArray([love_refs]);
    this.comments = ko.observableArray(comments);
    this.new_comment = ko.observable(new_comment);
    this.comment_pagenumber = comment_pagenumber;
    this.comment_is_lastpage = ko.observable(comment_is_lastpage);
    this.owner = {	"id_owner" : ko.observable(owner.id),
			"name" : ko.observable(owner.name),
			"avatar_src" : ko.observable(default_avatar_small),
			"short_url": ko.observable(owner.short_url),
			"id_avatar" : ko.observable(owner.id_avatar)};
    this.editable = ko.observable(editable);
	this.editing =  ko.observable(editing);
    this.love_action_class = ko.observable("unlove");
    this.selected_bee =  ko.observable();
}
