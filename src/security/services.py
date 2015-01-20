import json
import requests
from models import UserSession
from django.http import HttpResponseRedirect, HttpResponse
from heybeesweb.settings import URL_SERVICES
from heybeesweb.settings import APP_TYPE, APP_TYPE_S


'''
@summary:
@param login:
@param password:
@param full_name:
@param email:
'''
def service_user_resgister(login, password, full_name, email):
    url = URL_SERVICES + "/user/register"
    json_data = {
                 'login': login,
                'password': password,
                'email': email,
                'full_name': full_name,
                'app': APP_TYPE_S,
                'type': "FRONTEND",
                'gender': None,
                'phone': None,
                'birthday': None
                }
    try:
        r = requests.post(url, data=json.dumps(json_data))
        if r.status_code==200:
            return r.json()
        else:
            raise Exception (error_handler(r.status_code))
    except Exception as e:
        return {"error": e}

'''
@summary: result method that makes a request to validate user credentials
@param login: this username
@param password: 
'''
def service_user_validate(login, password):
    url = URL_SERVICES + "/user/validate"
    params = {'login': login, 'password': password, 'app': APP_TYPE_S}

    try:
        r = requests.post(url, data=json.dumps(params))
        if r.status_code == 200:
            result = r.json()
            if 'access_token' in result:
                response = service_get_user_by_token(result['access_token']) 
                response['access_token'] = result['access_token']
                return response          
            elif 'error' in result:
                return result
            else:
                raise Exception("Hubo un error desconocido")
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return {"error": e}
    
'''
@summary:
@param id_social_network:
@param full_name:
@param email:
@param gender:
'''
def service_user_validate_from_social_network(id_social_network, full_name, email, gender,network_name,image_social_network):
    url = URL_SERVICES + "/user/social_network/validate"
    params = {'id_social_network': id_social_network, 'full_name': full_name, 'email': email, 'app': APP_TYPE_S, 'gender': gender, 'type': APP_TYPE,'network_name':network_name, 'image_social_network': image_social_network}
    try:
        r = requests.post(url, data=json.dumps(params))
        if r.status_code == 200:
            result = r.json()
            if 'access_token' in result:
                result_user = service_get_user_by_token(result['access_token']) 
                result_user['access_token'] = result['access_token']
                if 'error' not in result_user:
                    response = HttpResponseRedirect('/')
                    response = service_user_create_cookie(response, result_user)
                return response
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return {"error": e}

'''
@summary:
@param access_token: 
'''   
def service_get_user_by_token(access_token):
    url = URL_SERVICES + "/user/view"
    params = {'access_token': access_token}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {'error': e}

'''
@summary: Service that make a request to get data of the user from google+
@param google_access_token
'''
def service_user_google_plus_get_data(google_access_token):
    url = "https://www.googleapis.com/plus/v1/people/me"
    params = {'access_token': google_access_token}
    try:
        result = requests.get(url, params=params)
        if result.status_code == 200:
            google_data = result.json()
            if not 'error' in google_data:
                if 'gender' not in google_data:
                    google_data['gender'] = None
                if 'displayName' not in google_data:
                    google_data['displayName'] = "ERROR security/service.py:118"
                if 'id' not in google_data:
                    google_data['id'] = "ERROR security/service.py:120"
                if len(google_data['emails']) < 0:
                    google_data['emails'][0]['value'] = "ERROR security/service.py:122"
                if 'url' not in google_data['image']:
                    google_data['image']['url'] = "IMAGE URL NOT FOUND"
            return google_data
        else:
            raise Exception(error_handler(result.status_code))
    except Exception as e:
        return {'error': e}

'''
@summary: Service that create an user session cookie
@param
'''
def service_user_create_cookie(response, data):
    response.set_cookie('user_session', True)
    response.set_cookie('id_user', data['id_user'])
    response.set_cookie('access_token', data['access_token'])
    response.set_cookie('id_bee', data['id_bee'])
    response.set_cookie('full_name', json.dumps(data['full_name']))
    return response

'''
@summary: result method that makes a request for the user access_token
@param access_token: 
'''   
def service_validate_token_change_password(access_token):
    url = URL_SERVICES + "/user/recover/password/validate"
    params = {'access_token':access_token}
    try:
        result = requests.get(url, params=params)
        if result.status_code==200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {"error": e}
    
'''
@summary: result method that makes a request for the user access_token
@param access_token: 
'''   
def service_recover_password_send_email(login):
    url = URL_SERVICES + "/user/recover/password"
    data = {}
    data['login'] = login
    data['app'] = APP_TYPE_S
    try:
        result = requests.post(url, data=json.dumps(data))
        if result.status_code == 200:
            return result.json()
        else:
            return error_handler(result.status_code)
    except Exception as e:
        return {"error": e}
    

'''
@summary: 
@param
@param status: 
'''
def service_recover_password_update_data(access_token, password):
    url = URL_SERVICES + "/user/recover/password/update"
    data={}
    data['access_token'] = access_token
    data['password'] = password             
    try:
        r = requests.post(url, data=json.dumps(data))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return e

'''
@summary: Service that make a request to activate a bee account
@param: access_token
'''
def service_user_activate_account(access_token):
    url = URL_SERVICES + "/user/activate/account"
    data = {}
    data['access_token'] = access_token
    try:
        r = requests.post(url, data=json.dumps(data))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return e

'''
@summary: Service that make a request to inactivate a bee account
@param: access_token
'''
def service_user_inactivate_account(access_token):
    url = URL_SERVICES + "/user/inactivate/account"
    data = {}
    data['access_token'] = access_token
    try:
        r = requests.post(url, data=json.dumps(data))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return e

'''
@summary: result method that makes a request to invalidate user credentials
@param access_token:
'''
def service_logout(access_token):
    url = URL_SERVICES + "/user/logout"
    params = {'access_token': access_token}

    try:
        r = requests.post(url, data=json.dumps(params))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return e

'''
@summary: Service that update status of a User
@param id_user
@param status: 
'''
def service_user_update_status(access_token, id_user, status):
    url = URL_SERVICES + "/user/update/status"
    data = {}
    data['access_token'] = access_token
    data['id_user'] = id_user
    data['status'] = status
    try:
        r = requests.post(url, data=json.dumps(data))
        if r.status_code == 200:
            return r.json()
        else:
            return error_handler(r.status_code)
    except Exception as e:
        return e

'''
@summary: Service that delete an user session cookie
@param
'''
def service_user_delete_cookie(response):
    response.delete_cookie('user_session')
    response.delete_cookie('id_user')
    response.delete_cookie('access_token')
    response.delete_cookie('id_bee')
    response.delete_cookie('full_name')
    return response

'''
@summary: Error handler
@param status_error
'''
def error_handler(status_error):
    if status_error == 400:
        return {"error": "Error en datos enviados"}
    elif status_error == 500:
        return {"error": "Ocurrio un error en el servidor por favor intente mas tarde"}
    else:
        return {"error":("Ocurrio un error ({0})".format(status_error))}
