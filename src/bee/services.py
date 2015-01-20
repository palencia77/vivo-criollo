import json
import requests
from heybeesweb.settings import URL_SERVICES
from heybeesweb.settings import PUBLIC_ACCESS_TOKEN
from heybeesweb.settings import APP_TYPE_S

def service_bee_find_by_id(access_token, id_bee):
    url = URL_SERVICES + "/bee/view"
    if access_token is None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token, 'id_bee': id_bee, 'app': APP_TYPE_S}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {"error": e}

def service_bee_timeline(access_token, id_bee, page_number, page_size):
    url = URL_SERVICES + "/bee/timeline"
    params = {'access_token': access_token, 'id_bee': id_bee, 'app': APP_TYPE_S,
              'page_number': page_number, 'page_size': page_size}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {"error": e}
    
def service_bee_update_attribute(access_token, id_bee, attribute, value):
    url = URL_SERVICES + "/bee/update/attribute"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token, 'id_bee': id_bee, 'attribute': attribute, 'value': value}
    try:
        r = requests.post(url, data=json.dumps(params))
        print r.status_code
        if r.status_code == 200:
            result = r.json()
            return result
    except Exception as e:
        return {"error": e} 
    
def service_bee_avatar_update(access_token, id_bee, resource):
    url = URL_SERVICES + "/bee/avatar/update"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token, 'id_bee': id_bee, 'resource': resource}
    try:
        r = requests.post(url, data=json.dumps(params))
        print r.status_code
        if r.status_code == 200:
            result = r.json()
            return result
    except Exception as e:
        return {"error": e}
    
def service_bee_cover_update(access_token, id_bee, resource):
    url = URL_SERVICES + "/bee/cover/update"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params2 = {'access_token': access_token, 'id_bee': id_bee, 'resource': resource}
    try:
        r = requests.post(url, data=json.dumps(params2))
        print r.status_code
        if r.status_code == 200:
            result = r.json()
            return result
    except Exception as e:
        return {"error": e}           


def service_bee_historical_ranking(access_token, id_bee,page_number,page_size):
    url = URL_SERVICES + "/bee/historical/ranking"
    if access_token is None:
        access_token = PUBLIC_ACCESS_TOKEN
        params = {'access_token': access_token, 'id_bee': id_bee, 'page_number': page_number, 'page_size': page_size}
    params = {'access_token': access_token, 'id_bee': id_bee, 'page_number': page_number, 'page_size': page_size}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {"error": e}

def service_bee_weekly_ranking(access_token, id_bee,page_number,page_size):
    url = URL_SERVICES + "/interaction/weekly/ranking"
    if access_token is None:
        access_token = PUBLIC_ACCESS_TOKEN
        params = {'access_token': access_token, 'id_bee': id_bee, 'page_number': page_number, 'page_size': page_size}
    params = {'access_token': access_token, 'id_bee': id_bee, 'page_number': page_number, 'page_size': page_size}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {"error": e}


def error_handler(status_error):
    if status_error == 400:
        return {"error": "Error en datos enviados"}
    elif status_error == 500:
        return {"error": "Ocurrio un error en el servidor por favor intente mas tarde"}
    else:
        return {"error": "Ocurrio un error ({0})".format(status_error)}
