import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *

@dajaxice_register
def dajax_award_find_by_bee(request, id_bee,status, page_number, page_size):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        result = service_award_find_by_bee(access_token, id_bee, status, page_number, page_size)
        return json.dumps(result)
    
@dajaxice_register
def dajax_award_find_by_id(request, id_award):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        result = service_award_find_by_id(access_token, id_award)
        return json.dumps(result)
    
@dajaxice_register
def dajax_award_bee_association_find(request, id_bee, associated, name_filter, page_number, page_size):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
    else:
        access_token = None
    result = service_award_bee_association_find(access_token, id_bee, associated, name_filter, page_number, page_size)
    return json.dumps(result)

@dajaxice_register
def dajax_award_find_by_status(request, status, name_filter, page_number, page_size):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
    else:
        access_token = None
    result = service_award_find_by_status(access_token, status, name_filter, page_number, page_size)
    return json.dumps(result)

@dajaxice_register
def dajax_award_purchase(request, id_award):
    result = {}
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_award_purchase(access_token, id_bee, id_award)
    else:
        result['error'] = ":( Para obtener premios debes Ingresar y Ayudar"
    return json.dumps(result)