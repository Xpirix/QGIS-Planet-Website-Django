from django.conf import settings
from django.urls import re_path as url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.urls import include, path
admin.autodiscover()



urlpatterns = [
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
