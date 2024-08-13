import simplemenu
from django.conf import settings
from django.urls import re_path as url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.contrib.flatpages.models import FlatPage
from django.urls import include, path
from django.views.generic.base import RedirectView
from django.views.static import serve
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.shortcuts import redirect


from rest_framework import permissions

admin.autodiscover()


schema_view = get_schema_view(
    openapi.Info(
        title="Hub API",
        default_version="v1",
        description="Hub API for sharing files application",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="email@example.com"),
        license=openapi.License(name="CC"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Example:
    # (r'^qgis/', include('qgis.foo.urls')),
    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),
    # Uncomment the next line to enable the admin:
    url(r"^admin/", admin.site.urls),
    # Fix broken URLS in feedjack
    # url(r'^planet/feed/$', RedirectView.as_view(url='/planet/feed/atom/')),
    # Tim: Feedjack feed aggregator / 
    url("", include("feedjack.urls"), name="planet"),
    # ABP: autosuggest for tags
    url(r"^taggit_autosuggest/", include("taggit_autosuggest.urls")),
    url(r"^userexport/", include("userexport.urls")),
]

# ABP: temporary home page
# urlpatterns += patterns('django.views.generic.simple',
#    url(r'^$', 'direct_to_template', {'template': 'index.html'}, name = 'index'),
# )


# serving static media
from django.conf.urls.static import static

if settings.SERVE_STATIC_MEDIA:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# auth
urlpatterns += [
    path("accounts/", include("django.contrib.auth.urls")),
]

# tinymce
urlpatterns += [
    url(r"^tinymce/", include("tinymce.urls")),
]



if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r"^__debug__/", include(debug_toolbar.urls)),
    ]

simplemenu.register(
    "/admin/",
    FlatPage.objects.all(),
    simplemenu.models.URLItem.objects.all(),
)
