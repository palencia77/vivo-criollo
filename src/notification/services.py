import json
import requests
from heybeesweb.settings import URL_SERVICES, APP_TYPE_S,PUBLIC_ACCESS_TOKEN

'''
@summary: Service to get paginated notifications by bee
@param access_token, id_bee, notification_status, page_number, page_size
'''
def service_notification_find_by_bee(access_token, id_bee, notification_status, page_number=1, page_size=10):
    url = URL_SERVICES + "/notification/find/by/bee"
    params = {'access_token': access_token,
              'page_number': page_number,
              'page_size': page_size,
              'id_bee': id_bee,
              'notification_status': notification_status,
              'app': APP_TYPE_S
              }
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
    except Exception as e:
        return {'error': e}

'''
@summary: Service to mark the notification as read
@param access_token,page_number, page_size, id_bee
@param id_bee
'''
def service_notification_read(access_token, id_bee, id_notification):
    url = URL_SERVICES + "/notification/read"
    params = {'access_token': access_token,
              'id_bee': id_bee,
              'id_notification': id_notification,
              'app': APP_TYPE_S
              }
    try:
        result = requests.post(url, data=json.dumps(params))
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {'error': e}

'''
@summary: Service to count the notifications by status
@param access_token, id_bee, notification_status, page_number, page_size
'''
def service_notification_count(access_token, id_bee, notification_status):
    url = URL_SERVICES + "/notification/count/by/status"
    params = {'access_token': access_token,
              'id_bee': id_bee,
              'notification_status': notification_status,
              'app': APP_TYPE_S
              }
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
    except Exception as e:
        return {'error': e}

'''
@summary:
@param status_error:  
'''
def error_handler(status_error):
    if status_error == 400:
        return {"error": "Error en datos enviados"}
    elif status_error == 500:
        return {"error": "Ocurrio un error en el servidor por favor intente mas tarde"}
    else:
        return {"error": "Ocurrio un error ({0})".format(status_error)}