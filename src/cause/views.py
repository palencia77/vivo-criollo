from django.template import RequestContext
from django.shortcuts import render_to_response
from services import *
from django.http import HttpResponse
from django.template import loader
import json
        
'''
@summary: Render causes to the view
@param 
'''
def causes_init(request):
    try:
        context = RequestContext(request)
        return render_to_response('cause/causes_list.html', context)
    except Exception, e:
        print e
        
'''
@summary: Render data of one cause by id
@param id: id of the cause
'''        
def show_cause(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            if request.GET['id'] != None:
                data = {}
                access_token = None
                id_cause = request.GET['id']
                if 'user_session' in request.COOKIES:
                    access_token = request.COOKIES['access_token']
                data = service_cause_find_by_id(access_token,id_cause)
                data = json.dumps(data)
        return render_to_response('cause/cause_details.html', {'cause': data}, context)
    except Exception, e:
        print e

'''
@summary: Render cause map
@param 
'''
def show_causes_map(request):
    try:
        context = RequestContext(request)
        access_token = None
        if 'user_session' in request.COOKIES:
            access_token = request.COOKIES['access_token']
        data = service_cause_find_all_locations(access_token, "", 1, 1000)
        data = json.dumps(data)
        return render_to_response("cause/cause_map.html",{'data':data},context)
    except Exception, e:
        print e