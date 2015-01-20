from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from services import *
from django.template import loader, Context


'''
@summary: method for validating whether a user is in the session, 
          if the options menu commands, but sends the login
@param: request
'''
def security_base(request):
    try:
        if not 'user_session' in request.COOKIES:
            return HttpResponseRedirect('/user/login')
        else:
            HttpResponseRedirect('/')
    except Exception as e:
        response = HttpResponseRedirect('/user/login')
        response.set_cookie('error', e)
        return response

def user_register(request):
    if 'user_session' in request.COOKIES:
        return HttpResponseRedirect('/')
    else:
        try:
            if request.method == 'POST':
                if request.POST['full_name'] is not None and request.POST['login'] is not None and request.POST['password'] is not None:
                    result = service_user_resgister(request.POST['login'], request.POST['password'],request.POST['full_name'], request.POST['login'])
                    if not 'error' in result:
                        response = HttpResponseRedirect('/')
                        response_cookies = service_user_create_cookie(response, result)
                        return response_cookies
                    else:
                        raise Exception(result['error'])
                else:
                    raise Exception("Must complete the fields")
            else:
                return HttpResponseRedirect('/')    
        except Exception, e:
            response = HttpResponseRedirect('/user/login')
            response.set_cookie('error', e)
            return response

'''
@summary: Method that allows valid user credentials, if correct assigned a session
@param request: 
'''
def login(request):
    if 'user_session' in request.COOKIES:
        return HttpResponseRedirect('/')
    else:
        try:
            if request.method == 'POST':
                if request.POST['login'] is not None and request.POST['password'] is not None:
                    result = service_user_validate(request.POST['login'], request.POST['password'])
                    if 'error' in result:
                        raise Exception(result['error'])
                    else:
                        response = HttpResponseRedirect('/')
                        response = service_user_create_cookie(response, result)
                        return response
                else:
                    raise Exception("Must complete the fields")
            
            context = RequestContext(request)
            if 'success' in request.COOKIES:
                context = RequestContext(request, {'success':request.COOKIES['success']})            
            elif 'error' in request.COOKIES:
                context = RequestContext(request, {'error':request.COOKIES['error']})
            response = HttpResponse(loader.get_template("security/login.html").render(context))
            if 'success' in request.COOKIES:
                response.delete_cookie('success')
            if 'error' in request.COOKIES:
                response.delete_cookie('error')
            return response
        except Exception, e:
            context = RequestContext(request, {'error_login': e})
            return HttpResponse(loader.get_template("security/login.html").render(context))

'''
@summary: Method that allows make a user social login from google+
@param request:
'''
def google_plus_login(request):
    if 'user_session' in request.COOKIES:
        return HttpResponseRedirect('/')
    else:
        try:
            if request.method == 'POST':
                if 'google_access_token' in request.POST:
                    if request.POST['google_access_token'] is not None:
                        google_data = service_user_google_plus_get_data(request.POST['google_access_token'])
                        if not 'error' in google_data:
                            google_image_url = google_data['image']['url']
                            google_image_url_size200x200 = google_image_url.replace('sz=50', 'sz=200')
                            response = service_user_validate_from_social_network(google_data['id'],
                                                                                 google_data['displayName'],
                                                                                 google_data['emails'][0]['value'],
                                                                                 google_data['gender'], "GOOGLEPLUS",
                                                                                 google_image_url_size200x200)
                            return response
                        else:
                            raise Exception('We have troubles with google services, try again.')
                else:
                    return HttpResponseRedirect('/user/login')
        except Exception, e:
            context = RequestContext(request, {'error': e})
            return HttpResponse(loader.get_template("security/login.html").render(context))

'''
@summary: Method that allows make a user social login from Facebook
@param request:
'''
def facebook_login(request):
    if 'user_session' in request.COOKIES:
        return HttpResponseRedirect('/')
    else:
        try:
            if request.method == 'POST':
                if request.POST['id_social_network'] is not None and request.POST['email'] is not None and \
                   request.POST['full_name'] and request.POST['gender'] is not None:
                        start_url = "http://graph.facebook.com/"
                        end_url = "/picture?type=large"
                        response = service_user_validate_from_social_network(request.POST['id_social_network'],
                                                                             request.POST['full_name'],
                                                                             request.POST['email'],
                                                                             request.POST['gender'],"FACEBOOK",
                                                                             start_url+request.POST['id_social_network']+end_url)
                        return response
            else:
                return HttpResponseRedirect('/user/login')
        except Exception, e:
            context = RequestContext(request, {'error': e})
            return HttpResponse(loader.get_template("security/login.html").render(context))
        
'''
@summary: Method that allows make a user social login from linkedin
@param request:
'''
def linkedin_login(request):
    if 'user_session' in request.COOKIES:
        return HttpResponseRedirect('/')
    else:
        try:
            if request.method == 'POST':
                    if request.POST['id'] is not None and request.POST['fullName'] is not None and request.POST['email'] is not None and request.POST['image_url'] is not None:
                        response = service_user_validate_from_social_network(request.POST['id'],
                                                                             request.POST['fullName'],
                                                                             request.POST['email'],
                                                                             None,"LINKEDIN",
                                                                             request.POST['image_url'])
                        return response
                    else:
                        return HttpResponseRedirect('/user/login')
        except Exception, e:
            context = RequestContext(request, {'error': e})
            return HttpResponse(loader.get_template("security/login.html").render(context))

