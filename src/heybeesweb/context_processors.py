from django.conf import settings


def solid_i18n(request):
    heybeesweb_vars = {
        'SOLID_I18N_USE_REDIRECTS': settings.SOLID_I18N_USE_REDIRECTS,
    }
    return {"heybeesweb_vars": heybeesweb_vars}
