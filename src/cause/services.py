import json
import requests
from heybeesweb.settings import URL_SERVICES
from heybeesweb.settings import PUBLIC_ACCESS_TOKEN
from heybeesweb.settings import APP_TYPE, APP_TYPE_S

def service_cause_find_all(access_token, name_filter,level_data, page_number=1, page_size=10):
    url = URL_SERVICES + "/cause/find/all"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token, 'page_number': page_number,
              'page_size': page_size, 'name_filter':name_filter, 'app': APP_TYPE, 'level_data':level_data}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return Error_Handler(result.status_code)
    except Exception as e:
        return {"error": e}

def service_cause_find_by_id(access_token, id_cause):
    url = URL_SERVICES + "/cause/landingpage/find_by/id"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token, 'id_cause': id_cause, 'app': APP_TYPE}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return Error_Handler(result.status_code)
    except Exception as e:
        return {"error": e}
    
def service_cause_find_all_locations(access_token, name_filter, page_number=1, page_size=1000):
    url = URL_SERVICES + "/cause/all/locations"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token, 'page_number': page_number,
              'page_size': page_size, 'name_filter':name_filter, 'app': APP_TYPE}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return Error_Handler(result.status_code)
    except Exception as e:
        return {"error": e}
    
def service_cause_find_all_by_status(access_token, status,name_filter, page_number, page_size):
    url = URL_SERVICES + "/cause/find/all/by/status"
    params = {'access_token':access_token, 'status': status, 'page_number': page_number, 'page_size': page_size, 'name_filter':name_filter, 'app':APP_TYPE_S}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return Error_Handler(result.status_code)
    except Exception as e:
        return {"error": e}

def Error_Handler(status_error):
    if status_error == 400:
        return {"error":"Error en datos enviados"}
    elif status_error == 500:
        return {"error":"Ocurrio un error en el servidor por favor intente mas tarde"}
    else:
        return {"error":("Ocurrio un error ({0})".format(status_error))} 
