from django.template import RequestContext
from django.shortcuts import render_to_response
        
'''
@summary: 
@param 
'''        
def heybees_init(request):
    try:
        context = RequestContext(request)
        return render_to_response('heybees/heybees.html',context)
    except Exception, e:
        print e
        
'''
@summary: 
@param 
'''        
def heybees_privacy(request):
    try:
        context = RequestContext(request)
        return render_to_response('heybees/privacy.html',context)
    except Exception, e:
        print e
        
'''
@summary: 
@param 
'''        
def heybees_cookies(request):
    try:
        context = RequestContext(request)
        return render_to_response('heybees/cookies.html',context)
    except Exception, e:
        print e
        
'''
@summary: 
@param 
'''        
def heybees_contact(request):
    try:
        context = RequestContext(request)
        return render_to_response('heybees/contacts.html',context)
    except Exception, e:
        print e