import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *
from tools.services import*

@dajaxice_register
def dajax_post_find_by_bee(request,id_bee,page_number,page_size):
    access_token = None
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
    result = service_post_find_by_bee(access_token,id_bee,page_number,page_size)
    return json.dumps(result)

@dajaxice_register
def dajax_post_create(request, title, text, with_resource, resources):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        for resource in resources:
            new_resource = upload_filter_image(resource['binary_content'], 600, 600)            
            resource['binary_content'] = new_resource
        result = service_post_create(access_token, title, text, id_bee, with_resource, resources)
        return json.dumps(result)
    
@dajaxice_register
def dajax_post_delete(request, id_post):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_post_delete(access_token, id_bee, id_post)
        return json.dumps(result)
    
@dajaxice_register
def dajax_post_update(request, id_post, text):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_post_update(access_token, id_bee, id_post, text)
        return json.dumps(result)