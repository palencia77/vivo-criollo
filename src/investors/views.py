from django.template import RequestContext
from django.shortcuts import render_to_response

# Create your views here.

'''
@summary: 
@param 
'''        
def investors_init(request):
    try:
        context = RequestContext(request)
        return render_to_response('investors/investors.html',context)
    except Exception, e:
        print e