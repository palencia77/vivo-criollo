import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *
from tools.services import*

@dajaxice_register
def dajax_bee_find_by_id(request, id_bee, array_index_i, array_index_j, response_index):
    result = {}
    if 'user_session' in request.COOKIES:         
        access_token = request.COOKIES['access_token']
        if id_bee is None:
            id_bee = request.COOKIES['id_bee']
            result = service_bee_find_by_id(access_token, id_bee)        
    result['array_index_i'] = array_index_i
    result['array_index_j'] = array_index_j
    result['response_index'] = response_index
    return json.dumps(result)

'''
@summary: Service ajax that find the timeline posts
'''
@dajaxice_register
def dajax_bee_timeline(request, page_number, page_size):
    result = {}
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_bee_timeline(access_token, id_bee, page_number, page_size)
    else:
        result['error'] = "Session has expired"
    return json.dumps(result)

@dajaxice_register
def dajax_bee_update_attribute(request, attribute, value):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_bee_update_attribute(access_token, id_bee, attribute, value)
    return json.dumps(result)

@dajaxice_register
def dajax_bee_get_id(request):
    if 'user_session' in request.COOKIES:
        id_bee = request.COOKIES['id_bee']
    else:
        id_bee = None
    return json.dumps(id_bee)

@dajaxice_register
def dajax_bee_avatar_update(request, resource):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        new_resource = upload_filter_image(resource['binary_content'], 200, 200)
        resource['binary_content'] = new_resource
        result = service_bee_avatar_update(access_token, id_bee, resource)
    return json.dumps(result)

@dajaxice_register
def dajax_bee_cover_update(request, resource):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        new_resource = upload_filter_image(resource['binary_content'], 938, 140)
        resource['binary_content'] = new_resource
        result = service_bee_cover_update(access_token, id_bee, resource)
    return json.dumps(result)

@dajaxice_register
def dajax_bee_historical_ranking(request, page_number, page_size):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
    result = service_bee_historical_ranking(access_token, id_bee, page_number, page_size)
    result['id_bee'] = id_bee
    return json.dumps(result)

@dajaxice_register
def dajax_bee_weekly_ranking(request, page_number=1, page_size=5):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
    result = service_bee_weekly_ranking(access_token, id_bee, page_number, page_size)
    result['id_bee'] = id_bee
    return json.dumps(result)
