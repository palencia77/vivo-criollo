from django.template import RequestContext
from django.shortcuts import render_to_response
from bee.services import *
import json
from django.http import HttpResponseRedirect
        
'''
@summary: Render causes to the view
@param 
'''
def celebrity_init(request):
    try:
        if not 'user_session' in request.COOKIES:
            return HttpResponseRedirect('/user/login')
        return HttpResponseRedirect('/')
    except Exception, e:
        print e
        
'''
@summary: Render data of one cause by id
@param id: id of the cause
'''        
def show_celebrity(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            if request.GET['id'] != None:
                data = {}
                access_token = None
                id_celebrity = request.GET['id']
                if 'user_session' in request.COOKIES:
                    access_token = request.COOKIES['access_token']
                data = service_bee_find_by_id(access_token,id_celebrity)
                data = json.dumps(data)
        return render_to_response('celebrity/profile.html', {'celebrity': data}, context)
    except Exception, e:
        print e