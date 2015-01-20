import json
import requests
from heybeesweb.settings import URL_SERVICES
from heybeesweb.settings import PUBLIC_ACCESS_TOKEN

'''
@summary: Service that get all scopes
@param access_token,page_number, page_size
@param with_subscopes
'''
def service_partner_find_all(access_token, status, name_filter, page_number=1,page_size=10):
    url = URL_SERVICES + "/partner/find/all"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token' : access_token,
              'status': status,
              'name_filter':name_filter,
              'page_number' : page_number,
              'page_size' : page_size,
              }
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
    except Exception as e:
        print e
    return Error_Handler(result.status_code)
    
'''
@summary: 
@param id_cause
'''
def service_partner_cause_association_find(access_token, id_cause,associated,name_filter, page_number=1, page_size=10):      
    url = URL_SERVICES + "/partner/cause_association/find"
    if access_token == None:
        access_token = PUBLIC_ACCESS_TOKEN
    params = {'access_token' : access_token,
              'id_cause': id_cause,
              'associated':associated,
              'name_filter':name_filter,
              'page_number': page_number,
              'page_size': page_size
              }
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return Error_Handler(result.status_code)
    except Exception as e:
        return e     

def Error_Handler(status_error):
    if status_error == 400:
        return {"error":"Error en datos enviados"}
    elif status_error == 500:
        return {"error":"Ocurrio un error en el servidor por favor intente mas tarde"}
    else:
        return {"error":("Ocurrio un error ({0})".format(status_error))} 