import json
from dajaxice.decorators import dajaxice_register
from dajax.core import Dajax
from services import *

@dajaxice_register
def dajax_cause_find_all(request,name_filter,level_data,page_number,page_size):
    access_token = None
    if 'user_session' in request.COOKIES:
        access_token = request.COOKIES['access_token']
    result = service_cause_find_all(access_token,name_filter,level_data,page_number,page_size)
    return json.dumps(result)

@dajaxice_register
def dajax_cause_find_all_by_status(request,status,name_filter, page_number, page_size):
    access_token = request.COOKIES['access_token']
    result = service_cause_find_all_by_status(access_token, status,name_filter, page_number, page_size)
    return json.dumps(result)