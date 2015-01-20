import json
import requests
from heybeesweb.settings import URL_SERVICES
from heybeesweb.settings import PUBLIC_ACCESS_TOKEN
from heybeesweb.settings import APP_TYPE, APP_TYPE_S

def service_post_find_by_bee(access_token, id_bee, page_number=1,page_size=10):
    url = URL_SERVICES + "/find/posts/by/bee"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token' : access_token,
              'page_number' : page_number,
              'page_size' : page_size,
              'id_bee' : id_bee,
              'app': APP_TYPE}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {'error':e}

'''
@summary: Service to save a post of bee
@param access_token
@param id_bee
@param data:
@param with_resource:
@param resource:
'''
def service_post_create(access_token, title,text, id_bee, with_resource, resources):
    url = URL_SERVICES + "/post/create"
    json_data = { 
                 'access_token': access_token,
                  'id_bee': id_bee,
                  'title': title,
                  'text': text,
                  'with_resource': with_resource,
                  'resources': resources,
                  'app':APP_TYPE_S
                }
    try:
        r = requests.post(url, data=json.dumps(json_data))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return {'error':e}
    
    
'''
@summary: Service to delete a post of bee
@param access_token
@param id_bee
@param id_post:
'''
def service_post_delete(access_token, id_bee, id_post):
    url = URL_SERVICES + "/post/remove"
    json_data = { 
                 'access_token': access_token,
                  'id_bee': id_bee,
                  'id_post': id_post,
                  'app': APP_TYPE_S
                }
    try:
        r = requests.post(url, data=json.dumps(json_data))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return {'error':e}
    
'''
@summary: Service to update a post of bee
@param access_token
@param id_bee
@param id_post:
@param text:
'''
def service_post_update(access_token, id_bee, id_post, text):
    url = URL_SERVICES + "/post/update/social"
    json_data = { 
                 'access_token': access_token,
                  'id_bee': id_bee,
                  'id_post': id_post,
                  'text':text
                }
    try:
        r = requests.post(url, data=json.dumps(json_data))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return {'error':e}
    
'''
@summary: Service to find post by id
@param access_token
@param id_post
'''   
def service_post_find_by_id(access_token, id_post):
    url = URL_SERVICES + "/post/find/by_id"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token':access_token, 'id_post': id_post}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return e

def error_handler(status_error):
    if status_error == 400:
        return {"error":"Error en datos enviados"}
    elif status_error == 500:
        return {"error":"Ocurrio un error en el servidor por favor intente mas tarde"}
    else:
        return {"error":("Ocurrio un error ({0})".format(status_error))} 
    
    
