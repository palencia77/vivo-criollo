import json
from dajaxice.decorators import dajaxice_register
from services import *

@dajaxice_register
def dajax_notification_find_by_bee(request, notification_status, page_number, page_size):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_notification_find_by_bee(access_token, id_bee, notification_status, page_number, page_size)
        return json.dumps(result)

@dajaxice_register
def dajax_notification_read(request, id_notification):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_notification_read(access_token, id_bee, id_notification)
        return json.dumps(result)

@dajaxice_register
def dajax_notification_count_unread(request):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_notification_count(access_token, id_bee, 'UNREAD')
        return json.dumps(result)