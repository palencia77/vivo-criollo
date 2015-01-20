import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from bee.services import *

@dajaxice_register
def dajax_person_find(request):
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
        id_bee = request.COOKIES['id_bee']
        result = service_bee_find_by_id(access_token, id_bee)
        return json.dumps(result)