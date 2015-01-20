from django.template import RequestContext
from django.shortcuts import render_to_response
        
'''
@summary: 
@param 
'''        
def philosophy_init(request):
    try:
        context = RequestContext(request)
        return render_to_response('philosophy/keiko.html',context)
    except Exception, e:
        print e