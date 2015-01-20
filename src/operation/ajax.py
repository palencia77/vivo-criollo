import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *

@dajaxice_register
def dajax_operation_fly_action(request, id_bee_destination, id_post_destination, id_award_destination, array_index, response_index):
    result = {}
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_operation_fly_action(access_token, id_bee, id_bee_destination,
                                              id_post_destination, id_award_destination)
    else:
        result['error'] = ":( Para ayudar debes Ingresar"
    result['array_index'] = array_index
    result['response_index'] = response_index
    return json.dumps(result)

@dajaxice_register
def dajax_operation_love_action(request, id_bee_destination, id_post_destination, id_award_destination, id_comment_destination, array_index_i, array_index_j, response_index):
    result = {}
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_operation_love_action(access_token, id_bee, id_bee_destination,
                                               id_post_destination, id_comment_destination,
                                               id_award_destination)
    else:
        result['error'] = ":( Para ayudar debes Ingresar"
    result['array_index_i'] = array_index_i
    result['array_index_j'] = array_index_j
    result['response_index'] = response_index
    return json.dumps(result)