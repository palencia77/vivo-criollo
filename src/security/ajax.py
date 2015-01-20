import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *

@dajaxice_register
def dajax_user_validate_from_social_network(request, id_social_network, full_name, email, gender):
    result = service_user_validate_from_social_network(id_social_network, full_name, email, gender)
    return json.dumps(result)

@dajaxice_register
def dajax_user_update_status(request,status):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_user = request.COOKIES['id_user']
        result = service_user_update_status(access_token,id_user,status)
        return json.dumps(result)