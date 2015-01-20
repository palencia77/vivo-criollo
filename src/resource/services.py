import json
import requests
from heybeesweb.settings import URL_SERVICES
from heybeesweb.settings import PUBLIC_ACCESS_TOKEN
from heybeesweb.settings import APP_TYPE

def service_resource_find(access_token, id_resource, resource_width, resource_height):
    url = URL_SERVICES + "/resource/find/by/id"
    if access_token is None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token,
              'id_resource': id_resource,
              'resource_width': resource_width,
              'resource_height': resource_height}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
    except Exception as e:
        print e
    return error_handler(result.status_code)

def service_resource_find_id_of_post(access_token, id_resource):
    url = URL_SERVICES + "/resource/post/find/by/id"
    if access_token is None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token': access_token,
              'id_resource': id_resource
              }
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
    except Exception as e:
        print e
    return error_handler(result.status_code)

def error_handler(status_error):
    if status_error == 400:
        return {"error": "Error en datos enviados"}
    elif status_error == 500:
        return {"error": "Ocurrio un error en el servidor por favor intente mas tarde"}
    else:
        return {"error": "Ocurrio un error ({0})".format(status_error)}
