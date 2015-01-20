import json
import requests
from heybeesweb.settings import URL_SERVICES, APP_TYPE_S,PUBLIC_ACCESS_TOKEN

'''
@summary: Service to get all awards of a bee
@param access_token,page_number, page_size, id_bee
@param id_bee
'''
def service_award_find_by_bee(access_token, id_bee, status, page_number=1, page_size=10):
    url = URL_SERVICES + "/find/awards/by/bee"
    params = {'access_token': access_token,
              'page_number': page_number,
              'page_size': page_size,
              'id_bee': id_bee,
              'status': status,
              'app': APP_TYPE_S
              }
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
    except Exception as e:
        return error_handler(result.status_code)

'''
@summary: Service to find award by id
@param access_token
@param id_award
'''   
def service_award_find_by_id(access_token, id_award):
    url = URL_SERVICES + "/award/find/by_id"
    params = {'access_token': access_token, 'id_award': id_award}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {'error': e}
    
'''
@summary: 
@param id_cause
'''
def service_award_bee_association_find(access_token, id_bee, associated, name_filter, page_number, page_size):
    url = URL_SERVICES + "/award/bee_association/find" 
    if access_token is None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token,
              'id_bee': id_bee,
              'app': APP_TYPE_S,
              'associated': associated,
              'name_filter': name_filter,
              'page_number': page_number,
              'page_size': page_size
              }
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {'error': e}

'''
@summary: Service to find all awards by their status
@param access_token:
@param status:
@param name_filter:
@param page_number:
@param page_size:
'''
def service_award_find_by_status(access_token, status, name_filter, page_number, page_size):
    url = URL_SERVICES + "/award/find/by/status"
    if access_token is None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token, 'status': status, 'page_number': page_number,
              'page_size': page_size, 'name_filter': name_filter, 'app': APP_TYPE_S}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {'error': e}


'''
@summary: This method allows bee redeem a lot of love for a awards
@param access_token:
@param id_bee:
@param id_award: 
'''
def service_award_purchase(access_token, id_bee, id_award):
    url = URL_SERVICES + "/award/purchase"
    if access_token is None:
        access_token = PUBLIC_ACCESS_TOKEN
        
    params = {'access_token': access_token, 'id_bee': id_bee, 'id_award': id_award}
    try:
        result = requests.post(url, data=json.dumps(params))
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
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