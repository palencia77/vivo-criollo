/**
 * Created by heybees on 15/12/14.
 */
var URL_VIEW_POST = "http://www.social.heybees.com/post/show?id=";
var URL_VIEW_BEE_PROFILE = "http://www.social.heybees.com/bee/profile?id=";

function NotificationViewModel() {
	var self = this;
	self.notifications = ko.observableArray();
    self.selected_notification = ko.observable();
    self.notification_page_number = 1;
    self.notification_page_size = 10;
    self.notification_status = ko.observable("UNREAD");
    self.notification_counter = ko.observable(0);
    self.notification_counter_class = ko.observable("");

    // Count the number of unread notifications by Bee
    countUnreadNotifications = function () {
        Dajaxice.notification.dajax_notification_count_unread(countUnreadNotificationsCallBack);
    }();
    function countUnreadNotificationsCallBack(data){
        if ("error" in data){
            alert("Count notifications: " + data.error);
        }else{
            self.notification_counter_class("badge");
            self.notification_counter(data.notification_counter);
        }
    } // End count notifications

    // Find all notifications by Bee:
    findNotificationsByBee = function(){
        $("#loadingNotifications").mask("Cargando...");
        self.notifications.removeAll();
        Dajaxice.notification.dajax_notification_find_by_bee(findNotificationsByBeeCallback, {
			'notification_status' : self.notification_status(),
			'page_number' : self.notification_page_number,
			'page_size' : self.notification_page_size
		});
    };
    function findNotificationsByBeeCallback(data){
        if (data.content.length > 0){
            data.content.forEach(function(notification) {
                var url_destination="#";
                if (notification.post_destination != ""){
                    url_destination = URL_VIEW_POST + notification.post_destination;
                }else if (notification.comment_destination.id_comment != ""){
                    url_destination = URL_VIEW_POST + notification.comment_destination.id_parent;
                }else{
                    url_destination = URL_VIEW_BEE_PROFILE + notification.owner.id;
                }
                notifications.push(new Notification(notification.id_notification, notification.created_date,
                                                   notification.status, notification.notification_type,
                                                   notification.description, notification.owner,
                                                   notification.post_destination, notification.comment_destination,
                                                   url_destination));
                // find owner avatar:
                if (notification.owner.id_avatar != "" && notification.owner.id_avatar != null) {
                    notificationFindAvatarResource(notification.owner.id_avatar, self.notifications().length-1, 40, 40);
                }
            });
            $("#loadingNotifications").unmask();
        }
    } // End find notifications

    // Find avatar resource of the award list:
    notificationFindAvatarResource = function(id_avatar, array_index, resource_width, resource_height){
        Dajaxice.resource.dajax_resource_find(notificationFindAvatarResourceCallback,
                            {'id_resource': id_avatar, 'array_index': array_index,
                             'resource_width': resource_width,
                             'resource_height': resource_height});
    };
	function notificationFindAvatarResourceCallback(data) {
        if ("error" in data){
            alert(data.error);
        }else{
            self.notifications()[data.array_index].owner.avatar_src("data:" + data.content_type + ";base64,"+ data.binary_content);
        }
	}; // end

    // Function to change the notification status to READ:
    readNotification = function(notification){
        self.selected_notification(notification);
        Dajaxice.notification.dajax_notification_read(readNotificationCallback, {
			'id_notification' : notification.id});
    }
    function readNotificationCallback (data) {
        if ("error" in data){
            alert("Read notification: " + data.error);
        }else{
            self.notification_counter(self.notification_counter()-1);
            window.open(self.selected_notification().url_destination,"_self")
        }
    } // End read notification
}
ko.applyBindings(NotificationViewModel(), document.getElementById("divNotificationViewModel"));