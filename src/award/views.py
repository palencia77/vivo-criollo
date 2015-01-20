from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from services import *
from django.http import HttpResponse
from django.template import loader
import json
# Create your views here.

'''
@summary: Render all awards to the view
@param
'''
def award_init(request):
    try:
        context = RequestContext(request)
        return render_to_response('award/awards_list.html', context)
    except Exception, e:
        print e

'''
@summary: Render data of one award by id
@param id: id of the award
**** NO USADO: 04/12/2014 ****
'''
def show_award(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            if request.GET['id'] is not None:
                data = {}
                access_token = None
                id_award = request.GET['id']
                if 'user_session' in request.COOKIES:
                    access_token = request.COOKIES['access_token']
                data = service_award_find_by_id(access_token, id_award)
                data = json.dumps(data)
        return render_to_response('award/award_details.html', {'award': data}, context)
    except Exception, e:
        print e