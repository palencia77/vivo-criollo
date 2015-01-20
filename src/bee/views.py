from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.template import loader, Context
from bee.services import *
        
'''
@summary: Render to the bee timeline:
'''
def bee_init(request):
    try:
        return HttpResponseRedirect('/bee/ranking')
    except Exception, e:
        print e

'''
@summary: Render to the bee ranking:
'''
def bee_ranking(request):
    try:
        context = RequestContext(request)
        return render_to_response('ranking/ranking.html', context)
    except Exception, e:
        print e

'''
@summary: method for validating whether a user is in the session and
          allows you to view their profile
@param: request
'''
def profile(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            if request.COOKIES['id_bee'] != None:
                data = {}
                access_token = None
                id_bee = request.GET['id']
                if 'user_session' in request.COOKIES:
                    access_token = request.COOKIES['access_token']
                    data = service_bee_find_by_id(access_token, id_bee)
                    data = json.dumps(data)
                else:
                    return HttpResponseRedirect('/user/login') 
        return render_to_response('bee/profile.html', {'person': data}, context)
    except Exception, e:
        print e
        
'''
@summary: Edit data of one person by id
'''        
def edit_person_profile(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            if request.COOKIES['id_bee'] != None:
                data = {}
                access_token = None
                id_bee = request.GET['id']
                if 'user_session' in request.COOKIES:
                    access_token = request.COOKIES['access_token']
                    data = service_bee_find_by_id(access_token, id_bee)
                    data = json.dumps(data)
                else:
                    return HttpResponseRedirect('/user/login') 
        return render_to_response('bee/edit_profile.html', {'person': data}, context)
    except Exception, e:
        print e       