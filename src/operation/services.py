import json
import requests
from heybeesweb.settings import URL_SERVICES
    
'''
@summary: Service for generate an operation fly action
@param access_token, id_bee, id_bee_destination
'''
def service_operation_fly_action(access_token, id_bee, id_bee_destination,id_post_destination, id_award_destination):
    url = URL_SERVICES + "/operation/fly/action"
    params = {'access_token': access_token, 'id_bee': id_bee, 'id_bee_destination': id_bee_destination,
              'id_post_destination': id_post_destination, 'id_award_destination': id_award_destination, 'app': 'SOCIAL'}
    try:
        r = requests.post(url, data=json.dumps(params))
        if r.status_code == 200:
            result = r.json()
            return result
    except Exception as e:
        return e

'''
@summary: Service for generate an operation love action
@param access_token, id_bee, id_bee_destination, id_award_destination
'''
def service_operation_love_action(access_token, id_bee, id_bee_destination, id_post_destination,
                                  id_comment_destination, id_award_destination):
    url = URL_SERVICES + "/operation/love/action"
    params = {'access_token': access_token, 'id_bee': id_bee, 'id_bee_destination': id_bee_destination,
              'id_post_destination': id_post_destination, 'id_award_destination': id_award_destination,
              'id_comment_destination': id_comment_destination, 'app': 'SOCIAL'}
    try:
        r = requests.post(url, data=json.dumps(params))
        if r.status_code == 200:
            result = r.json()
            return result
    except Exception as e:
        return e

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