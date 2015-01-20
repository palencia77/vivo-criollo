/**
 * Created by heybees on 15/12/14.
 */
function Notification (id, created_date, status, notification_type, description, owner,
                       post_destination, comment_destination, url_destination) {
		var self = this;
		self.id = id;
		self.created_date = created_date;
		self.status = ko.observable(status);
		self.notification_type = notification_type;
        self.description = description;
        self.owner = {	"id_owner" : owner.id,
                        "name" : owner.name,
                        "avatar_src" : ko.observable(default_avatar_small),
                        "short_url": owner.short_url,
                        "id_avatar" : owner.id_avatar};
        self.post_destination = post_destination;
        self.comment_destination = {	"id_comment" : comment_destination.id_comment,
                                        "id_parent" : comment_destination.id_parent};
        self.url_destination = url_destination;
}