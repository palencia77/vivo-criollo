from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse

# Create your views here.

'''
@summary: 
@param request:
'''        
def home(request):
    try:
        if 'user_session' in request.COOKIES:
            context = RequestContext(request)
            return render_to_response('home/home.html',context)
        else:
            return HttpResponseRedirect('/user/login')
    except Exception, e:
        print e