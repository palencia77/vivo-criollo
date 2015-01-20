import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *
from bee.services import *

@dajaxice_register
def dajax_celebrity_find_by_id(request, id_celebrity):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
    else:
        access_token = None
    result = service_bee_find_by_id(access_token, id_celebrity)
    return json.dumps(result)