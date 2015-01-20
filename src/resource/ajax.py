import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *

@dajaxice_register
def dajax_resource_find(request,id_resource,array_index,resource_width,resource_height):
    access_token = None
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
    result = service_resource_find(access_token,id_resource,resource_width,resource_height)
    result['array_index'] = array_index
    return json.dumps(result)

@dajaxice_register
def dajax_resource_find_two_index(request,id_resource,index_one,index_two,resource_width,resource_height):
    access_token = None
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']    
        result = service_resource_find(access_token,id_resource,resource_width,resource_height)
        result['index_one'] = index_one
        result['index_two'] = index_two
        return json.dumps(result)
    
@dajaxice_register
def dajax_resource_find_id_of_post(request,id_resource,array_index):
    access_token = None
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
    result = service_resource_find_id_of_post(access_token,id_resource)
    result['array_index'] = array_index
    return json.dumps(result)