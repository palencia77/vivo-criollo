from django.template import RequestContext
from django.shortcuts import render_to_response
from services import *
from bee.services import *
# Create your views here.

'''
@summary: 
@param 
'''        
def partners_init(request):
    try:
        context = RequestContext(request)
        return render_to_response('partner/partners.html',context)
    except Exception, e:
        print e
        
#===============================================================================
# '''
# @summary: 
# @param 
# '''        
# def show_partner(request):
#     try:
#         context = RequestContext(request)
#         return render_to_response('partner/partners.html',context)
#     except Exception, e:
#         print e
#===============================================================================
        
'''
@summary: Render data of one cause by id
@param id: id of the cause
'''        
def show_partner(request):
    context = RequestContext(request)
    try:
        if request.method == 'GET':
            if request.GET['id'] != None:
                data = {}
                access_token = None
                id_partner = request.GET['id']
                if 'user_session' in request.COOKIES:
                    access_token = request.COOKIES['access_token']
                print "fhdhfdf"
                data = service_bee_find_by_id(access_token,id_partner)
                data = json.dumps(data)
        return render_to_response('partner/profile.html', {'partner': data}, context)
    except Exception, e:
        print e