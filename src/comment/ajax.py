import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *

@dajaxice_register
def dajax_comment_find_by_post(request,id_post,index,page_number,page_size):
    access_token = None
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
    result = service_comment_find_by_post(access_token,id_post,page_number,page_size)
    result['index']=index
    return json.dumps(result)

@dajaxice_register
def dajax_comment_create(request, id_post, text): 
    result = {}
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_comment_create(access_token, id_post, text, id_bee)
    else:
        result['error'] = ":( debes loguearte para realizar esta accion"
    return json.dumps(result)
    
@dajaxice_register
def dajax_comment_delete(request, id_comment):  
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_comment_delete(access_token, id_comment, id_bee)
        return json.dumps(result)

@dajaxice_register
def dajax_comment_edit(request,id_comment,text):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_comment_edit(access_token, id_comment, id_bee, text)
        return json.dumps(result)