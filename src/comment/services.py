import json
import requests
from heybeesweb.settings import URL_SERVICES
from heybeesweb.settings import PUBLIC_ACCESS_TOKEN
from heybeesweb.settings import APP_TYPE_S

'''
@summary: Service to find comments of post
@param access_token
@param id_post:
@param page_number:
@param page_size:
'''
def service_comment_find_by_post(access_token, id_post, page_number=1,page_size=3):
    url = URL_SERVICES + "/comment/find/by/post"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {
              'access_token' : access_token,
              'page_number' : page_number,
              'page_size' : page_size,
              'id_post' : id_post,
              'app': APP_TYPE_S
              }
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
    except Exception as e:
        return {'error':e}

'''
@summary: Service to save a comment of post
@param access_token
@param id_bee
@param id_post:
@param text:
'''
def service_comment_create(access_token, id_post, text, id_bee):
    url = URL_SERVICES + "/comment/create"
    json_data = { 
                 'access_token': access_token,
                  'id_bee': id_bee,
                  'id_post': id_post,
                  'text': text
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
@summary: Service to delete a comment
@param access_token
@param id_bee
@param id_comment:
'''
def service_comment_delete(access_token, id_comment, id_bee):
    url = URL_SERVICES + "/comment/delete"
    json_data = { 
                 'access_token': access_token,
                  'id_bee': id_bee,
                  'id_comment': id_comment
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
@summary: Service to edit a comment
@param access_token
@param id_bee
@param id_comment:
@param text:
'''
def service_comment_edit(access_token, id_comment, id_bee, text):
    url = URL_SERVICES + "/comment/edit"
    json_data = { 
                 'access_token': access_token,
                  'id_bee': id_bee,
                  'id_comment': id_comment, 
                  'text': text
                }
    try:
        r = requests.post(url, data=json.dumps(json_data))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return {'error':e}

def error_handler(status_error):
    if status_error == 400:
        return {"error":"Error en datos enviados"}
    elif status_error == 500:
        return {"error":"Ocurrio un error en el servidor por favor intente mas tarde"}
    else:
        return {"error":("Ocurrio un error ({0})".format(status_error))} 
