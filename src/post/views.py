from django.template import RequestContext
from django.shortcuts import render_to_response
from services import *
import json
from django.http import HttpResponseRedirect
# Create your views here.
'''
@summary: Render causes to the view
@param 
'''
def post_init(request):
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
def show_post(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            if request.GET['id'] != None:
                data = {}
                access_token = None
                id_post = request.GET['id']
                access_token = None
                if 'user_session' in request.COOKIES:
                    access_token = request.COOKIES['access_token']
                data = service_post_find_by_id(access_token,id_post)
                data = json.dumps(data)
        return render_to_response('post/show_post.html', {'post': data}, context)
    except Exception, e:
        print e