'''
@summary: get request method that validates that the token is valid password
to retrieve and post receives the request to update the password
@param request:
'''
def recover_password_update(request):
    error = None
    success = "Operacion realizada exitosamente"
    context = RequestContext(request)
    try:
        if'user_session' in request.COOKIES:
            return HttpResponseRedirect('/')
        else:
            if request.method == 'GET':
                if request.GET['access_token'] is not None:
                    access_token = request.GET['access_token']
                    result = service_validate_token_change_password(access_token)
                    if 'error' in result:
                        error = "Enlace vencido o no valido, vuelve a realizar una peticion"
                        response = HttpResponseRedirect('/user/login')
                        response.set_cookie('error', error)
                        return response
                    else:
                        response = render_to_response("security/recover_password_update_data.html",context)
                        response.set_cookie('access_token', request.GET['access_token'])
                        return response
            elif request.method == 'POST':
                if request.POST['password'] is not None and request.POST['confirm_password'] is not None:
                    if request.POST['password'] != request.POST['confirm_password']:
                        error = "Passwords do not match"
                        context = RequestContext(request, {'error_rp_update_data':error})
                        return HttpResponse(loader.get_template("security/recover_password_update_data.html").render(context))
                    else:
                        result = service_recover_password_update_data(request.COOKIES['access_token'], request.POST['password'])
                        if 'error' in result:
                            error = result['error']
                            context = RequestContext(request, {'error_rp_update_data': error})
                            return HttpResponse(loader.get_template("security/recover_password_update_data.html").render(context))
                        else:
                            response = HttpResponseRedirect('/user/login')
                            response.set_cookie('success', success)
                            return response
    except Exception, e:
        context = RequestContext(request, {'error_rp_update_data': e})
        return HttpResponse(loader.get_template("security/recover_password_update_data.html").render(context))

'''
@summary: method that receives the request to retrieve the user password
if there is send an email to recovery
@param: request
'''
def recover_password(request):
    if 'user_session' in request.COOKIES:
        return HttpResponseRedirect('/')
    else:
        try:
            if request.method == 'POST':
                if request.POST['login'] is not None:
                    result = service_recover_password_send_email(request.POST['login'])
                    if 'error' in result:
                        raise Exception("Correo electronico no existe")
                    else:
                        success = "Te hemos enviado un correo"
                        context = RequestContext(request, {'success_recover_password': success})
                        response = render_to_response("security/recover_password.html", context)
                        return response
            context = RequestContext(request)
            return HttpResponse(loader.get_template("security/recover_password.html").render(context))
        except Exception as e:
            context = RequestContext(request, {'error_recover_password': e})
            return HttpResponse(loader.get_template("security/recover_password.html").render(context))

'''
@summary: get request method that activate a bee account
@param request: access_token
'''
def user_activate_account(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            access_token = request.GET['access_token']
            if 'access_token' in request.GET:
                if access_token is not None:
                    result = service_user_activate_account(access_token)
                    if 'error' in result:
                        error = "No hemos podido verificar tu cuenta debido a que eres considerado un Robot, intenta iniciar sesion nuevamente para recibir otro enlace de verificacion."
                        response = HttpResponseRedirect('/user/login')
                        response.set_cookie('error', error)
                        return response
                    else:
                        success = "Nos alegra saber que eres un humano. Gracias por verificar tu cuenta!"
                        response = HttpResponseRedirect('/')
                        response.set_cookie('success', success)
                        return response

    except Exception, e:
        context = RequestContext(request, {'error': e})
        return HttpResponse(loader.get_template("error.html").render(context))
    
'''
@summary: get request method that inactivate a bee account
@param request: access_token
'''
def user_inactivate_account(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            access_token = request.GET['access_token']
            if 'access_token' in request.GET:
                if access_token is not None:
                    result = service_user_inactivate_account(access_token)
                    if 'error' in result:
                        error = "No hemos podido verificar tu cuenta debido a que eres considerado un Robot, intenta iniciar sesion nuevamente para recibir otro enlace de verificacion."
                        response = HttpResponseRedirect('/user/login')
                        response.set_cookie('error', error)
                        return response
                    else:
                        success = "Hemos podido vefiricar que eres un humano. Tu cuenta ha sido desactivada! Se activara cuando vuelvas a iniciar sesion."
                        request.method = 'POST'
                        response = logout(request)
                        response.set_cookie('success', success)
                        return response

    except Exception, e:
        context = RequestContext(request, {'error': e})
        return HttpResponse(loader.get_template("error.html").render(context))    

'''
@summary: method that closes the user session d eun erasing all data from cookies
@param request:
'''
def logout(request):
    if 'user_session' in request.COOKIES:
        try:
            if request.method == 'POST':
                if 'access_token' in request.COOKIES:
                    if request.COOKIES.get('access_token') is not None:
                            result = service_logout(request.COOKIES.get('access_token'))
                            if not 'error' in result:
                                response = HttpResponseRedirect('/user/login')
                                response_cookies = service_user_delete_cookie(response)
                                return response_cookies
                            else:
                                raise Exception(result['error'])
                    else:
                        raise Exception("Must complete the fields")
                else:
                    raise Exception("Error: could not complete the operation (Not is method post)")
        except Exception, e:
            context = RequestContext(request, {'error': e})
            return HttpResponse(loader.get_template("security/login.html").render(context))